import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class caseStudyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getcaseStudyData(
    category: string,
    page: number = 1,
    perPage: number = 6
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/case/study/page/data?per_page=${perPage}&category=${category}&page=${page}`
    );
  }
}
