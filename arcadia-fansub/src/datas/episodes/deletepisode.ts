import { baseUrl, responseMessageStore } from "../variables";
import { GetEpisodePanelData } from "./episodespanel";

export async function DeleteEpisode(episodeId:string,currentAnime:string) {
    try {
        const body={
            episodeId:episodeId
        }
        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const deleteEpisodeResponse=await fetch(`${baseUrl}/Episode/DeleteEpisode`,requestOptions);
        if(!deleteEpisodeResponse.ok){
            throw new Error(deleteEpisodeResponse.statusText);
        }
        const responseMessage=await deleteEpisodeResponse.text();

        responseMessageStore.set(responseMessage);
        GetEpisodePanelData(currentAnime);
    } catch (error) {
        
    }
}