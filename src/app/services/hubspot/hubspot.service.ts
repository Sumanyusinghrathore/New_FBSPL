import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HubspotService {
  private apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/23620181/`;

  constructor(private http: HttpClient) {}

  submitForm(formId: string, formData: any): Observable<any> {
    const formBody = this.prepareFields(formData);
    const url = `${this.apiUrl}${formId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, { fields: formBody }, { headers });
  }

  private prepareFields(formData: any): { name: string; value: any }[] {
    return Object.keys(formData).map((key) => ({
      name: key,
      value: formData[key],
    }));
  }
}
