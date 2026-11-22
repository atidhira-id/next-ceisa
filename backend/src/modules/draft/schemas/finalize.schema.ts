import { z } from "zod";

import { headerFinalSchema } from "./sectionHeader.schema";
import { entitiesFinalSchema } from "./sectionEntities.schema";
import { documentsFinalSchema } from "./sectionDocuments.schema";
import { packagesFinalSchema } from "./sectionPackages.schema";
import { containersFinalSchema } from "./sectionContainers.schema";
import { transportFinalSchema } from "./sectionTransport.schema";
import { transactionFinalSchema } from "./sectionTransaction.schema";
import { goodsFinalSchema } from "./sectionGoods.schema";
import { declarationsFinalSchema } from "./sectionDeclarations.schema";

export const finalizeSchema = z.object({
  header: headerFinalSchema,
  entities: entitiesFinalSchema,
  documents: documentsFinalSchema,
  packages: packagesFinalSchema,
  containers: containersFinalSchema,
  transport: transportFinalSchema,
  transactions: transactionFinalSchema,
  goods: goodsFinalSchema,
  declarations: declarationsFinalSchema,
});
