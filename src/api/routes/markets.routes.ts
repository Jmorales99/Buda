import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const response = await axios.get("https://www.buda.com/api/v2/markets");
    const markets = response.data.markets.map((m: any) => ({
      id: m.id.toUpperCase(),
      name: `${m.base_currency} / ${m.quote_currency}`,
    }));
    res.json({ markets });
  } catch (error) {
    console.error("Error al obtener mercados:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener mercados desde Buda.com",
    });
  }
});

export default router;
