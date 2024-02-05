import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { Authorization } from "eosjs/dist/eosjs-serialize";
const { TextEncoder, TextDecoder } = require('util');
require("dotenv").config();

// required params
if (!process.env.PRIVATE_KEYS) throw new Error("PRIVATE_KEYS is required");
if (!process.env.ACCOUNT) throw new Error("ACCOUNT is required");
if (!process.env.PERMISSION) throw new Error("PERMISSION is required");

export enum PriceSource {
  coinbase = "coinbase",
  coinmarketcap = "coinmarketcap"
}

export let PRICE_SOURCE = PriceSource.coinbase;
export let PRICE_API_KEY = process.env.PRICE_API_KEY;

if (process.env.PRICE_SOURCE) {
  PRICE_SOURCE = PriceSource[process.env.PRICE_SOURCE];
  if (!PRICE_SOURCE) {
    throw new Error('Invalid price source');
  }
}

if (PRICE_SOURCE === PriceSource.coinmarketcap && !PRICE_API_KEY) {
  throw new Error('api key is required to use conmarketcap')
}

const signatureProvider = new JsSignatureProvider(process.env.PRIVATE_KEYS.split(","));
export const rpc: any = new JsonRpc(process.env.NODEOS_ENDPOINT || '', { fetch: require('node-fetch') });
export const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

// settings
export const CRON_INTERVAL = process.env.CRON_INTERVAL || '* * * * *';
export const ACCOUNT = process.env.ACCOUNT;
export const PERMISSION = process.env.PERMISSION;
export const AUTHORIZATION: Authorization = { actor: ACCOUNT, permission: PERMISSION };