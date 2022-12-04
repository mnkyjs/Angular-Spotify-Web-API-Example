import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { SpotifyAuthorize } from './auth/spotify-authorize';
import { Playlist } from './models/playlist';
import { UserProfile } from './models/userProfile';
import { SpotifyService } from './services/spotify.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    user$: Observable<UserProfile | null> = this.authService.currentUser$;

    playlists$?: Observable<Playlist[]>;

    private _destroy$ = new Subject();

    constructor(
        private spotifyService: SpotifyService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
    ) {
        this.initAuth();
    }

    ngOnDestroy(): void {
        this._destroy$.next(true);
    }

    redirectToAuthorize() {
        const spotifyAuthorize = new SpotifyAuthorize();
        window.location.href = spotifyAuthorize.createAuthorizeURL();
    }

    onGetPlaylist(id: string) {
        this.playlists$ = this.spotifyService.getPlaylists(id);
    }

    private initAuth() {
        if (!window.location.hash) {
            this.redirectToAuthorize();
        }

        return this.route.fragment.pipe(
            filter((fragment) => !!fragment),
            map((fragment) => new URLSearchParams(fragment as string)),
            map((params) => (
                {
                    accessToken: params.get('access_token'),
                    tokenType: params.get('token_type'),
                    expiresIn: Number(params.get('expires_in')),
                    state: params.get('state'),
                }
            )),
            tap((params) => {
                if (params.accessToken) {
                    this.authService.setAccessToken(params.accessToken);
                    console.info('[Angular Spotify] Authenticated!');
                }
            }),
            tap(() => {
                this.authService.getUser();
                this.router.navigate([]);
            }),
        ).pipe(takeUntil(this._destroy$)).subscribe();
    }
}
