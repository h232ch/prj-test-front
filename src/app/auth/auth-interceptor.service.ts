import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

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

        const modifiedReq: HttpRequest<any> = req.clone({
          // temporary authentication token is user.phone
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.access),
        });
        return next.handle(modifiedReq);
      })
    )
  }

}
