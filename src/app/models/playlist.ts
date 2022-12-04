import { Image, USER_PROFILE_EXAMPLE } from './userProfile';

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: string;
    total: number;
}

export interface Owner {
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}

export interface Item {
}

export interface Tracks {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

export const PLAYLIST_EXAMPLE: Playlist = {
    collaborative: false,
    description: '',
    external_urls: {
        spotify: '',
    },
    followers: {
        total: 1,
        href: '',
    },
    href: '',
    id: '',
    images: [],
    name: '',
    owner: USER_PROFILE_EXAMPLE,
    public: false,
    snapshot_id: '',
    tracks: {
        href: '',
        items: [],
        limit: 20,
        next: '',
        offset: 10,
        previous: '',
        total: 20,
    },
    type: '',
    uri: '',

};
