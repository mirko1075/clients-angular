import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
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
      .get('http://localhost:8080/api/clientes')
      .pipe(map((response) => response as Client[]))
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  getOne(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/clientes/' + id).pipe(
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  deleteOne(id: number): Observable<void> {
    return this.http
      .delete<void>('http://localhost:8080/api/clientes/' + id)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  createOne(client: Client): Observable<Client> {
    return this.http
      .post<Client>('http://localhost:8080/api/clientes', client, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  putOne(client: Client, id: number): Observable<Client> {
    return this.http.put<Client>(
      'http://localhost:8080/api/clientes/' + id,
      client,
      {
        headers: this.httpHeaders,
      }
    );
  }
}
