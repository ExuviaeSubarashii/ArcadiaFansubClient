import { baseUrl } from "../variables";
import currentUser from "./user";

export async function IsAdmin(): Promise<boolean> {
    try {
        const body = {
            userToken: currentUser.userToken
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const isUserAdmin = await fetch(`${baseUrl}/User/IsAdmin`, requestOptions)
        const adminData = await isUserAdmin.json();
        return Boolean(adminData);

    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get user properties.');
    }
}
export async function IsAuthenticated(): Promise<boolean> {


    try {
        const body = {
            userToken: currentUser.userToken
        }
        if (body.userToken === null || body.userToken === undefined || body.userToken === "undefined" || body.userToken === "") {
            return false;
        }
        else {

            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            };
            const isAuthenticated = await fetch(`${baseUrl}/User/AuthUser`, requestOptions);
            const userData = await isAuthenticated.json();
            if (userData) {
                currentUser.isLoggedIn = true;
                return true;
            }
            else {
                return false;
            }
        }
    }
    catch {
        return false;
    }
}
