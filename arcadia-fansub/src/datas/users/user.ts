import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { User } from "../../types/types";
var userTokenValue:any;
var userIdValue:any;
var userEmailValue:any;
var userPermValue:any;
// Initialize the store with a default value
const usertoken = writable(browser ? localStorage.getItem("userToken") || undefined:undefined);
const userId = writable(browser ? localStorage.getItem("userId") || undefined :undefined);
const userEmail = writable(browser ? localStorage.getItem("userEmail") || undefined:undefined);
const userPerm=writable(browser ? localStorage.getItem("userPerm") || undefined:undefined);

  usertoken.subscribe(($usertoken) => {
    userTokenValue = $usertoken;
  });
  userId.subscribe(($userId)=>{
    userIdValue=$userId;
  })
  userEmail.subscribe(($userEmail)=>{
    userEmailValue=$userEmail;
  })
  userPerm.subscribe(($userPerm)=>{
    userPermValue=$userPerm;
  })

  export const currentUser:User={
    userToken: userTokenValue,
    userEmail: userEmailValue,
    userId: userIdValue,
    isLoggedIn: userTokenValue !== undefined && userTokenValue !== "undefined",
    userName: "",
    userPermission: ""
  }

  export default currentUser;
  
