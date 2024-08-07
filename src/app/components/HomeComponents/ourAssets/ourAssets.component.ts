import { Component } from '@angular/core';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';

@Component({
  selector: 'app-ourAssets',
  standalone:true,
  imports:[CdnUrlDirective],
  templateUrl: './ourAssets.component.html',
  styleUrls: ['./ourAssets.component.css']
})
export class ourAssetsComponent {
}
