import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {throwError, combineLatest, Subject } from 'rxjs';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';
import { CurrencyResponse } from './interfaces/currency-response.model';
import { HistoricCurrenyDetails } from './interfaces/histroric-currency-details.model';
import { Currency } from './interfaces/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencyUrl = 'https://api.exchangeratesapi.io/history?start_at=2018-06-01&end_at=2019-11-30';
  private selectedDateSubject = new Subject<Date>();
  selectedDateAction$ = this.selectedDateSubject.asObservable();

 
  currenyList$ = this.http.get<CurrencyResponse>(this.currencyUrl)
    .pipe(
      map(data => Object.entries (data.rates).map( items =>
        ({
          date: new Date(items[0]),
          currencyDetails: items[1] 
        }) as HistoricCurrenyDetails
      )),
      tap(data => console.log('Response: ',data)),
      catchError(this.handleError)
    );

    selectedCurrencyDetails$ = combineLatest([
      this.currenyList$,
      this.selectedDateAction$
    ]).pipe(
      map(([currencyList, selectedDate]) =>
       {
       const selectcurrency =  currencyList.find(currency => currency.date.getTime()  === selectedDate.getTime());
       return Object.entries(selectcurrency.currencyDetails)
       .map(details => 
            ({
              currencyType: details[0],
              rate: +details[1]
            }) as Currency
          )
      }
      ),
      shareReplay(1),
      tap(currency => console.log("selected currency", currency))
    )

    selectedDateChanged(selectedDate: Date): void {
      this.selectedDateSubject.next(selectedDate);
    }

  constructor(private http: HttpClient) { }

  private handleError(err: any) {
  
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
           errorMessage = `An error occurred: ${err.error.message}`;
    } else {
            errorMessage = `Backend returned code ${err.status}`;
    }
    return throwError(errorMessage);
  }

}
