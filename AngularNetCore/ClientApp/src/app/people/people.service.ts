import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPerson } from './person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) { }

  getPeople(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${this.baseUrl}api/people`);
  }

  createPerson(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.baseUrl}api/people`, person);
  }
}
