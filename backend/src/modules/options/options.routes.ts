import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  listOptionCategories,
  listOptions,
  storeOption,
  editOption,
  removeOption,
} from "./options.controller";

const router = Router();

router.use(requireAuth);

router.get("/categories", listOptionCategories);
router.get("/categories/:code/items", listOptions);
router.post("/categories/:code/items", storeOption);

router.patch("/items/:id", editOption);
router.delete("/items/:id", removeOption);

export default router;
