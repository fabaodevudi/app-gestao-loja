import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
    if (token != null) {
      
      request = request.clone({
        setHeaders: {
          'Authorization': token
        }
      } );
    }

    return next.handle(request);
  }
}
