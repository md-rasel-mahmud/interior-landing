import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryClient } from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseInputClass = cn(
  "w-full bg-transparent border-0 border-b border-primary/30 rounded-none px-0 py-2",
  "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus:border-b-2 focus:border-primary",
  "transition-all duration-300 text-secondary/90 placeholder:text-secondary/50"
);

let queryClient: QueryClient | null = null;

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
};

export function setQueryStringBySearchParams(
  searchParams: URLSearchParams,
  updates: Record<string, string>
): string {
  const params = new URLSearchParams(searchParams.toString());
  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
}

export const compressImage = async (
  file: File,
  maxSizeKB = 100
): Promise<Blob> => {
  const img = new Image();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      if (!event.target?.result) return reject("No file content");

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Initial dimensions
        let width = img.width;
        let height = img.height;
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        let quality = 0.9;
        let blob: Blob | null = await new Promise((res) =>
          canvas.toBlob(res, "image/jpeg", quality)
        );

        while (blob && blob.size > maxSizeKB * 1024 && quality > 0.1) {
          quality -= 0.05;
          blob = await new Promise((res) =>
            canvas.toBlob(res, "image/jpeg", quality)
          );
        }

        // If still too large, resize dimensions
        while (
          blob &&
          blob.size > maxSizeKB * 1024 &&
          width > 100 &&
          height > 100
        ) {
          width *= 0.9;
          height *= 0.9;
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          blob = await new Promise((res) =>
            canvas.toBlob(res, "image/jpeg", quality)
          );
        }

        if (blob && blob.size <= maxSizeKB * 1024) {
          resolve(blob);
        } else {
          reject("Could not compress below 100KB");
        }
      };

      img.onerror = () => reject("Image load error");
      img.src = event.target.result as string;
    };

    reader.onerror = () => reject("File read error");
    reader.readAsDataURL(file);
  });
};

export const compressImageToFile = async (
  file: File,
  title: string,
  maxSizeKB = 100
): Promise<File> => {
  const blob = await compressImage(file, maxSizeKB);
  const safeTitle = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
  const ext = "jpg"; // Since compression is in JPEG
  const fileName = `${safeTitle}-${Date.now()}.${ext}`;
  return new File([blob], fileName, { type: "image/jpeg" });
};

type DataItem = Record<string, unknown>;

export function convertDataToObjectByKey<T extends DataItem>(
  data: T[] | undefined,
  keyName: keyof T,
  fieldsKey?: (keyof T)[]
): Record<string, Partial<T>> {
  const object =
    data?.reduce((acc: Record<string, Partial<T>>, curr: T) => {
      if (fieldsKey && fieldsKey.length > 0) {
        const field: Partial<T> = {};

        fieldsKey.forEach((key) => {
          field[key] = curr[key];
        });

        acc[String(curr[keyName])] = field;
      } else {
        acc[String(curr[keyName])] = curr;
      }

      return acc;
    }, {}) || {};

  return object;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

type Currency = "BDT" | "USD" | "INR";

export const getCurrencySymbol = (currency: Currency): string => {
  const symbols: Record<Currency, string> = {
    BDT: "৳",
    USD: "$",
    INR: "₹",
  };
  return symbols[currency];
};

export function isValidUrl(url: string) {
  return /^https?:\/\/\S+$/.test(url);
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) {
    return str;
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch {
    return null;
  }
}

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${url}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }
  const data = await response.json();
  return data as T;
};
