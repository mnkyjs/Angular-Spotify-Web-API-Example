import { HTTP_INTERCEPTORS, HttpClient, HttpInterceptor } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { AuthService } from '../auth/auth.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor;
    let authService: Spy<AuthService>;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                provideAutoSpy(AuthService, {
                    observablePropsToSpyOn: ['accessToken$'],
                }),
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
            ],
        });
        authService = TestBed.inject<any>(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        interceptor = (
            <HttpInterceptor[]>TestBed.inject(HTTP_INTERCEPTORS)
        )
            .find((service) => service instanceof AuthInterceptor) as AuthInterceptor;
    });

    it('should add token to header', fakeAsync(() => {
        const accessToken = '7fea3d1f-7afa-4aac-9003-e33b9b58fbd2';
        authService.accessToken$.nextWith(accessToken);

        httpClient.get<any>('/api/is/this/a/test123')
            .subscribe((res: string) => {
                expect(res).toBe('all good');
            });

        const request = httpMock.expectOne('/api/is/this/a/test123');
        request.flush('all good');

        httpMock.verify();
        tick();
        expect(request.request.headers.get('Authorization')).toEqual(`Bearer ${ accessToken }`);
    }));

    it('should send request without token', fakeAsync(() => {
        authService.accessToken$.nextWith('');

        httpClient.get<any>('/api/is/this/a/test123')
            .subscribe((res: string) => {
                expect(res).toBe('all good');
            });

        const request = httpMock.expectOne('/api/is/this/a/test123');
        request.flush('all good');

        httpMock.verify();
        tick();
        expect(request.request.headers.get('Authorization')).toEqual(null);
    }));
});
