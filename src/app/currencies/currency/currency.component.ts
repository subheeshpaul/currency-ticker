
import { ChangeDetectionStrategy } from "@angular/core";
import { Component, Input } from "@angular/core";
import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { CurrencyService } from "../currency.service";
import { Currency } from "../interfaces/currency.model";

@Component({
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss'],
    selector:'currency-display',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CurrencyComponent   {

    private errorMessageSubject = new Subject<string>();
    errorMessage$ = this.errorMessageSubject.asObservable();
 
    currencyList$ = (this.currencyService.selectedCurrencyDetails$ as Observable<Currency[]>)
    .pipe
    (map(data => 
        data.sort((a,b) => {
        if (a.currencyType > b.currencyType) { return 1;}
        if (b.currencyType > a.currencyType) {return -1 }
        return 0;
      })
    ),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  constructor(private currencyService: CurrencyService) { }
  }
