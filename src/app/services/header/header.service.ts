import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private apiUrl = environment.apiUrl;
  private menuData: any = null;

  constructor(private http: HttpClient) {}

  getMenuData(): Observable<any> {
    if (this.menuData) {
      return of(this.menuData);
    } else {
      return this.http.get<any>(`${this.apiUrl}api/menu/data`).pipe(
        tap(data => this.menuData = data)
      );
    }
  }
}
