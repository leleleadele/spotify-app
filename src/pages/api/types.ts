export type ArtistObject = {
  external_urls: {
    spotify: string;
  };
  followers?: {
    href: string | null;
    total: number;
  };
  genres?: string[];
  href: string;
  id: string;
  images?: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  popularity?: number;
  type: string;
  uri: string;
};

export type AlbumObject = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: ArtistObject[];
};

export type TrackObject = {
  album: AlbumObject;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids?: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type SearchData<T> = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
};

export type SearchResponse = {
  tracks?: SearchData<TrackObject>;
  albums?: SearchData<AlbumObject>;
  artists?: SearchData<ArtistObject>;
};

export type TracksResponse = {
  tracks: (TrackObject | null)[];
};
