import z from "zod";

import { documentItemSchema } from "./sectionDocuments.schema";
import { packageItemSchema } from "./sectionPackages.schema";
import { containerItemSchema } from "./sectionContainers.schema";
import { goodsItemSchema } from "./sectionGoods.schema";

export const draftItemSectionSchema = z.enum([
  "documents",
  "packages",
  "containers",
  "goods",
]);

export type DraftItemSection = z.infer<typeof draftItemSectionSchema>;

export const itemSchemas = {
  documents: documentItemSchema,
  packages: packageItemSchema,
  containers: containerItemSchema,
  goods: goodsItemSchema,
} as const;
