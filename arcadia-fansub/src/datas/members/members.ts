import type { Member } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetAllMembers(): Promise<Member[]> {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const getMembersResponse = await fetch(`${baseUrl}/Member/GetAllMembers`,requestOptions);

        if (!getMembersResponse.ok) {
            
            throw new Error(getMembersResponse.statusText);
        }

        const episodeData: Member[] = await getMembersResponse.json();
        return episodeData;
    } catch (error) {
        return [];
        console.error('Error:', error);
        throw error;
    }
}