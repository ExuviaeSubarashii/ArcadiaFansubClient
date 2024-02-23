import { baseUrl, responseMessageStore } from "../variables";

export async function DeleteAnime(animeIdValue:string){
    try {
        const body={
            animeId:animeIdValue
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const response=await fetch(`${baseUrl}/Anime/DeleteAnime`,requestOptions);
        if(!response.ok){
            throw new Error("Error"+response.status);
        }
        responseMessageStore.set(await response.text());
    } catch (error) {
        throw new Error("Error"+error);
    }
}