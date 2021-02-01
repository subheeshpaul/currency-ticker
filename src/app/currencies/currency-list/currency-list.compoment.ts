import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyListComponent   {
  pageTitle = 'Historical Currency Rates';
  
 
}
