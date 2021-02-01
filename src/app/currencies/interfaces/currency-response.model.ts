import { CurrencyDetails } from "./histroric-currency-details.model";

export interface CurrencyResponse {
    base: string;
    end_at: string;
    rates: HistoricCurrencyRates;
    start_at: string
  }
   
export type HistoricCurrencyRates = Record<string, CurrencyDetails>