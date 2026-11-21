import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  getGoodsTypesController,
  getGoodsTypeByCodeController,
  upsertGoodsTypeController,
  deleteGoodsTypeController,
} from "./goodsType.controller";

const router = Router();

router.use(requireAuth);

router.get("/", getGoodsTypesController);
router.get("/:code", getGoodsTypeByCodeController);
router.post("/", upsertGoodsTypeController);
router.delete("/:code", deleteGoodsTypeController);

export default router;
