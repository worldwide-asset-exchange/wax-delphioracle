import { Action, Authorization } from "eosjs/dist/eosjs-serialize";

export interface Quote {
    value: number;
    pair: string
}

export function write( owner: string, quotes: Quote[], authorization?: Authorization[] ): Action {
    return {
        account: "delphioracle",
        name: "write",
        authorization: authorization || [ { actor: owner, permission: "active" } ],
        data: {
            owner,
            quotes,
        }
    }
}
