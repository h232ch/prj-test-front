// auth.interceptor.ts

import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";

@Injectable()
export class AuthTokenValidationInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add authorization header with JWT token if available
    const token = localStorage.getItem('userData');

    if (token) {
      // Check token expiration
      if (this.isTokenExpired(token)) {
        // Log out the user or perform any other action
        console.log('Token expired. Logging out...');
        // Perform logout action, for example, navigate to the login page
        // this.authService.logout();
      }

      // Add the token to the request headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Token expired or unauthorized, handle it here
          console.log('Unauthorized. Logging out...');
          // Perform logout action, for example, navigate to the login page
          // this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    // Implement token expiration check logic here
    // You may use a library like jwt-decode or implement your own logic
    // Example using jwt-decode:
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
    // return false; // Placeholder, implement your own logic
  }
}
