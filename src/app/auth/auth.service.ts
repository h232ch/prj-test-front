import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {Subject} from "rxjs/Subject";
import {User} from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',

})
export class AuthService {

  // user = new Subject<User>();
  // Behavior subject has initial data and if it is changed, the value would emit
  // even if we don't subscribe that, it emits initial value.
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    // expect the response data model with AuthResponseData
    // Document: https://firebase.google.com/docs/reference/rest/auth?hl=ko#section-create-email-password
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCf8fWTyQcMO3p9dkuWXrCc1gv8EYi0v1U',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(this.handleError), tap(
      resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn)
        // const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        // const user = new User(
        //   resData.email,
        //   resData.localId,
        //   resData.idToken,
        //   expirationDate,
        // )
        // this.user.next(user);
      }))
  }

  //   catchError(errorRes => {
  //   let errorMessage = 'An unknown error occurred!'
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This email exists already';
  //   }
  //   return throwError(errorMessage);
  // })
  // );
  // }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCf8fWTyQcMO3p9dkuWXrCc1gv8EYi0v1U',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(this.handleError), tap(
      resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn)
      }))
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate,
    )
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    console.log(errorRes);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This credential is invalid.'
        break;
    }
    return throwError(errorMessage);
  }
}
