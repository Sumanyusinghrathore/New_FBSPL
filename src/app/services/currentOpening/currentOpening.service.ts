import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class currentOpeningService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getcurrentOpeningData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/currunt/opening`);
  }
}
