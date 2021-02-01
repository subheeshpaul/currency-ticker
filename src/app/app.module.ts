import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyModule } from './currencies/currency.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
