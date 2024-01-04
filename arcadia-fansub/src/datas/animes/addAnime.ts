import type { AddAnime } from "../../types/types";
import { baseUrl } from "../variables";

export async function AddAnimeFunction(anime: AddAnime) {
    try {
        console.log(JSON.stringify(anime));
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(anime),
            headers: { 'Content-Type': 'application/json' },
        };
        const addEpisodeResponse = await fetch(`${baseUrl}/Anime/CreateNewAnime`, requestOptions);
        if (!addEpisodeResponse.ok) {
            throw new Error(addEpisodeResponse.statusText);
        }
        window.location.href="/addnew";

    } catch (error) {
        console.error('Error:', error);
    }
}