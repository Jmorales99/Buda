import { Router } from "express"; 
import portfolioRoutes from "./routes/portfolio.routes";
import docsRoutes from "./routes/docs.routes";

const router = Router();

router.use("/portfolio", portfolioRoutes);
router.use("/docs", docsRoutes);

export default router;
