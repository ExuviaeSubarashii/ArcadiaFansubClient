import { get } from "svelte/store";
import type { UserProfile } from "../../types/types";
import { baseUrl } from "../variables";

export async function GetUserProfile(userName:string):Promise<UserProfile>{
try {
    const body={
        userName:userName
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    }
    const getProfile=await fetch(`${baseUrl}/User/GetUserById`,requestOptions);
    if(!getProfile.ok){
        throw new Error('Failed to get user profile.');
    }
    const userProfile:UserProfile=await getProfile.json();
    return userProfile;
} catch (error) {
    window.location.href='/404';
    throw new Error('Failed to get user profile.');
}
}