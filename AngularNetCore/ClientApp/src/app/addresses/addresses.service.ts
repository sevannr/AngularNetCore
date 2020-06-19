import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) { }

  removeAddresses(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/addresses/delete/list`, ids);
  }
}
