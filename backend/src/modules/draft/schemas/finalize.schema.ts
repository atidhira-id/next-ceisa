import { z } from "zod";

import { headerSchema } from "./header.schema";
import { entitiesSchema } from "./entities.schema";
import { documentsSchema } from "./documents.schema";
import { packageItemSchema } from "./packages.schema";
import { containerItemSchema } from "./containers.schema";
import { transportSchema } from "./transport.schema";
import { transactionsSchema } from "./transaction.schema";
import { goodsSchema } from "./goods.schema";
import { declarationsSchema } from "./declarations.schema";

export const finalizeSchema = z.object({
  header: headerSchema,
  entities: entitiesSchema,
  documents: documentsSchema,
  packages: packageItemSchema,
  containers: containerItemSchema,
  transport: transportSchema,
  transactions: transactionsSchema,
  goods: goodsSchema,
  declarations: declarationsSchema,
});
