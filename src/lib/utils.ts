import clsx, { ClassValue } from 'clsx';
import { format } from 'date-fns';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export const initials = (fullName: string) => {
  const names = fullName.split(" ");
  if (names.length < 2) {
    // Not enough initials thus...
    return fullName.slice(0, 2).toUpperCase(); // return first 2 letters of the name
  }
  names.splice(2);
  return names.map((word) => word.charAt(0).toUpperCase()).join("");
};

export const delay = (time: number, callback?: () => void): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      if (callback) callback();
    }, time);
  });
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const lastSeen = (time: Date | undefined) => {
  if (!time) return "";
  return moment(time, "YYYY-MM-DD HH:mm:ss").fromNow();
};

const FORMAT_OPTIONS = {
  tiny: "MM/dd", // 01/22
  short: "P", // 01/01/2020
  medium: "PP", // Jan 1, 2020
  long: "PPPP", // Wednesday, January 1st, 2020
  fullDate: "yyyy-MM-dd", // 2020-01-01
  fullDateTime: "yyyy-MM-dd HH:mm:ss", // 2020-01-01 00:00:00
  hourMinute: "HH:mm", // 00:00
  hour: "HH", // 00
};

type FormatOption =
  | "tiny"
  | "short"
  | "medium"
  | "long"
  | "fullDate"
  | "fullDateTime"
  | "hourMinute"
  | "hour";

export const formatDate = (
  date: Date | undefined,
  formatOption: FormatOption = "short"
) => {
  if (!date) return "";
  // Use the format option if it exists, otherwise use the provided string
  const formatStr = FORMAT_OPTIONS[formatOption] || formatOption;
  return format(new Date(date), formatStr);
};

export const formatDateToLocal = (
  dateStr: string | null | undefined,
  locale: string = "en-US"
) => {
  if (!dateStr || dateStr.length <= 0) {
    return "";
  }
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const isEmptyObj = (obj: Record<string, any>) => {
  return Object.keys(obj).length === 0;
};

export const toBool = (value: string | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "boolean") return value;
  const trimmed = value.trim().toLowerCase();
  switch (trimmed) {
    case "true":
    case "yes":
    case "on":
    case "1":
      return true;

    case "false":
    case "no":
    case "off":
    case "0":
      return false;

    default:
      // Wrapped JSON.parse in a try-catch block to handle cases where the input
      // isn’t valid JSON, which could be common since the inputs are likely not
      // always JSON strings. This way, we default false if JSON.parse fails.
      try {
        return Boolean(JSON.parse(trimmed));
      } catch (e) {
        return false;
      }
  }
};

// Converts a slider value (1-100) to a decimal (0.0-1.0)
// TODO: Move this to a utility function and folder
export const numToDecimal = (value: number | undefined) => {
  if (value === undefined) return 0;
  return (value - 1) / 99;
};
