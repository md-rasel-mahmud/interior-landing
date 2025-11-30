import z from "zod";

export interface IUnit {
  name: string;
  description: string;
}

export type UnitTypeWithId = IUnit & {
  _id: string;
};

const UNIT_DEFAULT_VALUES: Partial<IUnit> = {
  name: "",
  description: "",
};

const unitValidation = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
});

export { UNIT_DEFAULT_VALUES, unitValidation };
