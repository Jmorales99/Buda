import { Router } from "express";
import portfolioRoutes from "./routes/portfolio.routes";

const router = Router();

router.use("/portfolio", portfolioRoutes);

export default router;
