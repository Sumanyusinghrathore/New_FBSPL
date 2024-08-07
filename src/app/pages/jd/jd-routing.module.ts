import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JdComponent } from './jd.component';

const routes: Routes = [{ path: '', component: JdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JdRoutingModule {}
