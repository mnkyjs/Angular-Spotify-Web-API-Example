import { fakeAsync, tick } from '@angular/core/testing';
import { createSpyFromClass } from 'jest-auto-spies';
import { USER_PROFILE_EXAMPLE, UserProfile } from '../models/userProfile';
import { SpotifyService } from '../services/spotify.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let spotifyService = createSpyFromClass(SpotifyService);

    beforeEach(() => {
        service = new AuthService(spotifyService);
    });

    it('should get current user', fakeAsync(() => {
        spotifyService.getMe.nextWith(USER_PROFILE_EXAMPLE);
        service.getUser();
        service.currentUser$.subscribe({
            next: (user: UserProfile | null) => expect(user).toEqual(USER_PROFILE_EXAMPLE),
        });
        tick();
    }));

    it('should set and return access token', () => {
        const accessToken = '917b3de8-77fb-4499-8b22-b50db8d2600a';
        service.setAccessToken(accessToken);
        expect(service.getAccessToken()).toEqual(accessToken);
    });
});
