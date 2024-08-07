import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrustedRoutingModule } from './trusted-routing.module';
import { TrustedComponent } from './trusted.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';


@NgModule({
  declarations: [
    TrustedComponent
  ],
  imports: [
    CommonModule,
    TrustedRoutingModule,
    CdnUrlDirective
  ],
  exports: [
    TrustedComponent
  ],
})
export class TrustedModule { }
