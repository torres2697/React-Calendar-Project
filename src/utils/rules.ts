import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export const rules = {
  required: (message: string = "Required field") => ({
    required: true,
    message,
  }),
  isDateAfter: (message: string) => () => ({
    validator(_: any, value: Dayjs) {
      if (value.isSame(dayjs()) || value.isAfter(dayjs())) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(message));
      }
    },
  }),
};
