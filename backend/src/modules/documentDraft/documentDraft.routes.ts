import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";

import {
  listDocumentDrafts,
  showDocumentDraft,
  createNewDocumentDraft,
  saveDocumentDraftSection,
  removeDocumentDraft,
  finalizeDocumentDraftHandler,
} from "./documentDraft.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listDocumentDrafts);
router.post("/", createNewDocumentDraft);

router.get("/:id", showDocumentDraft);
router.patch("/:id/:section", saveDocumentDraftSection);
router.delete("/:id", removeDocumentDraft);
router.post("/:id/finalize", requireAuth, finalizeDocumentDraftHandler);

export default router;
