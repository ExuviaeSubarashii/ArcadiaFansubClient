import type { AddAnime } from "../../types/types";
import { baseUrl, responseMessageStore } from "../variables";

export async function AddAnimeFunction(anime: AddAnime) {
    const body = {
        animeName: anime.animeName,
        animeEpisodeAmount: anime.animeEpisodeAmount,
        releaseDate: anime.releaseDate,
        translator: anime.translator,
        editor: anime.editor,
        description:anime.description||"Boş"
    }
    try {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const addAnimeResponse = await fetch(`${baseUrl}/Anime/CreateNewAnime`, requestOptions);
        if (!addAnimeResponse.ok) {
            throw new Error(addAnimeResponse.statusText);
        }
        window.location.href = "/addnew";
        const responseMessage = await addAnimeResponse.text();
        responseMessageStore.set(responseMessage);
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function UploadImage(imageData: FormData) {
    try {
        const response = await fetch(`${baseUrl}/Anime/upload-images`, {
            method: 'POST',
            body: imageData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}