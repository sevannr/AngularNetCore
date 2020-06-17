import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPerson } from './person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) { }

  createPerson(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.baseUrl}api/people`, person);
  }

  deletePerson(personId: number): Observable<IPerson> {
    return this.http.delete<IPerson>(`${this.baseUrl}api/people/${personId}`);
  }

  getPeople(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${this.baseUrl}api/people`);
  }

  getPerson(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.baseUrl}api/people/${id}`);
  }

  updatePerson(person: IPerson): Observable<IPerson> {
    return this.http.put<IPerson>(`${this.baseUrl}api/people/${person.id}`, person);
  }
}
