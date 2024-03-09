import { error, json } from "@sveltejs/kit";
import type { Member, User } from "../../types/types";
import currentUser from "../users/user";
import { baseUrl, responseMessageStore } from "../variables";

export async function GetAllMembers(): Promise<Member[]> {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const getMembersResponse = await fetch(`${baseUrl}/Member/GetAllMembers`, requestOptions);

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
export async function AddOrRemoveMemberRole(roleName: string, userId: number) {
    try {
        const body = {
            userToken: currentUser.userToken,
            roleName: roleName,
            userId: userId
        }
        console.log(body);
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const removeRoleResponse = await fetch(`${baseUrl}/Member/AddOrRemoveRole`, requestOptions);
        if (!removeRoleResponse.ok) {
            throw new Error(removeRoleResponse.statusText);
        }
        responseMessageStore.set(removeRoleResponse.statusText);

    } catch (error) {

    }
}
export async function GetMemberByQuery(param: string): Promise<User[]> {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const userQueryResponse = await fetch(`${baseUrl}/User/GetUserBySearch/${param}`, requestOptions);
        if (!userQueryResponse.ok) {
            throw new Error(userQueryResponse.statusText);
        }
        const userQuery: User[] = await userQueryResponse.json();
        return userQuery;
    } catch (error) {
        return [];
    }
}