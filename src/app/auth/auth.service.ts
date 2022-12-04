import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from '../models/userProfile';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _accessToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

    accessToken$: Observable<string> = this._accessToken.asObservable();

    private _currentUser: BehaviorSubject<UserProfile | null> = new BehaviorSubject<UserProfile | null>(null);

    currentUser$: Observable<UserProfile | null> = this._currentUser.asObservable();

    constructor(private spotifyService: SpotifyService) { }

    getUser() {
        this.spotifyService.getMe(this._accessToken.getValue()).subscribe({
            next: (user: UserProfile) => this._currentUser.next(user),
        });
    }

    getAccessToken() {
        this._accessToken.getValue();
    }

    setAccessToken(token: string) {
        this._accessToken.next(token);
    }
}
