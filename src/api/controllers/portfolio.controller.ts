import { Request, Response } from "express";
import { getMarketPrice } from "../services/buda.service";
import { PortfolioRequest } from "../types/portfolio";

export const calculatePortfolioValue = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { portfolio, fiat_currency }: PortfolioRequest = req.body;

    if (!portfolio || !fiat_currency) {
      res.status(400).json({
        success: false,
        message: "Debe enviar 'portfolio' y 'fiat_currency'.",
      });
      return;
    }

    let totalValue = 0;
    const results: Record<string, number> = {};

    for (const [symbol, amount] of Object.entries(portfolio)) {
      const marketId = `${symbol.toLowerCase()}-${fiat_currency.toLowerCase()}`;
      const price = await getMarketPrice(marketId);

      if (price) {
        const value = amount * price;
        results[symbol] = value;
        totalValue += value;
      } else {
        results[symbol] = 0;
      }
    }

    res.status(200).json({
      success: true,
      fiat_currency,
      total_value: totalValue,
      breakdown: results,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error al calcular el portafolio.",
      error: error.message,
    });
  }
};
