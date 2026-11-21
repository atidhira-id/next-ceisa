import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  listSuppliers,
  showSupplier,
  storeSupplier,
  removeSupplier,
} from "./supplier.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listSuppliers);
router.get("/:id", showSupplier);

router.post("/", storeSupplier);
router.delete("/:id", removeSupplier);

export default router;
