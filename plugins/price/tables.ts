import fetch from "node-fetch";
import { PRICE_SOURCE, PRICE_API_KEY, PriceSource } from "../../src/config";

export async function get_price(pair: string): Promise<number> {
    if (PRICE_SOURCE === PriceSource.coinbase) {
      return get_price_coinbase(pair);
    } else if (PRICE_SOURCE === PriceSource.coinmarketcap) {
      return get_price_coinmarketcap(pair);
    } else {
      throw new Error('Price source not found');
    }
}

export async function get_price_coinbase(pair: string): Promise<number> {
    const url = `https://api.coinbase.com/v2/prices/${pair}/buy`;
    const response = await fetch( url );
    const result = await response.json();
    return Number(result.data.amount);
}

export async function get_price_coinmarketcap(pair: string): Promise<number> {
    const pairSlit = pair.split('-');
    const symbol = pairSlit[0];
    const base = pairSlit[1];
    let response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?symbol=${symbol}&amount=1&convert=${base}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': PRICE_API_KEY,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error('Error getting rate per usd from coinmarketcap');
      }
  
      const result = await response.json();
  
      if (result.status.error_code !== 0) {
        throw new Error('Error getting rate per usd from coinmarketcap');
      }
  

      return Number(result.data[0].quote['USD'].price);
}

// (async () => {
//     const foo = await get_ticker("WAXP-BTC")
//     console.log(foo);
// })()