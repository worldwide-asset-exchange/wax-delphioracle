import { CronJob } from "cron"
import { get_price } from "./plugins/price"
import { Quote, write } from "./plugins/delphioracle"
import { transact } from "./src/utils";
import { api, CRON_INTERVAL, ACCOUNT, AUTHORIZATION } from "./src/config";

console.log(`Starting cron job with interval ${CRON_INTERVAL}`);
new CronJob(CRON_INTERVAL, async () => {
    const usd = await get_price("WAXP-USD");
    const usdcusd = await get_price("USDC-USD");
    const usdtusd = await get_price("USDT-USD");

    const quotes: Quote[] = [
        { pair: "waxpusd", value: to_uint(usd, 4)},
        { pair: "usdcusd", value: to_uint(usdcusd, 4)},
        { pair: "usdtusd", value: to_uint(usdtusd, 4)}
    ]
    await transact( api, [ write( ACCOUNT, quotes, [ AUTHORIZATION ] )]);

}, null, true).fireOnTick();


function to_uint( num: string | number, exp: number ) {
    return Number((Number(num) * 10 ** exp).toFixed(0));
}
