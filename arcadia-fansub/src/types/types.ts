export type Animes = {
    animeId: string;
    animeName: string | null;
    animeEpisodeAmount: number;
    links: string | null;
    releaseDate: Date;
    translator: string | null;
    editor: string | null;
    animeImage: string | null;
    isFavorited: boolean;
}
export type Episodes = {
    episodeId: string;
    animeName: string | null;
    episodeNumber: number;
    episodeLinks: string | null;
    episodeLikes: number;
    sortingDate: string;
    animeImage: string;
    animeId: string;
}
export type User = {
    userId: number;
    userName: string;
    favoritedAnimes?: string;
    userToken: string;
    // userPermission: string;
    userEmail: string;
    isLoggedIn: boolean;
}
export type UserProfile = {
    userId: number;
    userName: string;
    userEmail: string;
    userPermission: string;
    favoritedAnimes: string;
}
export type AddAnime = {
    animeName: string;
    animeEpisodeAmount: number;
    editor: string;
    translator: string;
    releaseDate: Date;
    imageLink: string | null;
}
export type AddEpisode = {
    animeName: string;
    episodeNumber: number;
    episodeLinks: string[] | null;
    episodeLikes: number;
}
export type TicketBody = {
    ticketTitle: string;
    ticketMessage: string;
    senderName: string;
    ticketReason: string;
    ticketStatus: string;
    senderToken: string;
}
export type TicketReply = {
    responseId: number;
    ticketId: string;
    ticketAdminName: string;
    ticketReply: string;
    ticketReplyDate: Date;
}
export type TicketDto = {
    ticketId: string;
    ticketTitle: string;
    ticketMessage: string;
    senderName: string;
    ticketDate: Date;
    ticketReason: string;
    ticketStatus: string;
}
export type AdminResponse = {
    ticketId: string;
    adminName: string;
    adminReply: string;
}
export type Notifications = {
    episodeLink: string;
    episodeNotificationMessage: string;
    isVisible: boolean;
}
export type CreateCommentBody = {
    episodeId: string;
    userId: number;
    userName: string;
    commentContent: string;
}
export type Comments = {
    commentId: number;
    episodeId: string;
    userId: number;
    userName: string;
    commentContent: string;
    commentDate: Date;
    commentTextDate: string;
    isCommentOwner: boolean;
}
export type UpdateCommentBody = {
    commentId: number;
    userId: number;
    newComment: string;
    userToken: string;
}
export type UpdateAnimeBody = {
    animeId: string;
    newAnimeName: string;
    newEpisodeAmount: number;
    newEditorName: string;
    newTranslatorName: string;
    newReleaseDate: Date;
}
export type Member = {
    memberId:number;
    memberName: string;
    memberRole: string;
}
export type AllMember = {
    translators: Member[];
    editors: Member[];
    coders: Member[];
    admins: Member[];
    uploaders: Member[];
}
export type Roles={
    RoleName:string;
}
export type CreateNewMemberBody={
    memberName:string;
    memberRoles:string[];
}