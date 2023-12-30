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
    episodeImage:string;
}
export type User = {
    userId: number;
    userName: string;
    favoritedAnimes?: string;
    userToken: string;
    userPermission: string;
    userEmail:string;
    isLoggedIn:boolean;
}