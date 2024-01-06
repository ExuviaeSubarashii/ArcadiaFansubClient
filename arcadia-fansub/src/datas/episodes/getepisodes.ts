import { writable } from "svelte/store";
import type { Episodes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetAllEpisodes() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const getAllEpisodesResponse = await fetch(`${baseUrl}/Episode/GetAllEpisodes`, requestOptions);
        if(!getAllEpisodesResponse.ok){
            throw new Error(getAllEpisodesResponse.statusText);
        }
        const episodeData: Episodes[] = await getAllEpisodesResponse.json();
        console.log(episodeData);
        ExportedEpisodeLists.set(episodeData);
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function GetEpisodesByPageQuery(offSet:any){
    const body={
        offSet:parseInt(offSet)
    }
    const requestOptions = {
        method: 'POST',
        body:JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    };
    
    try {
        const getAllEpisodesResponse = await fetch(`${baseUrl}/Episode/GetEpisodesByPageNumber`, requestOptions);
        if(!getAllEpisodesResponse.ok){
            throw new Error(getAllEpisodesResponse.statusText);
        }
        const episodeData: Episodes[] = await getAllEpisodesResponse.json();
        console.log(episodeData);
        ExportedEpisodeLists.set(episodeData);
        // return episodeData;
    } catch (error) {
        return [];
    }
}
export const ExportedEpisodeLists = writable<Episodes[]>([]);