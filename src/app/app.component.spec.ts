import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAutoSpy } from 'jest-auto-spies';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { SpotifyService } from './services/spotify.service';

describe('AppComponent', () => {
    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            declarations: [
                AppComponent,
            ],
            providers: [
                provideAutoSpy(SpotifyService),
                provideAutoSpy(AuthService),
            ],
        }).compileComponents();

        console.error = jest.fn();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
