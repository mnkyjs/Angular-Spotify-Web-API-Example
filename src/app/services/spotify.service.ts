import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
    providedIn: 'root',
})
export class SpotifyService {

    constructor(private httpClient: HttpClient) { }

    authorize(): Observable<{ code: string, state: any }> {
        const params = new HttpParams();
        params.set('response_type', 'code');
        params.set('scope', 'user-read-private user-read-email');
        params.set('client_id', environment.client_id);
        params.set('redirect_uri', window.location.origin + 'index.html');

        return this.httpClient.get<{ code: string, state: any }>('https://accounts.spotify.com/authorize', { params: {} });
    }
}
