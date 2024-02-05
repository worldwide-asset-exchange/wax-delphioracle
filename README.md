# WAX Delphi Oracle - Price feed

## Price feeds

- Coinbase: [WAXP/USD](https://api.coinbase.com/v2/prices/WAXP-USD/buy)
- Coinmarketcap: [WAXP/BTC](https://pro-api.coinmarketcap.com/v2/tools/price-conversion?symbol=WAXP&amount=1&convert=BTC)

## `.env` settings

```bash
NODEOS_ENDPOINT="https://wax.eosn.com"
PRIVATE_KEYS="<PRIVATE KEY>"
ACCOUNT="<ACCOUNT>"
PERMISSION="<PERMISSION>"
PRICE_SOURCE=<coinbase or coinmarketcap>
```

## Install

```
$ pm2 install typescript
$ npm install
```

## Quickstart

```
$ npm start
```