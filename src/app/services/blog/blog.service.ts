import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBlogData(
    category: string,
    searchTerm: string = '',
    perPage: number = 6,
    page: number = 1
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/blog/page/data?per_page=${perPage}&category=${category}&page=${page}&title=${searchTerm}`
    );
  }
}
