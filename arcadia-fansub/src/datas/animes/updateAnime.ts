import type { Animes, UpdateAnimeBody } from "../../types/types";
import { GetAnimeProperties } from "../pages/animepage";
import { baseUrl, responseMessageStore } from "../variables";

export async function UpdateAnimeFunction(newAnimeDatas:UpdateAnimeBody):Promise<Animes>{
    try {
        const body={
            animeId:newAnimeDatas.animeId,
            newAnimeName:newAnimeDatas.newAnimeName||"",
            newEpisodeAmount:newAnimeDatas.newEpisodeAmount||0,
            newEditorName:newAnimeDatas.newEditorName||"",
            newTranslatorName:newAnimeDatas.newTranslatorName||"",
            newReleaseDate:newAnimeDatas.newReleaseDate||null
        }
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const updateAnimeResponse = await fetch(`${baseUrl}/Anime/UpdateAnimeProperties`, requestOptions);
        if (!updateAnimeResponse.ok) {
            throw new Error(updateAnimeResponse.statusText);
        }
        const responseMessage=await updateAnimeResponse.text();
        responseMessageStore.set(responseMessage);
        let updatedAnime:Animes=await GetAnimeProperties(newAnimeDatas.animeId);
        return updatedAnime;
    } catch (error) {
        throw new Error("Error: "+error);
    }
}