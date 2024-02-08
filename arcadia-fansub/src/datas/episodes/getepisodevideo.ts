import { json } from "@sveltejs/kit";
import type { Episodes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetEpisodeVideo(episodeId: string): Promise<Episodes> {
    try {
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(episodeId),
            headers: { 'Content-Type': 'application/json' },
        };
        const getEpisodesResponse = await fetch(`${baseUrl}/Episode/GetVideo`,requestOptions);

        if (!getEpisodesResponse.ok) {
            
            throw new Error(getEpisodesResponse.statusText);
        }

        const episodeData: Episodes = await getEpisodesResponse.json();
        return episodeData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}