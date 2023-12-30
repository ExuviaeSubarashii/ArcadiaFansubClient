import { json } from "@sveltejs/kit";
import type { Episodes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetEpisodeVideo(episodeId: string): Promise<Episodes> {
    try {
        const getEpisodesResponse = await fetch(`${baseUrl}/Episode/GetVideo`, {
            method: 'POST',
            body:JSON.stringify(episodeId),
            headers: { 'Content-Type': 'application/json' },
        });

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