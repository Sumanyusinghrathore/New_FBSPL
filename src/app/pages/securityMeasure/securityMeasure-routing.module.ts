import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { securityMeasureComponent } from './securityMeasure.component';

const routes: Routes = [{ path: '', component: securityMeasureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class securityMeasureRoutingModule {}
