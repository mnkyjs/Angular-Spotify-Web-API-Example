import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { Playlist } from '../models/playlist';
import { UserProfile } from '../models/userProfile';

@Injectable({
    providedIn: 'root',
})
export class SpotifyService {

    constructor(private httpClient: HttpClient) { }

    getPlaylists(userId: string): Observable<Playlist[]> {
        return this.httpClient.get<{ items: Playlist[] }>(
            `https://api.spotify.com/v1/users/${ userId }/playlists`,
            { params: new HttpParams({ fromObject: { limit: 50 } }) },
        )
            .pipe(
                map(({ items }: { items: Playlist[] }) => items),
            );
    }

    getMe(): Observable<UserProfile> {
        return this.httpClient.get<UserProfile>(`${ environment.baseURL }/me`);
    }
}
