import { z } from "zod";

export const getCollegesSchema = z.object({
  search: z.string().optional(),
  state: z.string().optional(),
  minFees: z.coerce.number().optional(),
  maxFees: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  sortBy: z
    .enum(["rating", "fees", "placementRate", "averagePackage"])
    .default("rating"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type GetCollegesQuery = z.infer<typeof getCollegesSchema>;