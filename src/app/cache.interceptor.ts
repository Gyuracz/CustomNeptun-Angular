import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.method !== 'GET'){
      this.cacheService.invalidateCache();
      return next.handle(request);
    }

    const cachedResponse = this.cacheService.get(request.url);

    if (cachedResponse){
      return of(cachedResponse);
    }

    return next.handle(request)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(request.url, event);
        }
      })
    );
  }

}
