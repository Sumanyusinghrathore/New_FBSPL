import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurLeaderComponent } from './our-leader.component';

const routes: Routes = [
  { path: '', component: OurLeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurLeaderRoutingModule { }