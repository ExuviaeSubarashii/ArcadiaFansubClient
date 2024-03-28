import currentUser from "../users/user";
import { baseUrl, responseMessageStore } from "../variables";
import { GetEpisodePanelData } from "./episodespanel";

export async function DeleteEpisode(episodeId: string, currentAnime: string) {
    try {
        const body = {
            episodeId: episodeId
        }
        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const deleteEpisodeResponse = await fetch(`${baseUrl}/Episode/DeleteEpisode`, requestOptions);
        if (!deleteEpisodeResponse.ok) {
            throw new Error(deleteEpisodeResponse.statusText);
        }
        const responseMessage = await deleteEpisodeResponse.text();

        responseMessageStore.set(responseMessage);
        GetEpisodePanelData(currentAnime);
    } catch (error) {
        throw error;
    }
}
export async function DeleteBulkEpisodeAsync(episodeIds:string[]) {
    try {
        const body = {
            episodeIds: episodeIds,
            userToken: currentUser.userToken
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const bulkDeleteEpisodeResponse = await fetch(`${baseUrl}/Episode/BulkDeleteEpisodes`, requestOptions);
        if (!bulkDeleteEpisodeResponse.ok) {
            throw new Error(bulkDeleteEpisodeResponse.statusText);
        }

        const responseMessage = await bulkDeleteEpisodeResponse.text();

        responseMessageStore.set(responseMessage);
    } catch (error) {
        throw error;
    }
}