import axios from "axios";

export const getMarketPrice = async (marketId: string): Promise<number | null> => {
  try {
    const url = `https://www.buda.com/api/v2/markets/${marketId}/ticker`;
    const response = await axios.get(url);

    if (!response.data?.ticker?.last_price) {
      console.warn(`Mercado ${marketId} no tiene 'last_price'`);
      return null;
    }

    return parseFloat(response.data.ticker.last_price[0]);
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn(`El mercado ${marketId} no existe en Buda.com`);
    } else {
      console.warn(`Error obteniendo ${marketId}: ${error.message}`);
    }
    return null;
  }
};
