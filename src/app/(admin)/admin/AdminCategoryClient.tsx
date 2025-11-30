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

// import FormModal from "@/components/common/form/FormModal";
const FormModal = dynamic(() => import("@/components/common/form/FormModal"), {
  ssr: false,
});
import useSWR, { mutate } from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { ReusableTable } from "@/components/common/table/ReusableTable";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  CATEGORY_DEFAULT_VALUES,
  CategoryTypeWithId,
  categoryValidation,
  ICategory,
} from "@/backend/models/category/category.dto";
import dynamic from "next/dynamic";
import axiosInstance from "@/lib/axios.instanse";
import { useFetchMutation } from "@/hooks/use-fetch-mutation";

const AdminCategoryClient: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );
  const [crudModalState, setCrudModalState] = useState<{
    title: string;
    submitText: string;
    isUpdate: boolean;
    category?: string;
  }>({
    title: "",
    submitText: "",
    isUpdate: false,
  });

  const searchParams = useSearchParams();

  const { data: categoryList, isLoading: categoryListLoading } = useSWR(
    `/category?${searchParams.toString()}`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { control, handleSubmit, setError, reset } = useForm<FieldValues>({
    defaultValues: CATEGORY_DEFAULT_VALUES,
    resolver: zodResolver(categoryValidation),
    mode: "all",
  });

  const { isLoading, mutateFn } = useFetchMutation();

  const handleDeleteCategory = () => {
    mutateFn(
      () => axiosInstance.delete(`/category/${crudModalState.category}`),
      () => {
        setIsDeleteDialogOpen(false);
        setCurrentCategory(null);

        mutate(
          `/category?${searchParams.toString()}`,
          (prevData?: { data: CategoryTypeWithId[] }) => {
            // Filter out the deleted category
            const updatedCategory = prevData?.data.filter(
              (category) => category._id !== crudModalState?.category
            );

            return {
              ...prevData,
              data: updatedCategory || [],
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

  const openDeleteDialog = (category: ICategory) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const formSubmitHandler = (formData: FieldValues) => {
    const body = {
      ...formData,
    };

    if (formData._id) {
      delete body._id; // Remove _id if present to avoid conflicts
    }

    // Handle form submission logic here
    if (crudModalState.isUpdate) {
      // Update existing category
      mutateFn(
        () => axiosInstance.patch(`/category/${crudModalState.category}`, body),
        () => {
          setIsAddDialogOpen(false);
          reset(CATEGORY_DEFAULT_VALUES);

          mutate(
            `/category?${searchParams.toString()}`,
            (prevData?: { data: CategoryTypeWithId[] }) => {
              // Update the local data with the updated category

              const cloneCategory = [...(prevData?.data || [])];

              const categoryIndex = prevData?.data.findIndex(
                (category) => category._id === crudModalState.category
              );

              if (categoryIndex !== undefined && categoryIndex >= 0) {
                cloneCategory[categoryIndex] = {
                  ...(formData as ICategory),
                  _id: crudModalState.category ?? "",
                };
              }

              // Sort by createdAt in descending order
              return {
                ...prevData,
                data: cloneCategory,
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
        () => axiosInstance.post("/category", body),
        () => {
          setIsAddDialogOpen(false);
          reset(CATEGORY_DEFAULT_VALUES);

          mutate(
            `/category?${searchParams.toString()}`,
            (prevData?: { data: ICategory[] }) => {
              // Update the local data with the new category
              const data = [formData as ICategory, ...(prevData?.data || [])];

              // Sort by createdAt in descending order
              return {
                ...prevData,
                data,
              };
            },
            {
              revalidate: true,
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
      label: "Service Name",
      type: "text",
      placeholder: "Enter category name",
      required: true,
      className: "md:col-span-2",
    },
    // {
    //   name: "slug",
    //   label: "Slug",
    //   type: "text",
    //   placeholder: "Enter category slug",
    //   required: true,
    // },
    {
      name: "image",
      label: "Image",
      type: "media",
      placeholder: "Upload category image",
      required: true,
      isMultiple: false,
      className: "md:col-span-2",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter category description",
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-xl lg:text-3xl font-bold">Service Management</h1>
        <Button
          onClick={() => {
            reset(CATEGORY_DEFAULT_VALUES);
            setCrudModalState({
              title: "Add New Service",
              submitText: "Add Service",
              isUpdate: false,
            });
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <ReusableTable<CategoryTypeWithId>
        data={categoryList?.data || []}
        columns={[
          {
            header: "Image",
            accessor: (row) => (
              <div className="flex space-x-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover object-top"
                    src={row?.image}
                    alt={row?.name}
                  />

                  <AvatarFallback>
                    {row?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ),
          },
          { header: "Name", accessor: "name" },
          // { header: "Slug", accessor: "slug" },
          {
            header: "Description",
            accessor: "description",
          },
        ]}
        pagination={categoryList?.pagination}
        onEdit={(cell) => {
          reset(cell);
          setCrudModalState({
            title: "Edit Service",
            submitText: "Update Service",
            isUpdate: true,
            category: String(cell._id),
          });
          setIsAddDialogOpen(true);
        }}
        onDelete={(cell) => {
          setCrudModalState((prev) => ({
            ...prev,
            category: String(cell._id),
          }));
          openDeleteDialog(cell);
        }}
        hasAction={true}
        isLoading={categoryListLoading}
      />

      {/* Add or edit Category Dialog */}
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
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentCategory?.name}? This
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
              onClick={handleDeleteCategory}
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

export default AdminCategoryClient;
