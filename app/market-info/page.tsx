import { CoingeckoCoinData } from "@/types/coingecko.type";
import MarketInfo from "../ui/MarketInfo";

const STABLECOIN_IDS = [
  'tether',
  'usd-coin',
  'true-usd',
  'binance-usd',
  'paxos-standard',
  'first-digital-usd',
  'paypal-usd',
  'euro-coin',
  'usd1',
  'dai',
  'dai-on-pulsechain'
];

async function getCoins(): Promise<CoingeckoCoinData[]> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/" +
      "coins/markets?" +
      "vs_currency=usd" +
      `&ids=${STABLECOIN_IDS.join(',')}` +  // Add the specific coin IDs
      "&order=market_cap_desc" +
      "&per_page=250" +
      `&page=${1}` +
      "&sparkline=true" +
      "&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y" +
      "&locale=en" +
      `&x_cg_demo_api_key=${process.env.COINGECKO_API_SECRET_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch stablecoins: ${response.status}`);
  }

  const data = await response.json();
  console.log("MarketInfoPage", data);
  return data;
}

export default async function MarketInfoPaage() {
  const coins = await getCoins();

  return <MarketInfo coins={coins} />;
}
