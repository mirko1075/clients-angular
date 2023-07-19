import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json',
  });

  getAll(): Observable<Client[]> {
    return this.http
      .get('http://localhost:8080/api/clients')
      .pipe(map((response) => response as Client[]));
  }

  getOne(id: number): Observable<Client> {
    return this.http
      .get('http://localhost:8080/api/clients/' + id)
      .pipe(map((response) => response as Client));
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/clients/' + id);
  }

  createOne(client: Client): Observable<Client> {
    return this.http.post<Client>('http://localhost:8080/api/clients', client, {
      headers: this.httpHeaders,
    });
  }

  putOne(client: Client, id: number): Observable<Client> {
    return this.http.put<Client>(
      'http://localhost:8080/api/clients/' + id,
      client,
      {
        headers: this.httpHeaders,
      }
    );
  }
}
