import type { Animes, Episodes } from "../../types/types";
import { baseUrl } from "../variables";

//anime properties translator etc
export async function GetAnimeProperties(animeId:string):Promise<Animes> {
    try {
        const body={
            animeId:animeId
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getanimeProperties=await fetch(`${baseUrl}/Anime/GetAnimeProperties`,requestOptions)
        const propertyData:Animes=await getanimeProperties.json();
        console.log(propertyData);
        return propertyData;

    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get anime properties.');
    }
}
//all episodes and put it on a sidebar
export async function GetAnimeEpisodes(animeId:string):Promise<Episodes[]>{
    try {
        const body={
            animeId:animeId
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getanimeProperties=await fetch(`${baseUrl}/Anime/GetAnimeEpisodes`,requestOptions)
        const propertyData:Episodes[]=await getanimeProperties.json();
        console.log(propertyData);
        return propertyData;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get anime properties.');
    }
}