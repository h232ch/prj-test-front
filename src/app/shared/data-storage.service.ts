import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class DataStorageService<T> {
  protected constructor(
    httpClient: HttpClient,
    protected apiUrl: string) {}

  abstract getAll(): Observable<T[]>;
  abstract getById(id: number): Observable<T>;
  abstract create(item: T): Observable<T>;
  abstract update(id: number, item: T): Observable<T>;
  abstract delete(id: number): Observable<void>;
}
