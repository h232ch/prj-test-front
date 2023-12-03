import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.user.pipe(map(user => {
    //   // if user is valid return true, not valid return false.
    //   return !!user;
    // }), tap(isAuth => {
    //   if (!isAuth) {
    //     this.router.navigate(['/auth']);
    //   }
    // }))

    return this.authService.user.pipe(
      take(1),
      map(user => {
        // if user is valid return true, not valid return false.
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        // it's more advanced version than above code.
        return this.router.createUrlTree(['/auth']);
      })
    )
  }

}
