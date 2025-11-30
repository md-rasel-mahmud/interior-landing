"use client";
import AdminSettingPageSkeleton from "@/app/(admin)/admin/setting/AdminSettingPageSkeleton";
import {
  SETTING_DEFAULT_VALUES,
  settingValidationSchema,
} from "@/backend/models/setting/setting.dto";
import { FormInputConfig } from "@/components/common/form/FormInput";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchMutation } from "@/hooks/use-fetch-mutation";
import axiosInstance from "@/lib/axios.instanse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import useSWR, { mutate } from "swr";

const DynamicFormInput = dynamic(
  () =>
    import("@/components/common/form/FormInput").then((mod) => mod.FormInput),
  {
    ssr: false,
  }
);

const AdminSettingPageClient = () => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    watch,
    // formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: SETTING_DEFAULT_VALUES,
    mode: "all",
    resolver: zodResolver(settingValidationSchema),
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socials",
  });

  const {
    fields: aboutFeaturesFields,
    append: appendAboutFeature,
    remove: removeAboutFeature,
  } = useFieldArray({
    control,
    name: "about.features",
  });
  const {
    fields: metaKeywordsFields,
    append: appendMetaKeyword,
    remove: removeMetaKeyword,
  } = useFieldArray({
    control,
    name: "metaKeywords",
  });

  const { isLoading, mutateFn } = useFetchMutation();

  const { data: settingData, isLoading: settingListLoading } = useSWR(
    `/setting`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (
      settingData &&
      Array.isArray(settingData.data) &&
      settingData.data.length > 0
    ) {
      const initialData = settingData.data[0];

      reset({
        banner: {
          ...SETTING_DEFAULT_VALUES.banner,
          ...initialData.banner,
        },
        about: {
          ...SETTING_DEFAULT_VALUES.about,
          ...initialData.about,
        },
        footer: {
          ...SETTING_DEFAULT_VALUES.footer,
          ...initialData.footer,
        },
        title: initialData.title || "",
        logo: initialData.logo || "",
        favicon: initialData.favicon || "",
        metaDescription: initialData.metaDescription || "",
        metaKeywords: initialData.metaKeywords || [""],
        socials: initialData.socials || [],
        contact: {
          email: initialData.contact?.email || "",
          phone: initialData.contact?.phone || "",
          address: initialData.contact?.address || "",
        },
      });
    }
  }, [settingData]);

  const formSubmit = (data: FieldValues) => {
    // Here you can handle the form submission, e.g., send data to the server

    mutateFn(
      () => axiosInstance.patch(`setting/${settingData?.data?.[0]?._id}`, data),
      () => {
        mutate(
          `/setting`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (prevData?: { data: any }) => {
            // Update the local data with the new settings
            if (!prevData || !Array.isArray(prevData.data)) {
              return prevData;
            }
            const updatedData = [...prevData.data];

            updatedData[0] = {
              ...updatedData[0],
              ...data,
            };
            reset(updatedData[0]);
            return {
              ...prevData,
              data: updatedData,
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

  const formData: FormInputConfig[] = [
    {
      name: "title",
      label: "Website Title",
      type: "text",
      placeholder: "Enter website title",
      required: true,
    },
    {
      name: "logo",
      label: "Logo",
      type: "media",
      placeholder: "Upload logo",
      required: true,
    },
    {
      name: "favicon",
      label: "Favicon",
      type: "media",
      placeholder: "Upload favicon",
      required: true,
    },
    {
      name: "metaDescription",
      label: "Meta Description",
      type: "textarea",
      placeholder: "Enter meta description",
      required: true,
    },
    {
      name: "banner.title.prefix",
      label: "Banner Title Prefix",
      type: "text",
      placeholder: "Enter banner title prefix",
      required: true,
    },
    {
      name: "banner.title.highlight",
      label: "Banner Title Highlight",
      type: "text",
      placeholder: "Enter banner title highlight",
      required: true,
    },
    {
      name: "banner.description",
      label: "Banner Description",
      type: "textarea",
      placeholder: "Enter banner description",
      required: true,
    },
    {
      name: "banner.bannerImage",
      label: "Banner Images",
      type: "media",
      placeholder: "Upload banner images",
      required: true,
    },
    {
      name: "banner.hasOffer",
      label: "Has Offer",
      type: "switch",
    },
    {
      name: "banner.offer.title",
      label: "Offer Title",
      type: "text",
      placeholder: "Enter offer title",
      visible: watch("banner.hasOffer"),
    },
    {
      name: "banner.offer.description",
      label: "Offer Description",
      type: "textarea",
      placeholder: "Enter offer description",
      visible: watch("banner.hasOffer"),
    },
    {
      name: "banner.offer.amount",
      label: "Offer Amount",
      type: "number",
      placeholder: "Enter offer amount",
      visible: watch("banner.hasOffer"),
    },
    {
      name: "about.badge",
      label: "About Badge",
      type: "text",
      placeholder: "Enter about badge",
    },
    {
      name: "about.title.prefix",
      label: "About Title Prefix",
      type: "text",
      placeholder: "Enter about title prefix",
    },
    {
      name: "about.title.highlight",
      label: "About Title Highlight",
      type: "text",
      placeholder: "Enter about title highlight",
    },
    {
      name: "about.description",
      label: "About Description",
      type: "textarea",
      placeholder: "Enter about description",
      required: true,
    },
    {
      name: "about.image",
      label: "About Image",
      type: "media",
      placeholder: "Upload about image",
      required: true,
    },
    {
      name: "footer.title",
      label: "Footer Title",
      type: "text",
      placeholder: "Enter footer title",
    },
    {
      name: "footer.description",
      label: "Footer Description",
      type: "textarea",
      placeholder: "Enter footer description",
    },
    {
      name: "footer.footerLogo",
      label: "Footer Logo",
      type: "media",
      placeholder: "Upload footer Logo",
    },
    {
      name: "contact.email",
      label: "Contact Email",
      type: "email",
      placeholder: "Enter contact email",
      required: true,
    },
    {
      name: "contact.phone",
      label: "Contact Phone",
      type: "text",
      placeholder: "Enter contact phone",
      required: true,
    },
    {
      name: "contact.address",
      label: "Contact Address",
      type: "text",
      placeholder: "Enter contact address",
      required: true,
    },
  ];

  if (settingListLoading) {
    return <AdminSettingPageSkeleton />;
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit(formSubmit)} className="p-6 space-y-6">
          <DynamicFormInput formData={formData} control={control} />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Meta Keywords</h3>
            {metaKeywordsFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-4">
                <DynamicFormInput
                  formData={[
                    {
                      name: `metaKeywords.${index}`,
                      label: "Meta Keyword",
                      type: "text",
                      placeholder: "Enter meta keyword",
                      required: true,
                    },
                  ]}
                  control={control}
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="mt-3"
                  onClick={() => removeMetaKeyword(index)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="border-organic-500 text-organic-700 hover:bg-organic-50"
              onClick={() => appendMetaKeyword("")}
            >
              <Plus className="mr-2" />
              Add Meta Keyword
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Features</h3>
            {aboutFeaturesFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-4">
                <DynamicFormInput
                  formData={[
                    {
                      name: `about.features.${index}`,
                      label: "Feature",
                      type: "text",
                      placeholder: "Enter feature",
                      required: true,
                    },
                  ]}
                  control={control}
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="mt-3"
                  onClick={() => removeAboutFeature(index)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="border-organic-500 text-organic-700 hover:bg-organic-50"
              onClick={() => appendAboutFeature("")}
            >
              <Plus className="mr-2" />
              Add Feature
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Socials</h3>
            {socialFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-4"
              >
                <DynamicFormInput
                  formData={[
                    {
                      name: `socials.${index}.url`,
                      label: "URL",
                      type: "text",
                      placeholder: "Enter social URL",
                      required: true,
                    },
                    {
                      name: `socials.${index}.title`,
                      label: "Title",
                      type: "text",
                      placeholder: "Enter social title",
                      required: true,
                    },
                  ]}
                  control={control}
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="mt-3"
                  onClick={() => removeSocial(index)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="border-organic-500 text-organic-700 hover:bg-organic-50"
              onClick={() => appendSocial({ icon: "", url: "", title: "" })}
            >
              <Plus className="mr-2" />
              Add Social
            </Button>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                Loading... <Skeleton className="h-5 w-5" />
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </form>
      </div>
    );
  }
};

export default AdminSettingPageClient;
