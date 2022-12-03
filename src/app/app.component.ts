import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService, TokenResponse } from './services/spotify.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    user$?: Observable<TokenResponse>;

    playlists$?: Observable<any>;

    constructor(private spotifyService: SpotifyService) {}

    onLoginIn() {
        this.user$ = this.spotifyService.authorize();
    }

    onGetPlaylists() {
        this.playlists$ = this.spotifyService.getPlaylists();
    }
}
