import { Router } from "express";
import { calculatePortfolioValue } from "../controllers/portfolio.controller";

const router = Router();

router.post("/", calculatePortfolioValue);

export default router;
