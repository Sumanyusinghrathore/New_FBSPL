import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsSectionRoutingModule } from './ToolsSection-routing.module';
import { ToolsSectionComponent } from './ToolsSection.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';

@NgModule({
  declarations: [ToolsSectionComponent],
  imports: [CommonModule, ToolsSectionRoutingModule, CdnUrlDirective],
  exports: [ToolsSectionComponent],
})
export class ToolsSectionModule {}
