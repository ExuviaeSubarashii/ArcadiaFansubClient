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
        const getanimeProperties=await fetch(`${baseUrl}/User/IsAdmin`,requestOptions)
        const propertyData=await getanimeProperties.json();
        console.log(propertyData);
        return Boolean(propertyData);

    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get anime properties.');
    }
}