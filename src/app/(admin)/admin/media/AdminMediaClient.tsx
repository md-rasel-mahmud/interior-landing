"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { useFetchMutation } from "@/hooks/use-fetch-mutation";
import useSWR, { mutate } from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { MediaTypeWithId } from "@/backend/models/media.model";
import { cn, compressImageToFile } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  CameraIcon,
  ChevronLeft,
  ChevronRight,
  SearchSlash,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Masonry from "react-masonry-css";
import Image from "next/image";
import axiosInstance from "@/lib/axios.instanse";
import { SortOrderEnum } from "@/enums/sort-order.enum";

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  768: 2,
  640: 1,
};

const PAGE_LIMIT = 200; // Items per page

const AdminMediaClient: React.FC = () => {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<File[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [tabValue, setTabValue] = useState("all-media");
  const [page, setPage] = useState(1);

  // Build query with pagination
  const queryString = `${searchParams.toString()}&page=${page}&limit=${PAGE_LIMIT}&sortBy=createdAt&sortOrder=${
    SortOrderEnum.DESC
  }`;

  const { data: mediaData, isLoading: mediaListLoading } = useSWR(
    `/media?${queryString}`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // mediaLists expected shape: { data: MediaTypeWithId[], total: number, page: number, totalPages: number }
  const mediaList = mediaData?.data || [];

  const mediaPagination = mediaData?.pagination;

  const totalPages = mediaPagination?.totalPages || 1;

  const { isLoading: uploadLoading } = useFetchMutation();

  const { isLoading: deleteLoading, mutateFn: deleteMutate } =
    useFetchMutation();

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("title", file.name);
        formData.append("type", "image");

        try {
          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

          const response = await axiosInstance.post("/media", formData, {
            headers: {
              "Content-Type": undefined,
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : 0;
              setUploadProgress((prev) => ({
                ...prev,
                [file.name]: percentCompleted,
              }));
            },
          });

          return response.data;
        } catch (error) {
          console.error(`Upload failed for ${file.name}:`, error);
          toast.error(`Failed to upload ${file.name}`);
          return null;
        }
      });

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter((res) => res !== null);

      if (successfulUploads.length > 0) {
        mutate(
          `/media?${queryString}`,
          (prevData: { data: MediaTypeWithId[] } | undefined) => {
            return {
              ...(prevData || { data: [] }),
              data: [...successfulUploads, ...(prevData?.data || [])],
            };
          },
          false
        );

        toast.success(
          `${successfulUploads.length} image(s) uploaded successfully`
        );
        setFiles([]);
        setUploadProgress({});
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed");
    }
  };

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setSelecting(true);
    const compressedFiles: File[] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const blob = await compressImageToFile(file, file.name, 200);
        if (blob) {
          compressedFiles.push(blob);
        }
      }

      setFiles((prevFiles) => [...prevFiles, ...compressedFiles]);
      toast.success(`${compressedFiles.length} image(s) selected`);
    } catch (error) {
      console.error("Error compressing files:", error);
      toast.error("Error processing images");
    } finally {
      setSelecting(false);
      // Reset the input value to allow selecting the same files again
      e.target.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDeleteMedia = async (mediaId: string, type: string) => {
    if (!mediaId || !type) {
      toast.error("Invalid media ID or type");
      return;
    }

    try {
      await deleteMutate(() =>
        axiosInstance
          .delete(`/media`, { data: { type, mediaId } })
          .then((res) => {
            mutate(
              `/media?${queryString}`,
              (prevData: { data: MediaTypeWithId[] } | undefined) => {
                return {
                  ...(prevData || { data: [] }),
                  data: (prevData?.data || []).filter(
                    (media) => media.mediaId !== mediaId
                  ),
                };
              },
              false
            );

            toast.success("Media deleted successfully");
            return res.data;
          })
      );
    } catch (error) {
      console.error("Failed to delete media:", error);
    }
  };

  // Pagination controls
  const canPrev = page > 1;
  const canNext = page < totalPages;
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-xl lg:text-3xl font-bold">Media Management</h1>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all-media">Media List</TabsTrigger>
          <TabsTrigger value="upload-media">
            <Camera className="mr-2" size={18} /> Upload New Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-media">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">All Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-[45vh] overflow-y-auto">
                {mediaListLoading ? (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-40 w-full" />
                    ))}
                  </div>
                ) : mediaList.length === 0 ? (
                  <div className="text-gray-500 flex items-center justify-center gap-3 py-10">
                    <SearchSlash /> No media found.
                  </div>
                ) : (
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex gap-4 "
                    columnClassName="bg-clip-padding"
                  >
                    {mediaList.map(
                      (mediaSingleData: MediaTypeWithId, idx: number) => (
                        <div
                          key={idx}
                          className={cn(
                            "mb-4 overflow-hidden rounded border hover:border-primary cursor-pointer relative",

                            deleteLoading
                              ? "pointer-events-none opacity-50"
                              : ""
                          )}
                        >
                          {deleteLoading ? (
                            <Skeleton className="absolute top-10 right-2 h-7 w-7 rounded" />
                          ) : (
                            <button
                              type="button"
                              className="absolute shadow hover:bg-red-900 top-10 right-2 bg-red-500 text-white px-2 py-1 rounded h-7 w-7 leading-[0] flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteMedia(
                                  mediaSingleData.mediaId,
                                  mediaSingleData.type
                                );
                              }}
                              disabled={deleteLoading}
                            >
                              <Trash2 className="inline" />
                            </button>
                          )}

                          <Image
                            src={mediaSingleData.url || "/placeholder.png"}
                            alt={`media-${idx}`}
                            width={300}
                            height={200}
                            className="w-full h-auto object-cover rounded-none"
                            unoptimized
                          />
                        </div>
                      )
                    )}
                  </Masonry>
                )}
              </div>
            </CardContent>

            {/* Pagination Controls */}
          </Card>

          <div className="bg-primary-foreground shadow-sm p-3 rounded border mt-2 flex justify-between">
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={!canPrev || mediaListLoading}
            >
              <ChevronLeft />
            </Button>

            <div className="self-center text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>

            <Button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={!canNext || mediaListLoading}
            >
              <ChevronRight />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="upload-media">
          {/* ... upload tab same as before */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Upload Media</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 flex items-center justify-center flex-col ">
              {files.length > 0 ? (
                <div className="w-full space-y-2 max-h-[50vh] overflow-y-auto">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex justify-between w-full bg-background items-center p-3 gap-3 rounded border"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Selected file ${index + 1}`}
                        width={150}
                        height={150}
                        className="rounded-none w-auto h-16 object-cover"
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-700 block truncate">
                          {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                        {uploadProgress[file.name] !== undefined && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.name]}%` }}
                            />
                          </div>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                        disabled={selecting || uploadLoading}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}

              {selecting ? (
                <p className="text-sm text-gray-500 p-3">
                  Compressing images, please wait...
                </p>
              ) : (
                <label className="border border-dashed rounded-none overflow-hidden cursor-pointer p-10 w-full flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors">
                  <CameraIcon />
                  <span className="text-sm text-gray-600">
                    Select Images (Multiple)
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSelectFile}
                    className="hidden"
                    disabled={selecting || uploadLoading}
                  />
                </label>
              )}
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button
                type="button"
                className="w-full"
                disabled={uploadLoading || files.length === 0}
                onClick={handleUpload}
              >
                {uploadLoading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload /> Upload{" "}
                    {files.length > 0 ? `(${files.length})` : ""}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMediaClient;
