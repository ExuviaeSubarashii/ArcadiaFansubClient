export type Animes = {
    animeId: number;
    animeName: string | null;
    animeEpisodeAmount: number;
    links: string | null;
    releaseDate: Date;
    translator: string | null;
    editor: string | null;
}
export type Episodes = {
    episodeId: number;
    animeName: string | null;
    episodeNumber: number;
    episodeLinks: string | null;
    episodeLikes: number;
    episodeUploadDate: Date;
}
export type User = {
    userId: number;
    userName: string | null;
    favoritedAnimes?: string | null;
    userToken: string;
    userPermission: string | null;
}