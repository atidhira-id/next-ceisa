import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";

import {
  listDrafts,
  showDraft,
  createNewDraft,
  saveDraftSection,
  removeDraft,
  validateItemHandler,
  finalizeDraftHandler,
} from "./draft.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listDrafts);
router.post("/", createNewDraft);

router.get("/:id", showDraft);
router.patch("/:id/:section", saveDraftSection);
router.delete("/:id", removeDraft);
router.post("/:id/finalize", requireAuth, finalizeDraftHandler);

router.post("/validate-item/:itemType", requireAuth, validateItemHandler);

export default router;
