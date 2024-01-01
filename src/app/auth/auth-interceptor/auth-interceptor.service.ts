import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../auth.service";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
import {jwtDecode} from "jwt-decode";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService,
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      // take one value which respond from observer and quit the subscription
      take(1),
      exhaustMap(user => {
        if (!user) {
          // if there is no user, pass the request
          return next.handle(req);
        }

        const token = user.access;
        if (this.isTokenExpired(token)) {
          console.log('Token expired. Logging out...');
          this.authService.logout();
          return throwError('Token expired');
        }

        const modifiedReq: HttpRequest<any> = req.clone({
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.access),
        })

        return next.handle(modifiedReq)
        //   .pipe(
        //   catchError(error => {
        //     if (error.status === 401) {
        //       console.log('Unauthorized. Logging out...');
        //       this.authService.logout();
        //     }
        //     return throwError('Token expired');
        //   })
        // );
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.exp) {
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    }

    // Unable to decode token or no expiration time found
    return false;
  }

}
