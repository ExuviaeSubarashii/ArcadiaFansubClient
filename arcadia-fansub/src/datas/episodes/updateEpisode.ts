import { baseUrl, responseMessageStore } from "../variables";

export async function UpdateEpisode(episodeId:any,episodeLinks:string) {
    console.log(episodeLinks);
    console.log(episodeId);

    try {
        const body={
            episodeId:episodeId,
            episodeLinks:episodeLinks
        }
        const requestOptins={
            method:"PUT",
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }
        const updateEpisodeResponse=await fetch(`${baseUrl}/Episode/UpdateEpisode`,requestOptins);
        if(!updateEpisodeResponse.ok){
            responseMessageStore.set(updateEpisodeResponse.statusText);
        }
        const responseMessage=await updateEpisodeResponse.text();

        responseMessageStore.set(responseMessage);
    } catch (error) {
        throw new Error("Couldn't Update");
    }
}
