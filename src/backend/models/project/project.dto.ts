import z from "zod";

export interface IProject {
  name: string;
  description: string;
  location?: string;
  images: string[];
  category:
    | string
    | {
        name: string;
        slug: string;
        _id: string;
        image?: string;
      };

  status?: string;
  year?: string;
}

export type ProjectTypeWithId = IProject & {
  _id: string;
};

const PRODUCT_DEFAULT_VALUES: Partial<IProject> = {
  name: "",
  description: "",
  location: "",
  category: "",
  images: [],
  status: "",
  year: "",
};

const projectValidation = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
  // location: z.string().min(1, "Location is required"),
  // status: z.string().min(1, "Status is required"),
  // year: z.string().min(1, "Year is required"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

export { PRODUCT_DEFAULT_VALUES, projectValidation };
