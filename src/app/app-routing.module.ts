import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { currencyRoutes } from './currencies/currency.routing.module';
import { LandingComponent } from './landing.component';

const routes: Routes = [
   
    { path: 'home', component: LandingComponent, children: currencyRoutes},
    {path: '', redirectTo: '/home', pathMatch: "full" }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
