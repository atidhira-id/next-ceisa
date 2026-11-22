import express from "express";
import cors from "cors";
import { sessionMiddleware } from "./config/session";
import authRoutes from "./modules/auth/auth.routes";
import documentDraftRoutes from "./modules/draft/draft.routes";
import companyRoutes from "./modules/company/company.routes";
import supplierRoutes from "./modules/supplier/supplier.routes";
import optionsRoutes from "./modules/options/options.routes";
import hsCodeRoutes from "./modules/hsCode/hsCode.routes";
import goodsTypeRoutes from "./modules/goodsType/goodsType.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Express berjalan.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/drafts", documentDraftRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/options", optionsRoutes);
app.use("/api/hs-codes", hsCodeRoutes);
app.use("/api/goods-types", goodsTypeRoutes);

app.use(errorHandler);

export default app;
