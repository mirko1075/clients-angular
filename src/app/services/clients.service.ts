import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { Client } from '../models/client';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  getAll(page: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/clients/page/' + page).pipe(
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/clients/' + id).pipe(
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  deleteOne(id: number): Observable<void> {
    return this.http
      .delete<void>('http://localhost:8080/api/clients/' + id)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  createOne(client: Client): Observable<Client> {
    return this.http
      .post<Client>('http://localhost:8080/api/clients', client, {
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
      'http://localhost:8080/api/clients/' + id,
      client,
      {
        headers: this.httpHeaders,
      }
    );
  }
}
