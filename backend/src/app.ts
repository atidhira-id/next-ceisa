import express from "express";
import cors from "cors";
import { sessionMiddleware } from "./config/session";
import authRoutes from "./modules/auth/auth.routes";
import companyRoutes from "./modules/masterData/company/company.routes";
import clientRoutes from "./modules/masterData/supplier/supplier.routes";
import documentDraftRoutes from "./modules/documentDraft/documentDraft.routes";

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
app.use("/api/companies", companyRoutes);
app.use("/api/supplier", clientRoutes);
app.use("/api/document-drafts", documentDraftRoutes);

export default app;
