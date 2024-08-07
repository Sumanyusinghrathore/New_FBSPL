import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNewsData(
    category: string,
    searchTerm: string = '',
    perPage: number = 6,
    page: number = 1
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/news/data`
    );
  }
}
