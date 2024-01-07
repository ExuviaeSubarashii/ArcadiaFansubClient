import { baseUrl, responseMessageStore } from "../variables";

export async function UpdateEpisode(episodeId:string,episodeLinks:string) {
    console.log(episodeLinks);
    console.log(episodeId);

    // try {
    //     const body={
    //         episodeId:episodeId,
    //         episodeLinks:episodeLinks
    //     }
    //     const requestOptins={
    //         method:"POST",
    //         body:JSON.stringify(episodeLinks),
    //         headers: { 'Content-Type': 'application/json' }
    //     }
    //     const updateEpisodeResponse=await fetch(`${baseUrl}/Episode/UpdatEpisode`,requestOptins);
    //     if(!updateEpisodeResponse.ok){
    //         responseMessageStore.set(updateEpisodeResponse.statusText);
    //     }
    //     responseMessageStore.set(updateEpisodeResponse.statusText);
    // } catch (error) {
    //     throw new Error("Couldn't Update");
    // }
}
