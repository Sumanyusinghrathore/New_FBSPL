import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaUploadService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('media', file);

    return this.http.post(`${this.apiUrl}/api/media/data`, formData);
  }
}
