export interface HistoricCurrenyDetails{
    date: Date;
    currencyDetails: CurrencyDetails
  }

  export type CurrencyDetails = Record<string,number>