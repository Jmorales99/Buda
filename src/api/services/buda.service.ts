import axios from "axios";

export const getMarketPrice = async (marketId: string): Promise<number | null> => {
  try {
    const url = `https://www.buda.com/api/v2/markets/${marketId}/ticker`;
    const response = await axios.get(url);
    const lastPrice = parseFloat(response.data.ticker.last_price[0]);
    return lastPrice;
  } catch (error) {
    console.warn(`❌ No se pudo obtener el precio para ${marketId}`);
    return null;
  }
};
