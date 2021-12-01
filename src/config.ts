import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { Authorization } from "eosjs/dist/eosjs-serialize";
const { TextEncoder, TextDecoder } = require('util');
require("dotenv").config();

// required params
if (!process.env.PRIVATE_KEYS) throw new Error("PRIVATE_KEYS is required");
if (!process.env.ACCOUNT) throw new Error("ACCOUNT is required");
if (!process.env.PERMISSION) throw new Error("PERMISSION is required");

const signatureProvider = new JsSignatureProvider(process.env.PRIVATE_KEYS.split(","));
export const rpc: any = new JsonRpc(process.env.NODEOS_ENDPOINT || '', { fetch: require('node-fetch') });
export const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

// settings
export const ACCOUNT = process.env.ACCOUNT;
export const PERMISSION = process.env.PERMISSION;
export const AUTHORIZATION: Authorization = { actor: ACCOUNT, permission: PERMISSION };