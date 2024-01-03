import { Injectable } from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {User} from "../../auth/user.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataStorageService<User> {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    super(httpClient, 'http://ec2-54-180-86-155.ap-northeast-2.compute.amazonaws.com:8000/api/users');
  }

  create(item: User): Observable<User> {
    return undefined;
  }

  delete(id: number): Observable<void> {
    return undefined;
  }

  getAll(): Observable<User[]> {
    return undefined;
  }

  getById(id: number): Observable<User> {
    return undefined;
  }

  update(id: number, item: User): Observable<User> {
    return undefined;
  }
}
