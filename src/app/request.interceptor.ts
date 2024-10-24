import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{
  
  constructor() {  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request Interceptor triggered for URL:', req);

    if(req.method === 'POST'){
      const newRequest = req.clone({ 
        headers: new HttpHeaders({ token : 'abc122333'})
      });
      return next.handle(newRequest);  
    }
    return next.handle(req);  

  }
}