import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  submitCareerForm(formData: any): Observable<any> {
    const FormApiUrl = `${this.apiUrl}/api/career/data`;
    return this.http.post(FormApiUrl, formData);
  }

  submitAlliancesPartnershipsForm(formData: any): Observable<any> {
    const FormApiUrl = `${this.apiUrl}/api/alliances/partnerships`;
    return this.http.post(FormApiUrl, formData);
  }

  submitMediaGeneralQueryForm(formData: any): Observable<any> {
    const FormApiUrl = `${this.apiUrl}/api/media/general/query`;
    return this.http.post(FormApiUrl, formData);
  }

  submitWebsiteFeedbackForm(formData: any): Observable<any> {
    const FormApiUrl = `${this.apiUrl}/api/website/feedback`;
    return this.http.post(FormApiUrl, formData);
  }

  submitBlogComment(formData: any): Observable<any> {
    const FormApiUrl = `${this.apiUrl}/api/comment/post`;
    return this.http.post(FormApiUrl, formData);
  }
}
