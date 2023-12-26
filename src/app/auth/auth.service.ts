import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {AuthComponent} from "./auth.component";
import {Board} from "../board/board.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject(null);
  error: Subject<any> = new Subject<any>();
  registerUrl = "http://localhost:8000/api/register/";
  loginUrl = "http://localhost:8000/api/token/";


  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  login(user: User) {
    this.httpClient.post<User>(this.loginUrl, user)
      .pipe(catchError((errorRes: HttpErrorResponse) => {
        let errorMessage = errorRes.error;
        // this.onChangeErrorMessage(errorMessage.detail);
        this.error.next(errorMessage.detail);

        if (!errorRes.error) {
          return throwError(errorMessage.error);
        }
        return throwError(errorMessage);
      })).subscribe(res => {
          this.handleAuthentication(
            res.email,
            res.id,
            res.access,
            res.refresh);
          this.router.navigate(['/']);
        });
  }

  join(user: User) {

    this.httpClient.post<User>(this.registerUrl, user).subscribe(res => {
      this.user.next(res);
      this.router.navigate(['/']);
    })
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
  }

  private handlerError(errorRes: HttpErrorResponse) {
    let errorMessage = errorRes.error;
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }

  onChangeErrorMessage(errorMessage: string) {
    console.log(errorMessage);
  }

  private handleAuthentication(email: string, id: string, access: string, refresh: string) {
    const user = {
      id: id,
      email: email,
      access: access,
      refresh: refresh,
    }
    this.user.next(user);
  }
}
