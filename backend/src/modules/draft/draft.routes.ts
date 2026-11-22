import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";

import {
  getDraftsHandler,
  getDraftByIdHandler,
  createDraftHandler,
  saveDraftSectionHandler,
  saveItemHandler,
  deleteDraftHandler,
  finalizeDraftHandler,
} from "./draft.controller";

const router = Router();

router.use(requireAuth);

router.get("/", getDraftsHandler);
router.get("/:id", getDraftByIdHandler);

router.post("/", createDraftHandler);
router.patch("/:id/:section", saveDraftSectionHandler);
router.patch("/:id/:section/item", saveItemHandler);
router.delete("/:id", deleteDraftHandler);
router.post("/:id/finalize", finalizeDraftHandler);

export default router;
