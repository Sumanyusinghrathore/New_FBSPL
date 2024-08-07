import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerFormComponent } from './career-form.component';

const routes: Routes = [{ path: '', component: CareerFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerFormRoutingModule {}
