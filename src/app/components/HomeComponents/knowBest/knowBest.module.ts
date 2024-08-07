import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowBestRoutingModule } from './knowBest-routing.module';
import { KnowBestComponent } from './knowBest.component';


@NgModule({
  declarations: [
    KnowBestComponent
  ],
  imports: [
    CommonModule,
    KnowBestRoutingModule
  ],
  exports: [
    KnowBestComponent
  ],
})
export class KnowBestModule { }
