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

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  768: 2,
  640: 1,
};

const PAGE_LIMIT = 12; // Items per page

const AdminMediaClient: React.FC = () => {
  const searchParams = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [tabValue, setTabValue] = useState("all-media");
  const [page, setPage] = useState(1);

  // Build query with pagination
  const queryString = `${searchParams.toString()}&page=${page}&limit=${PAGE_LIMIT}`;

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

  const { isLoading: uploadLoading, mutateFn: uploadMutate } =
    useFetchMutation();

  const { isLoading: deleteLoading, mutateFn: deleteMutate } =
    useFetchMutation();

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file, file.name);
    formData.append("title", file.name);
    formData.append("type", "image");

    try {
      uploadMutate(() =>
        axiosInstance.post("/media", formData).then((res) => {
          mutate(
            `/media?${queryString}`,
            (prevData: { data: MediaTypeWithId[] } | undefined) => {
              return {
                ...(prevData || { data: [] }),
                data: [res.data as MediaTypeWithId, ...(prevData?.data || [])],
              };
            },
            false
          );

          setFile(null);

          return res.data;
        })
      );
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (!targetFile) return;
    setSelecting(true);

    const blob = await compressImageToFile(targetFile, targetFile.name, 200);

    setSelecting(false);

    setFile(blob || null);
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
                            "mb-4 overflow-hidden rounded-none-none border hover:border-blue-500 cursor-pointer relative",

                            deleteLoading
                              ? "pointer-events-none opacity-50"
                              : ""
                          )}
                        >
                          {deleteLoading ? (
                            <Skeleton className="absolute top-10 right-2 h-7 w-7 rounded-none-none" />
                          ) : (
                            <button
                              type="button"
                              className="absolute shadow hover:bg-red-900 top-10 right-2 bg-red-500 text-white px-2 py-1 rounded-none-none h-7 w-7 leading-[0] flex items-center justify-center"
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

          <div className="bg-primary-foreground shadow-sm p-3 rounded-none-none border mt-2 flex justify-between">
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
              {file ? (
                <div className="mt-4 flex justify-between w-full bg-background items-center p-3 gap-3 rounded-none">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Selected file preview"
                    width={150}
                    height={150}
                    className="rounded-none w-auto h-16"
                    unoptimized
                  />
                  <span className="text-sm text-gray-700">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </span>

                  <Button
                    type="button"
                    variant="destructive"
                    className="mt-2"
                    size="sm"
                    onClick={() => setFile(null)}
                    disabled={selecting || uploadLoading}
                  >
                    <X />
                  </Button>
                </div>
              ) : selecting ? (
                <p className="text-sm text-gray-500 p-3">
                  Compressing image, please wait...
                </p>
              ) : (
                <label className=" border border-dashed rounded-none overflow-hidden cursor-pointer p-10 w-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 transition-colors">
                  <CameraIcon />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectFile}
                    className="hidden"
                  />
                </label>
              )}
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button
                type="button"
                className="w-full"
                disabled={uploadLoading || !file}
                onClick={handleUpload}
              >
                {uploadLoading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload /> Upload
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
