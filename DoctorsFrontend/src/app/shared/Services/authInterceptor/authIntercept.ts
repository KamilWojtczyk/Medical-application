import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let idToken: any = localStorage.getItem('userToken');
    idToken = `Bearer ${idToken}`;
    if (idToken) {
      const cloned: any = req.clone({
        headers: req.headers.set('Authorization', idToken),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
