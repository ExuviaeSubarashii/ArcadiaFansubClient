import { writable } from "svelte/store";
import type { Episodes } from "../../types/types";
import { baseUrl } from "../variables";
import { onMount } from "svelte";

export async function GetAllEpisodes(): Promise<Episodes[]> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const getAllEpisodesResponse = await fetch(`${baseUrl}/Episode/GetAllEpisodes`, requestOptions);
        if (!getAllEpisodesResponse.ok) {
            return [];
            throw new Error(getAllEpisodesResponse.statusText);
        }
        const episodeData: Episodes[] = await getAllEpisodesResponse.json();
        return episodeData;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export async function GetEpisodesByPageQuery(offSet?: any): Promise<Episodes[]> {

    try {
        const body = {
            offSet: offSet??0
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getAllEpisodesResponse = await fetch(`${baseUrl}/Episode/GetEpisodesByPageNumber`, requestOptions);
        if (!getAllEpisodesResponse.ok) {
            return [];
            throw new Error(getAllEpisodesResponse.statusText);
        }
        const episodeData: Episodes[] = await getAllEpisodesResponse.json();

        // ExportedEpisodeLists.set(episodeData);
        return episodeData;
    } catch (error) {
        return [];
    }
}
export async function GetPageAmount(): Promise<number> {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const getPageAmount = await fetch(`${baseUrl}/Episode/GetPageAmount`, requestOptions);
        if (!getPageAmount.ok) {
            return 0;
            throw new Error(getPageAmount.statusText);
        }
        const episodeData: number = await getPageAmount.json();

        // ExportedEpisodeLists.set(episodeData);
        return episodeData;
    } catch (error) {
        return 0;
    }
}
// export const ExportedEpisodeLists = writable<Episodes[]>([]);