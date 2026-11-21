import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  listCompanies,
  showCompany,
  storeCompany,
  removeCompany,
} from "./company.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listCompanies);
router.get("/:id", showCompany);

router.post("/", storeCompany);
router.delete("/:id", removeCompany);

export default router;
