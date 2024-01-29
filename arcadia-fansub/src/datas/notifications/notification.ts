import { json } from "@sveltejs/kit";
import type { Notifications } from "../../types/types";
import currentUser from "../users/user";
import { baseUrl } from "../variables";

export async function GetUserNotifications():Promise<Notifications[]>{
    let isoutofdate=await GetUserNotificationsIfOutOfDate();
    if(isoutofdate===true){
    try {
        const today=new Date();
        const todayString=today.toLocaleString();
        localStorage.setItem("last-notification-reset",todayString.toLocaleString());
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
        const notificationData=responseMessage.map(notification=>({
            ...notification,
            isVisible:true
        }));
        const notificationDataString=JSON.stringify(notificationData);
        if(notificationDataString!==undefined){
            localStorage.setItem("notifications",JSON.stringify(notificationData))
        }
        return responseMessage;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
else{
    return JSON.parse(localStorage.getItem("notifications")||"[]");
}
}
export async function GetUserNotificationsIfOutOfDate(){
    let notificationDate=localStorage.getItem("last-notification-reset");
    if(notificationDate!==null){
        const notificationDateObject=new Date(notificationDate);
        const today=new Date();
        const differenceInTime=today.getTime()-notificationDateObject.getTime();
        const differenceInDays=differenceInTime/(1000*3600*24);
        if(differenceInDays>7||notificationDate===undefined){
            console.log("triggered")
            return true;
        }
        else{
            return false;
        }
        
    }
}


