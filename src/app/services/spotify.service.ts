import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { Playlist } from '../models/playlist';
import { UserProfile } from '../models/userProfile';

export interface TokenResponse {
    access_token: string,
    token_type: string,
    scope: string,
    expires_in: number,
    refresh_token: string
}

@Injectable({
    providedIn: 'root',
})
export class SpotifyService {

    constructor(private httpClient: HttpClient) { }

    authorize(): Observable<any> {
        const requestParams = new HttpParams()
            .set('scope', 'user-read-private user-read-email playlist-read-private')
            .set('client_id', environment.client_id);

        return this.httpClient.get(
            'http://localhost:3000/login',
            { params: requestParams },
        ).pipe(tap((link) => console.log(link)));
    }

    getPlaylists(userId: string): Observable<Playlist[]> {
        return this.httpClient.get<{ items: Playlist[] }>(`https://api.spotify.com/v1/users/${ userId }/playlists`)
            .pipe(
                map(({ items }: { items: Playlist[] }) => items),
            );
    }

    getMe(accessToken: string): Observable<UserProfile> {
        return this.httpClient.get<UserProfile>(`${ environment.baseURL }/me`);
    }
}
