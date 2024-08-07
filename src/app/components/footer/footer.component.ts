import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  cdnUrl = environment.cdnUrl;
  ISO2700 = `${this.cdnUrl}assets/home/FBSPL-ISO 27001.pdf`;
  ISO9001 = `${this.cdnUrl}assets/home/FBSPL-QMS.pdf`;

  getcdnUrl(url: String) {
    const CDNurl = `${this.cdnUrl}${url}`;
    return CDNurl;
  }
}
