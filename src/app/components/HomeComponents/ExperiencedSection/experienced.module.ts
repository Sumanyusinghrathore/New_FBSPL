import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperiencedRoutingModule } from './experienced-routing.module';
import { ExperiencedComponent } from './experienced.component';


@NgModule({
  declarations: [
    ExperiencedComponent
  ],
  imports: [
    CommonModule,
    ExperiencedRoutingModule
  ],
  exports: [
    ExperiencedComponent
  ],
})
export class ExperiencedModule { }
