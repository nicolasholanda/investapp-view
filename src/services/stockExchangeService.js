import {api} from "@/services/services";

const prefix = "/stock_exchange"

export const getTimeSeries = (symbol, interval) => {
    return api.get(`${prefix}/time_series`, {symbol, interval})
}

export const getGlobalQuote = (symbol) => {
    return api.get(`${prefix}/global_quote/${symbol}`)
}
