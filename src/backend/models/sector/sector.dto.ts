import z from "zod";

export interface ISector {
  name: string;
  description: string;
}

export type SectorTypeWithId = ISector & {
  _id: string;
};

const SECTOR_DEFAULT_VALUES: Partial<ISector> = {
  name: "",
  description: "",
};

const sectorsValidation = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
});

export { SECTOR_DEFAULT_VALUES, sectorsValidation };
