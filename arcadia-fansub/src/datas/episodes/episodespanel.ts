import { writable } from "svelte/store";
import type { Episodes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetEpisodePanelData(animeId:string){
    try {
        const body={
            animeId:animeId
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getEpisodePanelDataResponse=await fetch(`${baseUrl}/Episode/GetEpisodePanelData`,requestOptions);
        if(!getEpisodePanelDataResponse.ok){
            throw new Error(getEpisodePanelDataResponse.statusText);
        }
        const panelData:Episodes[]=await getEpisodePanelDataResponse.json();
        // return panelData;
        exportedepisodes.set(panelData);
    } catch (error) {
        return [];
    }
}
export const exportedepisodes=writable<Episodes[]>([])
