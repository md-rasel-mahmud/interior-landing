import { SortOrderEnum } from "@/enums/sort-order.enum";
import { SortOrder } from "mongoose";

export type QueryParams = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: SortOrder | keyof typeof SortOrderEnum;
  category?: string;
  searchTerm?: string;
  [key: string]: unknown;
};

export function buildQueryOptions(query: QueryParams) {
  const {
    page = "1",
    limit = "200",
    sortBy = "createdAt",
    sortOrder = SortOrderEnum.ASC,
    category,
    minPrice,
    maxPrice,
    inStock,
    searchTerm,
    ...filters
  } = query;

  const pageNumber = parseInt(page, 200);
  const limitNumber = parseInt(limit, 200);
  const skip = (pageNumber - 1) * limitNumber;

  const filterFields = [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    "minPrice",
    "maxPrice",
    "inStock",
    "category",
    "searchTerm",
  ];

  const filterQuery: Record<string, unknown> = {};

  // Normal filters
  Object.keys(filters).forEach((key) => {
    if (!filterFields.includes(key)) {
      if (
        typeof filters[key] === "string" &&
        (filters[key] as string).includes("~")
      ) {
        filterQuery[key] = {
          $regex: (filters[key] as string).replace("~", ""),
          $options: "i",
        };
      } else {
        filterQuery[key] = filters[key];
      }
    }
  });

  // Optional boolean filters
  if (filterQuery.isFeatured === "true") filterQuery.isFeatured = true;
  else delete filterQuery.isFeatured;

  if (filterQuery.isSeasonal === "true") filterQuery.isSeasonal = true;
  else delete filterQuery.isSeasonal;

  // Price Range
  if (minPrice || maxPrice) {
    filterQuery.price = {} as { $gte?: number; $lte?: number };
    if (minPrice) {
      (filterQuery.price as { $gte?: number }).$gte = Number(minPrice);
    }
    if (maxPrice) {
      (filterQuery.price as { $lte?: number }).$lte = Number(maxPrice);
    }
  }

  // In Stock
  if (inStock === "true") {
    filterQuery.stockQuantity = { $gt: 0 };
  }

  // Search Term Matching (name, description, etc.)
  if (searchTerm) {
    const searchRegex = { $regex: searchTerm, $options: "i" };
    filterQuery.$or = [
      { name: searchRegex },
      { description: searchRegex },
      // Add more fields here if needed
    ];
  }

  return {
    filter: filterQuery,
    pagination: {
      skip,
      limit: limitNumber,
      page: pageNumber,
      limitPerPage: limitNumber,
      sortBy,
      sortOrder,
    },
    sort: {
      [sortBy]: sortOrder === SortOrderEnum.ASC ? 1 : -1,
    },
    category,
  };
}
