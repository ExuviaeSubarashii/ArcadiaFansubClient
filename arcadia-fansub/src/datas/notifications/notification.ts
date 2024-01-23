import type { Notifications } from "../../types/types";
import currentUser from "../users/user";
import { baseUrl } from "../variables";

export async function GetUserNotifications():Promise<Notifications[]>{
    try {
        const body={
            userToken:currentUser.userToken
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const notificationResponse = await fetch(`${baseUrl}/Notification/GetNotifications`, requestOptions);

        if (!notificationResponse.ok) {
            throw new Error(notificationResponse.statusText);
        }

        const responseMessage: Notifications[] = await notificationResponse.json();
        console.log(responseMessage);
        return responseMessage;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }

}