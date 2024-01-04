import type { Episodes } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetEpisodePanelData():Promise<Episodes[]>{
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const getEpisodePanelDataResponse=await fetch(`${baseUrl}/Episode/GetEpisodePanelData`,requestOptions);
        if(!getEpisodePanelDataResponse.ok){
            throw new Error(getEpisodePanelDataResponse.statusText);
        }
        const panelData:Episodes[]=await getEpisodePanelDataResponse.json();
        return panelData;
    } catch (error) {
        return [];
    }
}