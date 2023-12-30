import { writable } from "svelte/store";
import type { Animes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetAllAnimes():Promise<Animes[]> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const getAllAnimesResponse = await fetch(`${baseUrl}/Anime/GetAllAnimes`, requestOptions);
        if(!getAllAnimesResponse.ok){
            throw new Error(getAllAnimesResponse.statusText);
        }
        const animeData: Animes[] = await getAllAnimesResponse.json();
        console.log(animeData);
        ExportedAnimeLists.set(animeData);
        return animeData;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export async function GetAnimeByAlphabet(AlphabetValue:string|null) {
    const body={
        alphabetValue:AlphabetValue
    }
    const requestOptions = {
        method: 'POST',
        body:JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const getAllAnimesResponse = await fetch(`${baseUrl}/Anime/GetAnimeByAlphabet`, requestOptions);
    
        if (!getAllAnimesResponse.ok) {
          throw new Error(getAllAnimesResponse.statusText);
        }
    
        const animeData: Animes[] = await getAllAnimesResponse.json();
        console.log(animeData);
        ExportedAnimeLists.set(animeData);
        return animeData;
      } catch (error) {
        console.error('Error:', error);
        // Handle error or return a default value as needed
        return [];
      }
}
export const ExportedAnimeLists = writable<Animes[]>([]);