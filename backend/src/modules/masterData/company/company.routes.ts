import { Router } from "express";
import { requireAuth } from "../../../middlewares/requireAuth";
import { listCompanies, showCompany } from "./company.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listCompanies);
router.get("/:id", showCompany);

export default router;
