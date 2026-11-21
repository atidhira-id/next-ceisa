import { documentItemSchema } from "./documents.schema";
import { packageItemSchema } from "./packages.schema";
import { containerItemSchema } from "./containers.schema";
import { goodsItemSchema } from "./goods.schema";

export const itemSchemas = {
  document: documentItemSchema,
  package: packageItemSchema,
  container: containerItemSchema,
  goods: goodsItemSchema,
} as const;

export type ItemType = keyof typeof itemSchemas;
