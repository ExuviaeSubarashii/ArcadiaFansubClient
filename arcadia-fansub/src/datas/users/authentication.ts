import { baseUrl } from "../variables";
import currentUser from "./user";

export async function IsAdmin():Promise<boolean>{
    try {
        const body={
            userToken:currentUser.userToken
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const isUserAdmin=await fetch(`${baseUrl}/User/IsAdmin`,requestOptions)
        const adminData=await isUserAdmin.json();
        console.log(adminData);
        return Boolean(adminData);

    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get user properties.');
    }
}
