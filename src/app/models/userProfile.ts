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
