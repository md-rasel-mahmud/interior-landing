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
  SECTOR_DEFAULT_VALUES,
  ISector,
  SectorTypeWithId,
  sectorsValidation,
} from "@/backend/models/sector/sector.dto";
import dynamic from "next/dynamic";
import axiosInstance from "@/lib/axios.instanse";
import { useFetchMutation } from "@/hooks/use-fetch-mutation";

const AdminSectorComponent: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSector, setCurrentSector] = useState<ISector | null>(null);
  const [crudModalState, setCrudModalState] = useState<{
    title: string;
    submitText: string;
    isUpdate: boolean;
    sector?: string;
  }>({
    title: "",
    submitText: "",
    isUpdate: false,
  });

  const searchParams = useSearchParams();

  const { data: sectorList, isLoading: sectorListLoading } = useSWR(
    `/sector?${searchParams.toString()}&sortBy=createdAt&sortOrder=asc`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { control, handleSubmit, setError, reset } = useForm<FieldValues>({
    defaultValues: SECTOR_DEFAULT_VALUES,
    resolver: zodResolver(sectorsValidation),
    mode: "all",
  });

  const { isLoading, mutateFn } = useFetchMutation();

  const handleDeleteSector = () => {
    mutateFn(
      () => axiosInstance.delete(`/sector/${crudModalState.sector}`),
      () => {
        setIsDeleteDialogOpen(false);
        setCurrentSector(null);

        mutate(
          `/sector?${searchParams.toString()}&sortBy=createdAt&sortOrder=asc`,
          (prevData?: { data: SectorTypeWithId[] }) => {
            // Filter out the deleted sector
            const updatedSector = prevData?.data.filter(
              (sector) => sector._id !== crudModalState?.sector
            );

            return {
              ...prevData,
              data: updatedSector || [],
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

  const openDeleteDialog = (sector: ISector) => {
    setCurrentSector(sector);
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
      // Update existing sector
      mutateFn(
        () => axiosInstance.patch(`/sector/${crudModalState.sector}`, body),
        () => {
          setIsAddDialogOpen(false);
          reset(SECTOR_DEFAULT_VALUES);

          mutate(
            `/sector?${searchParams.toString()}&sortBy=createdAt&sortOrder=asc`,
            (prevData?: { data: SectorTypeWithId[] }) => {
              // Update the local data with the updated sector

              const cloneSector = [...(prevData?.data || [])];

              const sectorIndex = prevData?.data.findIndex(
                (sector) => sector._id === crudModalState.sector
              );

              if (sectorIndex !== undefined && sectorIndex >= 0) {
                cloneSector[sectorIndex] = {
                  ...(formData as ISector),
                  _id: crudModalState.sector ?? "",
                };
              }

              // Sort by createdAt in descending order
              return {
                ...prevData,
                data: cloneSector,
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
        () => axiosInstance.post("/sector", body),
        () => {
          setIsAddDialogOpen(false);
          reset(SECTOR_DEFAULT_VALUES);

          mutate(
            `/sector?${searchParams.toString()}&sortBy=createdAt&sortOrder=asc`,
            (prevData?: { data: ISector[] }) => {
              // Update the local data with the new sector
              const data = [formData as ISector, ...(prevData?.data || [])];

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
      label: "Sector Name",
      type: "text",
      placeholder: "Enter sector name",
      required: true,
      className: "md:col-span-2",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter sector description",
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-xl lg:text-3xl font-bold">Sector Management</h1>
        <Button
          onClick={() => {
            reset(SECTOR_DEFAULT_VALUES);
            setCrudModalState({
              title: "Add New Sector",
              submitText: "Add Sector",
              isUpdate: false,
            });
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Sector
        </Button>
      </div>

      <ReusableTable<SectorTypeWithId>
        data={sectorList?.data || []}
        columns={[
          { header: "Name", accessor: "name" },
          {
            header: "Description",
            accessor: "description",
          },
        ]}
        pagination={sectorList?.pagination}
        onEdit={(cell) => {
          reset(cell);
          setCrudModalState({
            title: "Edit Sector",
            submitText: "Update Sector",
            isUpdate: true,
            sector: String(cell._id),
          });
          setIsAddDialogOpen(true);
        }}
        onDelete={(cell) => {
          setCrudModalState((prev) => ({
            ...prev,
            sector: String(cell._id),
          }));
          openDeleteDialog(cell);
        }}
        hasAction={true}
        isLoading={sectorListLoading}
      />

      {/* Add or edit Sector Dialog */}
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
              Are you sure you want to delete {currentSector?.name}? This action
              cannot be undone.
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
              onClick={handleDeleteSector}
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

export default AdminSectorComponent;
