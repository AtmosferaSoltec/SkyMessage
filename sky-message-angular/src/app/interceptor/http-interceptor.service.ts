import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export function httpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const headers = new HttpHeaders({
    token: '123456',
  });

  const reqClon = req.clone({
    headers,
  });

  return next(reqClon).pipe(
    catchError((err) => {
      const data = err?.error;

      return throwError(data?.message || 'Error desconocido');
    })
  );
}
