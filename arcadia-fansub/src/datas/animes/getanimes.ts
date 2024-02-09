import { writable } from "svelte/store";
import type { Animes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetAllAnimes(): Promise<Animes[]> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const getAllAnimesResponse = await fetch(`${baseUrl}/Anime/GetAllAnimes`, requestOptions);
        if (!getAllAnimesResponse.ok) {
            return [];
            throw new Error(getAllAnimesResponse.statusText);
        }
        const animeData: Animes[] = await getAllAnimesResponse.json();
        return animeData;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export async function GetAnimeByAlphabet(AlphabetValue: string | null): Promise<Animes[]> {
    const body = {
        alphabetValue: AlphabetValue
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const getAllAnimesResponse = await fetch(`${baseUrl}/Anime/GetAnimeByAlphabet`, requestOptions);

        if (!getAllAnimesResponse.ok) {
            return [];
            // throw new Error(getAllAnimesResponse.statusText);
        }

        const animeData: Animes[] = await getAllAnimesResponse.json();
        if (animeData.length < 0) {
            window.location.href = "/404";
        }
        return animeData;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export async function GetSpecificAnime(AnimeId: string[]): Promise<Animes[]> {
    const body = {
        favoritedAnimes: AnimeId
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const getSpecificAnimeResponse = await fetch(`${baseUrl}/Anime/GetSpecificAnime`, requestOptions);

        if (!getSpecificAnimeResponse.ok) {
            throw new Error(getSpecificAnimeResponse.statusText);
        }

        const animeData: Animes[] = await getSpecificAnimeResponse.json();
        return animeData;
    } catch (error) {
        return [];
        console.error('Error:', error);
    }
}