import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable()
export class TransformUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { baseURL } = environments;
    const newRequest = request.clone(
      { url : baseURL + request.url }
    )
    return next.handle(newRequest);
  }
}
