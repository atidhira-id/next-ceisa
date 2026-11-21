import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  getHsCodesController,
  getHsCodeByCodeController,
  upsertHsCodeController,
  deleteHsCodeController,
} from "./hsCode.controller";

const router = Router();

router.use(requireAuth);

router.get("/", getHsCodesController);
router.get("/:code", getHsCodeByCodeController);
router.post("/", upsertHsCodeController);
router.delete("/:code", deleteHsCodeController);

export default router;
