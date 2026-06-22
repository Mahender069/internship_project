import { z } from "zod";

export const compareCollegesSchema = z.object({
  collegeIds: z
    .array(z.string())
    .min(2, "Select at least 2 colleges")
    .max(3, "Maximum 3 colleges allowed"),
});