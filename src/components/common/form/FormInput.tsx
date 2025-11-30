// "use client";
import FormInputWrapper from "@/components/common/form/FormInputWrapper";
// import MediaModal from "@/components/common/MediaModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { baseInputClass, cn } from "@/lib/utils";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Camera, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Control, Controller, FieldValues, useWatch } from "react-hook-form";
import TooltipSlider from "rc-slider";
import RichEditor from "@/components/common/form/RichEditor";
import PasswordField from "@/components/common/form/PasswordField";
import MediaModal from "@/components/common/MediaModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

// types.ts
export type InputType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "month"
  | "year"
  | "url"
  | "password"
  | "textarea"
  | "checkbox"
  | "radio"
  | "select"
  | "file"
  | "single-checkbox"
  | "multiple-checkbox"
  | "switch"
  | "media"
  | "two-way-range"
  | "rich-editor";

export type OptionType = {
  label: string;
  value: string;
};

export interface FormInputConfig<Name extends string = string> {
  name: Name;
  label: string;
  type: InputType;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  options?: OptionType[]; // for select and radio
  className?: string;
  inputClassName?: string;
  colSpans?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  visible?: boolean;
  size?: "sm" | "md" | "lg";
  accept?: string; // for file input
  isMultiple?: boolean; // for file input
  min?: number; // for range inputs
  max?: number; // for range inputs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraOnChange?: (value: any) => void; // for custom onChange logic
}

interface FormInputProps {
  formData: FormInputConfig[];
  control: Control<FieldValues>;
  size?: "sm" | "md" | "lg";
}

