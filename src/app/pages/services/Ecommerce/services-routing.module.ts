import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services.component';

import { PreSalesSupport } from './Sub-service/pre-sales-support/pre-sales-support.component';
import { OrderManagement } from './Sub-service/Order Management/order-management.component';


const routes: Routes = [
  { path: '', component: ServicesComponent },
  { path: 'Ecommerce-pre-sales-support', component: PreSalesSupport },
  { path: 'Ecommerce-order-management', component: OrderManagement },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }