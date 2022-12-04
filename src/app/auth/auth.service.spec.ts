import { createSpyFromClass } from 'jest-auto-spies';
import { SpotifyService } from '../services/spotify.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let spotifyService = createSpyFromClass(SpotifyService);

    beforeEach(() => {
        service = new AuthService(spotifyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
