import { writable } from "svelte/store";
import type { Animes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetAllAnimes() {
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
    } catch (error) {
        console.error('Error:', error);
    }
}
export const ExportedAnimeLists = writable<Animes[]>([]);