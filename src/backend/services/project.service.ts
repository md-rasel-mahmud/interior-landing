/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project } from "@/backend/models/project/project.model";
import { databaseOperationsClientOrServer } from "@/helper/database-operation-client-server";
import { buildQueryOptions, QueryParams } from "@/helper/query-builder";
import { Types } from "mongoose";

const getAllProjectsFromDB = async (query: QueryParams) => {
  const result = await databaseOperationsClientOrServer(async () => {
    const { filter, pagination, sort, category } = buildQueryOptions(query);

    // Start aggregation pipeline

    const pipeline: any[] = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
    ];

    // Merge category slug with filter for match
    const matchStage: Record<string, any> = { ...filter };
    if (category) {
      matchStage["category._id"] = new Types.ObjectId(category);
    }

    // Add match stage with all filters
    pipeline.push({ $match: matchStage });

    // Sort if defined
    if (Object.keys(sort).length > 0) {
      pipeline.push({ $sort: sort });
    }

    // Pagination
    pipeline.push({ $skip: pagination.skip });
    pipeline.push({ $limit: pagination.limit });

    // Run project aggregation
    const projects = await Project.aggregate(pipeline);

    // For total count, remove skip, limit, sort
    const countPipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      { $match: matchStage },
      { $count: "total" },
    ];

    const countResult = await Project.aggregate(countPipeline);
    const total = countResult.length > 0 ? countResult[0].total : 0;

    return {
      status: 200,
      message: "Projects fetched successfully",
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: pagination.sortBy,
        sortOrder: pagination.sortOrder,
        totalPages: Math.ceil(total / pagination.limit),
        totalItems: total,
      },
      data: projects,
    };
  });

  return result;
};

export { getAllProjectsFromDB };
