import type { AddEpisode} from '../../types/types'
import { baseUrl } from '../variables';

export async function AddEpisodeFunction(episode: AddEpisode) {
    try {
        console.log(JSON.stringify(episode));
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(episode),
            headers: { 'Content-Type': 'application/json' },
        };
        const addEpisodeResponse = await fetch(`${baseUrl}/Episode/AddNewEpisode`, requestOptions);
        if (!addEpisodeResponse.ok) {
            throw new Error(addEpisodeResponse.statusText);
        }
        // window.location.href="/addnew";

    } catch (error) {
        console.error('Error:', error);
    }
}
export async function GetAddEpisodeNumber(animeId:string):Promise<number>{
    try {
        const body={
            animeId:animeId
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getEpisodesResponse = await fetch(`${baseUrl}/Anime/GetAddEpisodeNumber`,requestOptions);
        if(!getEpisodesResponse.ok){
            throw new Error(getEpisodesResponse.statusText);
            window.location.href="/addnew";
        }
        const returneddata=await getEpisodesResponse.json();
        console.log(returneddata);
        return returneddata;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get anime properties.');

    }
}