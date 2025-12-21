"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchMutation } from "@/hooks/use-fetch-mutation";
import { MediaTypeWithId } from "@/backend/models/media.model";
import { cn, compressImageToFile } from "@/lib/utils";
import {
  Camera,
  CameraIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  SearchSlash,
  Upload,
  X,
  Film,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Masonry from "react-masonry-css";
import useSWR, { mutate } from "swr";
import axiosInstance from "@/lib/axios.instanse";

interface MediaModalProps {
  onClose: () => void;
  onSelect: (url: string | string[]) => void;
  value?: string | string[];
  isMultiple?: boolean;
  allowedTypes?: "image" | "video" | "both";
}

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  768: 2,
  640: 1,
};

const PAGE_LIMIT = 200; // Items per page

const MediaModal = ({
  onClose,
  onSelect,
  value,
  isMultiple,
  allowedTypes = "image",
}: MediaModalProps) => {
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
  const filteredMediaList =
    allowedTypes === "both"
      ? mediaList
      : mediaList.filter((m: MediaTypeWithId) => m.type === allowedTypes);

  const mediaPagination = mediaData?.pagination;

  const totalPages = mediaPagination?.totalPages || 1;

  const { isLoading: uploadLoading, mutateFn: uploadMutate } =
    useFetchMutation();

  // const { isLoading: deleteLoading, mutateFn: deleteMutate } =
  //   useFetchMutation();

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file, file.name);
    formData.append("title", file.name);
    const isVideo = file.type?.startsWith("video/") || false;
    formData.append("type", isVideo ? "video" : "image");

    try {
      uploadMutate(() =>
        axiosInstance
          .post("/media", formData, {
            headers: {
              "Content-Type": undefined, // IMPORTANT FIX
            },
          })
          .then((res) => {
            mutate(
              `/media?${queryString}`,
              (prevData: { data: MediaTypeWithId[] } | undefined) => {
                return {
                  ...(prevData || { data: [] }),
                  data: [
                    res.data as MediaTypeWithId,
                    ...(prevData?.data || []),
                  ],
                };
              },
              false
            );

            setFile(null);

            if (!isMultiple) {
              onSelect(res.data.url);
              onClose();
            } else {
              setTabValue("all-media");
            }

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

    // If video, don't compress
    if (targetFile.type?.startsWith("video/")) {
      setSelecting(false);
      setFile(targetFile);
      return;
    }

    const blob = await compressImageToFile(targetFile, targetFile.name, 200);

    setSelecting(false);

    setFile(blob || null);
  };

  // const handleDeleteMedia = async (mediaId: string, type: string) => {
  //   if (!mediaId || !type) {
  //     toast.error("Invalid media ID or type");
  //     return;
  //   }

  //   try {
  //     await deleteMutate(() =>
  //       axiosInstance
  //         .delete(`/media`, { data: { type, mediaId } })
  //         .then((res) => {
  //           mutate(
  //             `/media?${queryString}`,
  //             (prevData: { data: MediaTypeWithId[] } | undefined) => {
  //               return {
  //                 ...(prevData || { data: [] }),
  //                 data: (prevData?.data || []).filter(
  //                   (media) => media.mediaId !== mediaId
  //                 ),
  //               };
  //             },
  //             false
  //           );

  //           toast.success("Media deleted successfully");
  //           return res.data;
  //         })
  //     );
  //   } catch (error) {
  //     console.error("Failed to delete media:", error);
  //   }
  // };

  // Pagination controls
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select or Upload Media</DialogTitle>
          <DialogDescription>
            {allowedTypes === "video"
              ? "Choose a video from the list or upload a new one."
              : allowedTypes === "both"
              ? "Choose an image or video from the list or upload a new one."
              : "Choose an image from the list or upload a new one."}
          </DialogDescription>
        </DialogHeader>

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
                <div className="h-52 overflow-y-auto">
                  {mediaListLoading ? (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-40 w-full" />
                      ))}
                    </div>
                  ) : filteredMediaList.length === 0 ? (
                    <div className="text-gray-500 flex items-center justify-center gap-3 py-10">
                      <SearchSlash /> No media found.
                    </div>
                  ) : (
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="flex gap-4 "
                      columnClassName="bg-clip-padding"
                    >
                      {filteredMediaList.map(
                        (mediaSingleData: MediaTypeWithId, idx: number) => (
                          <div
                            key={idx}
                            className={cn(
                              "mb-4 overflow-hidden rounded-lg border-2 hover:border-blue-500 cursor-pointer relative",
                              (isMultiple
                                ? Array.isArray(value) &&
                                  value.includes(mediaSingleData.url)
                                : mediaSingleData.url === value) &&
                                "border-primary overflow-hidden shadow-md"
                              // deleteLoading
                              //   ? "pointer-events-none opacity-50"
                              //   : ""
                            )}
                            onClick={() => {
                              if (isMultiple) {
                                const newValue = value
                                  ? Array.isArray(value)
                                    ? value.includes(mediaSingleData.url)
                                      ? value.filter(
                                          (v) => v !== mediaSingleData.url
                                        )
                                      : [...value, mediaSingleData.url]
                                    : [mediaSingleData.url]
                                  : [mediaSingleData.url];
                                onSelect(newValue);
                              } else {
                                onSelect(mediaSingleData.url);
                              }
                            }}
                          >
                            {/* 
                            {deleteLoading ? (
                              <Skeleton className="absolute top-10 right-2 h-7 w-7 rounded-lg" />
                            ) : (
                              <button
                                type="button"
                                className="absolute shadow hover:bg-red-900 top-10 right-2 bg-red-500 text-white px-2 py-1 rounded-lg h-7 w-7 leading-[0] flex items-center justify-center"
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
                            )} */}

                            {mediaSingleData.type === "video" ? (
                              <div
                                className={cn("relative z-10 overflow-hidden")}
                              >
                                <video
                                  src={mediaSingleData.url}
                                  className="w-full h-auto object-cover opacity-90"
                                  muted
                                  playsInline
                                />
                                <Play className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow z-10" />
                              </div>
                            ) : (
                              <Image
                                src={mediaSingleData.url || "/placeholder.png"}
                                alt={`media-${idx}`}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover rounded-none"
                                unoptimized
                              />
                            )}

                            {(isMultiple
                              ? Array.isArray(value) &&
                                value.includes(mediaSingleData.url)
                              : mediaSingleData.url === value) && (
                              <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-lg h-6 w-6 leading-[0] flex items-center justify-center z-10">
                                <Check className="inline" />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </Masonry>
                  )}
                </div>
              </CardContent>

              {/* Pagination Controls */}
              <CardFooter className="flex justify-between">
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
              </CardFooter>
            </Card>
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
                    {file.type?.startsWith("video/") ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <Film />
                        </div>
                        <span className="text-sm text-gray-700">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                          MB)
                        </span>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}

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
                    {allowedTypes === "video"
                      ? "Preparing video, please wait..."
                      : "Compressing image, please wait..."}
                  </p>
                ) : (
                  <label className=" border border-dashed rounded-none overflow-hidden cursor-pointer p-10 w-full flex flex-col gap-2 justify-center items-center bg-gray-100 hover:bg-gray-200 transition-colors">
                    <div className="flex items-center gap-2 text-gray-700">
                      {(allowedTypes === "image" ||
                        allowedTypes === "both") && <CameraIcon />}
                      {(allowedTypes === "video" ||
                        allowedTypes === "both") && <Film />}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {allowedTypes === "video"
                        ? "Click to upload videos"
                        : allowedTypes === "both"
                        ? "Click to upload images or videos"
                        : "Click to upload images"}
                    </span>

                    <input
                      type="file"
                      accept={
                        allowedTypes === "video"
                          ? "video/*"
                          : allowedTypes === "both"
                          ? "image/*,video/*"
                          : "image/*"
                      }
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

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={uploadLoading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={uploadLoading || selecting}
            onClick={onClose}
          >
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
