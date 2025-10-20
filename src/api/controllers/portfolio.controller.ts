import { Request, Response } from "express";
import { getMarketPrice } from "../services/buda.service";
import { PortfolioRequest } from "../types/portfolio";

const SUPPORTED_FIAT = ["CLP", "PEN", "COP"];

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

    if (!SUPPORTED_FIAT.includes(fiat_currency.toUpperCase())) {
      res.status(400).json({
        success: false,
        message: `La moneda fiat '${fiat_currency}' no es soportada. Usa CLP, PEN o COP.`,
      });
      return;
    }

    let totalValue = 0;
    const breakdown: Record<string, number> = {};
    const errors: string[] = [];

    for (const [symbol, amount] of Object.entries(portfolio)) {
      const marketId = `${symbol.toLowerCase()}-${fiat_currency.toLowerCase()}`;
      const price = await getMarketPrice(marketId);

      if (price) {
        const value = amount * price;
        breakdown[symbol] = value;
        totalValue += value;
      } else {
        breakdown[symbol] = 0;
        errors.push(`No se encontró el mercado ${marketId}`);
      }
    }

    if (errors.length > 0) {
      res.status(207).json({
        success: false,
        message: "Algunos mercados no se pudieron obtener correctamente.",
        errors,
        fiat_currency,
        total_value: totalValue,
        breakdown,
      });
      return;
    }

    res.status(200).json({
      success: true,
      fiat_currency,
      total_value: totalValue,
      breakdown,
    });
  } catch (error: any) {
    console.error("Error al calcular portafolio:", error);
    res.status(500).json({
      success: false,
      message: "Error interno al calcular el portafolio.",
      error: error.message,
    });
  }
};
