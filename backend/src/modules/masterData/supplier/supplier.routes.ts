import { Router } from "express";
import { requireAuth } from "../../../middlewares/requireAuth";
import { listSuppliers, showSupplier } from "./supplier.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listSuppliers);
router.get("/:id", showSupplier);

export default router;
