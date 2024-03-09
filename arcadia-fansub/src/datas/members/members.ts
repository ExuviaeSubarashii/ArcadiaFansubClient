import { error, json } from "@sveltejs/kit";
import type { Member } from "../../types/types";
import currentUser from "../users/user";
import { baseUrl, responseMessageStore } from "../variables";

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
export async function AddOrRemoveMemberRole(roleName:string,userId:number){
    try {
        const body={
            userToken:currentUser.userToken,
            roleName:roleName,
            userId:userId
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const removeRoleResponse=await fetch(`${baseUrl}/Member/AddOrRemoveRole`,requestOptions);
        if(!removeRoleResponse.ok){
            throw new Error(removeRoleResponse.statusText);
        }
        responseMessageStore.set(removeRoleResponse.statusText);
        
    } catch (error) {
        
    }
}