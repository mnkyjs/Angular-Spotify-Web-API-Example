import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { concatMap, EMPTY, Observable, tap } from 'rxjs';
import { environment } from '../../enviroments/environment';

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

    jwtHelper = new JwtHelperService();

    authenticationObject?: TokenResponse;

    private readonly redirectUrl = window.location.origin + '/index.html';

    constructor(private httpClient: HttpClient) { }

    authorize(): Observable<TokenResponse> {
        const requestParams = new HttpParams()
            .set('response_type', 'code')
            .set('scope', 'user-read-private user-read-email playlist-read-private')
            .set('client_id', environment.client_id)
            .set('redirect_uri', this.redirectUrl);

        return this.httpClient.get<{ code: string, state: any }>('https://accounts.spotify.com/authorize', { params: requestParams }).pipe(
            concatMap(({ code }: { code: string, state: any }) => this.login(code)),
            tap((authenticationObject: TokenResponse) => this.authenticationObject = authenticationObject),
        );
    }

    login(code: string): Observable<TokenResponse> {
        const form = new FormData();
        form.append('code', code);
        form.append('redirect_uri', this.redirectUrl);
        form.append('grant_type', 'authorization_code');
        return this.httpClient.post<TokenResponse>('https://accounts.spotify.com/api/token', form, {
            headers: {
                'Authorization': 'Basic ' + (
                    new Buffer(environment.client_id + ':' + environment.client_secret).toString('base64')
                ),
            }, responseType: 'json',
        });
    }

    getPlaylists() {
        const user_profile = this.jwtHelper.decodeToken(this.authenticationObject?.access_token);
        console.log(user_profile);
        if (this.authenticationObject) {
            return this.httpClient.get(`https://api.spotify.com/v1/users/XXXXX/playlists`);
        }
        return EMPTY;
    }
}
