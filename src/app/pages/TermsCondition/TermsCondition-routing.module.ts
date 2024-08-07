import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsConditionComponent } from './TermsCondition.component';

const routes: Routes = [{ path: '', component: TermsConditionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsConditionRoutingModule {}
