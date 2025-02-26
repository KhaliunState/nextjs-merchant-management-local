import { statusValues, type Site } from "@/db/schema";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import * as z from "zod";

import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";

export const searchParamsCache = createSearchParamsCache({
  flags: parseAsArrayOf(z.enum(["advancedTable", "floatingBar"])).withDefault(
    [],
  ),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Site>().withDefault([
    { id: "created_at", desc: true },
  ]),
  site_name: parseAsString.withDefault(""),
  // status: parseAsArrayOf(z.enum(status.enumValues)).withDefault([]),
  // priority: parseAsArrayOf(z.enum(tasks.priority.enumValues)).withDefault([]),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export const createPspSchema = z.object({
  payment_id: z.string(),
  // label: z.enum(tasks.label.enumValues),
  // status: z.enum(tasks.status.enumValues),
  // priority: z.enum(tasks.priority.enumValues),
});

export const updatePspSchema = z.object({
  payment_id: z.string().optional(),  
  api_key: z.string().optional(),  
  password: z.string().optional(),   
  status: z.string().optional(),   
});

export type GetTasksSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
export type CreatePspSchema = z.infer<typeof createPspSchema>;
export type UpdatePspSchema = z.infer<typeof updatePspSchema>;
