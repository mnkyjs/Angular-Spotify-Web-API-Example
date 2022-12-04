import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authService.accessToken$.pipe(
            take(1),
            switchMap((token) => {
                if (!token) {
                    return next.handle(req);
                }
                const headers = req.headers.set('Authorization', `Bearer ${ token }`);
                const authReq = req.clone({
                    headers,
                });
                return next.handle(authReq);
            }),
        );
    }
}

export const authInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
