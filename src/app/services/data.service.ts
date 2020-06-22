import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export abstract class DataService<T> {

  constructor(private http: HttpClient, private path: string) { }

  save(data): Observable<T> {
    return this.http.post<T>(environment.apiHost + this.path, data);
  }

  update(id, data): Observable<T> {
    return this.http.put<T>(environment.apiHost + this.path + id, data);
  }

  findById(id): Observable<T> {
    return this.http.get<T>(environment.apiHost + this.path + id);
  }

  delete(id): Observable<T> {
    return this.http.delete<T>(environment.apiHost + this.path + id);
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(environment.apiHost + this.path);
  }

}
