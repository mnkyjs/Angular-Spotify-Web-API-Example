import { ExternalUrls, Followers } from './playlist';

export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

export const USER_PROFILE_EXAMPLE: UserProfile = {
    country: '',
    display_name: '',
    email: '',
    explicit_content: {
        filter_enabled: false,
        filter_locked: false,
    },
    external_urls: {
        spotify: '',
    },
    followers: {
        href: '',
        total: 1,
    },
    href: '',
    id: '',
    images: [],
    product: '',
    type: '',
    uri: '',
};
