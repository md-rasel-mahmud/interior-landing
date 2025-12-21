"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormInputConfig } from "@/components/common/form/FormInput";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFetchMutation } from "@/hooks/use-fetch-mutation";
import useSWR, { mutate } from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { ReusableTable } from "@/components/common/table/ReusableTable";
import { useSearchParams } from "next/navigation";
import { convertDataToObjectByKey } from "@/lib/utils";
import {
  IProject,
  PRODUCT_DEFAULT_VALUES,
  ProjectTypeWithId,
  projectValidation,
} from "@/backend/models/project/project.dto";
import dynamic from "next/dynamic";
import axiosInstance from "@/lib/axios.instanse";
import AvatarGroup from "@/components/common/AvatarGroup";
const FormModal = dynamic(() => import("@/components/common/form/FormModal"), {
  ssr: false,
});

const ProjectPageClient: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [crudModalState, setCrudModalState] = useState<{
    title: string;
    submitText: string;
    isUpdate: boolean;
    projectId?: string;
  }>({
    title: "",
    submitText: "",
    isUpdate: false,
  });

  const searchParams = useSearchParams();

  const { data: projectList, isLoading: projectListLoading } = useSWR(
    `/project?${searchParams.toString()}`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: categoryOptions, isLoading: categoryOptionsLoading } = useSWR(
    `/category/options`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const categoryObjectById = convertDataToObjectByKey(
    categoryOptions?.data || [],
    "value"
  );

  const {
    control,
    handleSubmit,
    setError,
    reset,
    // watch,
    // setValue,
    // formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: PRODUCT_DEFAULT_VALUES,
    resolver: zodResolver(projectValidation),
    mode: "all",
  });

  const { isLoading, mutateFn } = useFetchMutation();

  const handleDeleteProject = () => {
    mutateFn(
      () => axiosInstance.delete(`/project/${crudModalState.projectId}`),
      () => {
        setIsDeleteDialogOpen(false);
        setCurrentProject(null);

        mutate(
          `/project?${searchParams.toString()}`,
          (prevData?: { data: ProjectTypeWithId[] }) => {
            // Filter out the deleted project
            const updatedProjects = prevData?.data.filter(
              (project) => project._id !== crudModalState?.projectId
            );

            return {
              ...prevData,
              data: updatedProjects || [],
            };
          },
          {
            revalidate: false,
          }
        );
      },
      setError
    );
  };

  const openDeleteDialog = (project: IProject) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  const formSubmitHandler = (formData: FieldValues) => {
    const body = {
      ...formData,
    };

    if (formData._id) {
      delete body._id; // Remove _id if present to avoid conflicts
      delete body.discountPercentage; // Remove discountPercentage as it's not needed in the request
    }

    // Handle form submission logic here
    if (crudModalState.isUpdate) {
      // Update existing project
      mutateFn(
        () => axiosInstance.patch(`/project/${crudModalState.projectId}`, body),
        () => {
          setIsAddDialogOpen(false);
          reset(PRODUCT_DEFAULT_VALUES);

          mutate(
            `/project?${searchParams.toString()}`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (prevData?: { data: any[] }) => {
              // Update the local data with the updated project

              const cloneProjects = [...(prevData?.data || [])];

              const projectIndex = prevData?.data.findIndex(
                (project) => project._id === crudModalState.projectId
              );

              if (projectIndex !== undefined && projectIndex >= 0) {
                cloneProjects[projectIndex] = formData as IProject;
                cloneProjects[projectIndex]._id = crudModalState.projectId;
                cloneProjects[projectIndex].category = {
                  name: categoryObjectById[formData.category]?.label || "",
                  slug: categoryObjectById[formData.category]?.slug || "",
                  _id: categoryObjectById[formData.category]?.value || "",
                  image: categoryObjectById[formData.category]?.image || "",
                };
              }

              // Sort by createdAt in descending order
              return {
                ...prevData,
                data: cloneProjects,
              };
            },
            {
              revalidate: false,
            }
          );
        },
        setError
      );
    } else {
      mutateFn(
        () => axiosInstance.post("/project", body),
        () => {
          setIsAddDialogOpen(false);
          reset(PRODUCT_DEFAULT_VALUES);

          mutate(
            `/project?${searchParams.toString()}`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (prevData?: { data: any[] }) => {
              // Update the local data with the new project

              const createdProject = {
                ...formData,
                category: {
                  name: categoryObjectById[formData.category]?.label || "",
                  slug: categoryObjectById[formData.category]?.slug || "",
                  _id: categoryObjectById[formData.category]?.value || "",
                  image: categoryObjectById[formData.category]?.image || "",
                },
              };

              const data = [createdProject, ...(prevData?.data || [])];

              // Sort by createdAt in descending order
              return {
                ...prevData,
                data,
              };
            },
            {
              revalidate: false,
            }
          );
        },
        setError
      );
    }
  };

  const formInputData: FormInputConfig[] = [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      placeholder: "Enter project name",
      required: true,
    },
    // {
    //   name: "location",
    //   label: "Location",
    //   type: "text",
    //   placeholder: "Enter project location",
    //   required: true,
    // },
    // {
    //   name: "status",
    //   label: "Status",
    //   type: "text",
    //   placeholder: "Enter Status ",
    //   required: true,
    // },
    // {
    //   name: "year",
    //   label: "Year",
    //   type: "year",
    //   placeholder: "Enter Year ",
    //   required: true,
    // },
    {
      name: "images",
      label: "Media (Images/Videos)",
      type: "media",
      placeholder: "Upload project images or videos",
      required: true,
      isMultiple: true,
    },
    {
      name: "category",
      label: "Service",
      type: "select",
      required: true,
      options: categoryOptions?.data || [],
      disabled: categoryOptionsLoading,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter project description",
      className: "md:col-span-2 lg:col-span-3",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-xl lg:text-3xl font-bold">Project Management</h1>
        <Button
          onClick={() => {
            reset(PRODUCT_DEFAULT_VALUES);
            setCrudModalState({
              title: "Add New Project",
              submitText: "Add Project",
              isUpdate: false,
            });
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      <ReusableTable<ProjectTypeWithId>
        data={projectList?.data || []}
        columns={[
          {
            header: "Media",
            accessor: (row) => {
              return (
                <div className="flex space-x-2">
                  <AvatarGroup
                    data={row.images.map((image) => ({
                      name: row.name,
                      image: image || "",
                    }))}
                  />
                </div>
              );
            },
          },
          { header: "Name", accessor: "name" },

          {
            header: "Category",
            accessor: (row) =>
              typeof row.category === "object" && row.category !== null
                ? row.category.name
                : row.category,
          },
        ]}
        pagination={projectList?.pagination}
        onEdit={(cell) => {
          reset({
            ...cell,
            category:
              typeof cell.category === "object" && cell.category !== null
                ? cell.category._id
                : cell.category,
          });
          setCrudModalState({
            title: "Edit Project",
            submitText: "Update Project",
            isUpdate: true,
            projectId: String(cell._id),
          });
          setIsAddDialogOpen(true);
        }}
        onDelete={(cell) => {
          setCrudModalState((prev) => ({
            ...prev,
            projectId: String(cell._id),
          }));
          openDeleteDialog(cell);
        }}
        hasAction={true}
        isLoading={projectListLoading}
      />

      {/* Add or edit Project Dialog */}
      <FormModal
        {...{
          title: crudModalState.title,
          control,
          formData: formInputData,
          inputSize: "md",
          isLoading,
          isAddDialogOpen,
          setIsAddDialogOpen,
          handleSubmit,
          formSubmitHandler,
          submitText: crudModalState.submitText,
          dialogContentClassName: "sm:max-w-[1000px]",
          inputParentClassName:
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentProject?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProject}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? (
                <>
                  Loading... <Skeleton className="h-5 w-5" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectPageClient;
