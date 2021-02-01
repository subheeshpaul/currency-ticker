import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CurrencyListComponent } from './currency-list/currency-list.compoment';
import { CurrencyRoutingModule } from './currency.routing.module';
import { CurrencyComponent } from './currency/currency.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';



@NgModule({
  declarations: [
    CurrencyListComponent,
    CurrencyComponent,
    DateSelectorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CurrencyRoutingModule
  ],
  exports:[
    CommonModule
  ]
  
})
export class CurrencyModule { }