export const FormInput = ({ formData, control }: FormInputProps) => {
  const [mediaModalOpenFor, setMediaModalOpenFor] = useState<{
    name: string;
    value?: string;
  } | null>(null);

  const watch = useWatch({
    control,
  });

  // Function to handle media selection
  const handleMediaSelect = (
    url: string | string[],
    fieldOnChange: (url: string | string[]) => void,
    value: string | string[] | null,
    isMultiple: boolean = false
  ) => {
    fieldOnChange(url);

    if (!isMultiple) {
      setMediaModalOpenFor(null); // close modal
    }
  };

  const commonInputTypes = ["text", "email", "number", "date", "url"];

  return formData.reduce((acc: React.ReactNode[], input, index) => {
    const { visible = true } = input;
    // const inputSize = input.size || size;

    if (commonInputTypes.includes(input.type) && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <Input
                {...field}
                type={input.type}
                disabled={input.disabled}
                placeholder={input.placeholder}
                className={cn(input.inputClassName, baseInputClass)}
                onWheel={(e) => {
                  if (input.type === "number") {
                    e.currentTarget.blur();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;

                  if (input.extraOnChange) {
                    input.extraOnChange(value);
                  }

                  if (input.type === "number") {
                    // Handle empty string separately (user clears the input)
                    if (value === "") {
                      field.onChange(null);
                    } else {
                      const parsedValue = Number(value);

                      if (!isNaN(parsedValue)) {
                        field.onChange(parsedValue);
                      }
                    }
                  } else {
                    field.onChange(value);
                  }
                }}
              />
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "month" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <Input
                {...field}
                type="month"
                disabled={input.disabled}
                placeholder={input.placeholder}
                className={cn(input.inputClassName, baseInputClass)}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                }}
              />
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "year" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => {
            const years = Array.from(
              { length: 120 },
              (_, i) => `${new Date().getFullYear() - i}`
            );

            return (
              <FormInputWrapper
                {...input}
                errorMessage={fieldState?.error?.message}
              >
                <select
                  {...field}
                  disabled={input.disabled}
                  className={cn(
                    "w-full border rounded-md px-3 py-2 h-10 bg-background text-sm",
                    input.inputClassName,
                    baseInputClass
                  )}
                >
                  <option value="">{input.placeholder || "Select Year"}</option>

                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </FormInputWrapper>
            );
          }}
        />
      );
    }

    if (input.type === "password" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <PasswordField
                {...{
                  ...field,
                  placeholder: input.placeholder,
                  disabled: input.disabled,
                }}
                className={input.inputClassName}
              />
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "textarea" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <Textarea
                {...field}
                placeholder={input.placeholder}
                disabled={input.disabled}
                className={cn(input.inputClassName, baseInputClass)}
              />
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "single-checkbox" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <Checkbox
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                disabled={input.disabled}
              />
            </FormInputWrapper>
          )}
        />
      );
    } else if (input.type === "switch" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <Switch
                id={input.name}
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                disabled={input.disabled}
                className={cn(input.inputClassName, baseInputClass)}
              />
              {/* <Label htmlFor={input.name} className="ml-2">
                {input.label}
              </Label> */}
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "multiple-checkbox" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <div className="space-y-2">
                {input?.options?.map((option: OptionType, i: number) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${input.name}-${i}`}
                      value={option.value ?? []}
                    />
                    <Label htmlFor={`${input.name}-${i}`}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "radio" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-2"
              >
                {input?.options?.map((option: OptionType, i: number) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.value}
                      id={`${input.name}-${i}`}
                    />
                    <Label htmlFor={`${input.name}-${i}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "two-way-range" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <TooltipSlider
                range
                min={input.min || 0}
                max={input.max || 100}
                value={field.value}
                onChange={field.onChange}
                styles={{
                  rail: {
                    background: `#4A7C59`,
                  },
                  track: {
                    background: "#31523c",
                  },
                }}
              />
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "select" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${input.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {input?.options?.map((option: OptionType, i: number) => (
                    <SelectItem key={i} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormInputWrapper>
          )}
        />
      );
    }
    if (input.type === "rich-editor" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => (
            <FormInputWrapper
              {...input}
              errorMessage={fieldState?.error?.message}
            >
              <RichEditor value={field.value} onChange={field.onChange} />
            </FormInputWrapper>
          )}
        />
      );
    }

    if (input.type === "media" && visible) {
      acc.push(
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <FormInputWrapper
                {...input}
                errorMessage={fieldState?.error?.message}
              >
                <div className="flex items-center justify-between space-x-4 bg-gray-100 p-1 rounded-none">
                  {field?.value && field?.value?.length > 0 ? (
                    input.isMultiple && Array.isArray(field.value) ? (
                      <div className="flex items-center gap-1 overflow-x-auto">
                        {field.value.map((url: string, i: number) => (
                          <div key={i} className="relative">
                            <Image
                              src={url || "/placeholder.svg"}
                              alt="selected media"
                              className="w-9 h-9 object-cover rounded-none"
                              width={80}
                              height={80}
                              unoptimized
                            />

                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-0 right-0 rounded-none-none p-1 text-xs"
                              onClick={(e) => {
                                e.preventDefault();

                                const newValue = field.value.filter(
                                  (v: string) => v !== url
                                );
                                field.onChange(newValue);
                              }}
                            >
                              <X />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Image
                        src={field.value || "/placeholder.svg"}
                        alt="selected media"
                        className="w-9 h-9 object-cover rounded-none"
                        width={80}
                        height={80}
                        unoptimized
                      />
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setMediaModalOpenFor({
                          name: input.name,
                          value: field?.value,
                        })
                      }
                      className="w-full h-9 border-2 border-dashed flex items-center gap-2 cursor-pointer hover:bg-gray-200 justify-center rounded-none"
                    >
                      <Camera className="text-gray-400" size={18} /> Select
                      Media
                    </button>
                  )}

                  {field?.value && field?.value?.length > 0 && (
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          setMediaModalOpenFor({
                            name: input.name,
                            value: field.value,
                          })
                        }
                        className="btn btn-primary"
                      >
                        <RefreshCw size={5} />
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.preventDefault();
                          field.onChange(null);
                        }}
                      >
                        <X size={5} />
                      </Button>
                    </div>
                  )}
                </div>

                {mediaModalOpenFor?.name === input.name && (
                  <MediaModal
                    onClose={() => setMediaModalOpenFor(null)}
                    value={watch[input.name]}
                    isMultiple={input.isMultiple}
                    onSelect={(url) =>
                      handleMediaSelect(
                        url,
                        field.onChange,
                        watch[input.name],
                        input.isMultiple
                      )
                    }
                  />
                )}
              </FormInputWrapper>
            );
          }}
        />
      );
    }

    return acc;
  }, []);
};
