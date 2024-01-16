import type { AddAnime } from "../../types/types";
import { baseUrl, responseMessageStore } from "../variables";

export async function AddAnimeFunction(anime: AddAnime) {
    try {
        console.log(JSON.stringify(anime));
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(anime),
            headers: { 'Content-Type': 'application/json' },
        };
        const addAnimeResponse = await fetch(`${baseUrl}/Anime/CreateNewAnime`, requestOptions);
        if (!addAnimeResponse.ok) {
            throw new Error(addAnimeResponse.statusText);
        }
        window.location.href="/addnew";
        const responseMessage=await addAnimeResponse.text();
        responseMessageStore.set(responseMessage);
    } catch (error) {
        console.error('Error:', error);
    }
}