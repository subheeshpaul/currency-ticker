
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EMPTY, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CurrencyService } from "../currency.service";

@Component({
    templateUrl: './date-selector.component.html',
    selector:'date-selector',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class DateSelectorComponent   {

        dateSelectionMessage = "- Please select a date -";
        private errorMessageSubject = new Subject<string>();
        errorMessage$ = this.errorMessageSubject.asObservable();



        currencyList$ = this.currencyService.currenyList$
        .pipe
        (map(data => 
            data.sort((a,b) => a.date.getTime() - b.date.getTime())
        ),
        catchError(err => {
            this.errorMessageSubject.next(err);
            return EMPTY;
        })
        );

        constructor(private currencyService: CurrencyService) { }
        
        onSelected(selectedDate: Date): void {
            
            if( selectedDate.toString() != "0")
            this.currencyService.selectedDateChanged(new Date(selectedDate));
        }
   
  }
