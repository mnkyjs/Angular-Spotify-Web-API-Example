import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Playlist, PLAYLIST_EXAMPLE } from '../models/playlist';
import { USER_PROFILE_EXAMPLE, UserProfile } from '../models/userProfile';

import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
    let service: SpotifyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(SpotifyService);
    });

    it('should return playlists', fakeAsync(() => {
        const response = { items: [PLAYLIST_EXAMPLE] };

        service.getPlaylists('0a3d8a4a-f229-4b95-a694-55096b7d0215').subscribe({
            next: (plalists: Playlist[]) => expect(plalists).toEqual([PLAYLIST_EXAMPLE]),
        });

        TestBed.inject(HttpTestingController)
            .expectOne((req) => !!req.url.match(/users/))
            .flush(response);

        tick();
    }));

    it('should return user profile', fakeAsync(() => {
        const response = USER_PROFILE_EXAMPLE;

        service.getMe().subscribe({
            next: (userProfile: UserProfile) => expect(userProfile).toEqual(response),
        });

        TestBed.inject(HttpTestingController)
            .expectOne((req) => !!req.url.match(/me/))
            .flush(response);

        tick();
    }));
});
