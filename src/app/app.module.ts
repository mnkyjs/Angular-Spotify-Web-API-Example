import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { authInterceptorProvider } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([]),
    ],
    providers: [
        authInterceptorProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
