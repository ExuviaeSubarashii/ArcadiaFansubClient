import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { User } from "../../types/types";
var userTokenValue:any;
var userIdValue:any;
var userEmailValue:any;
var userPermValue:any;
var userNameValue:any;
// Initialize the store with a default value
const usertoken = writable(browser ? localStorage.getItem("userToken") || undefined:undefined);
const userId = writable(browser ? localStorage.getItem("userId") || undefined :undefined);
const userEmail = writable(browser ? localStorage.getItem("userEmail") || undefined:undefined);
const userPerm=writable(browser ? localStorage.getItem("userPerm") || undefined:undefined);
const userName=writable(browser ? localStorage.getItem("userName") || undefined:undefined);


usertoken.subscribe((val) => {
  if (browser) {
    localStorage.setItem("userToken", val);
  }
});
userId.subscribe((val) => {
  if (browser) {
    localStorage.setItem("userId", val);
  }
});
userEmail.subscribe((val) => {
  if (browser) {
    localStorage.setItem("userEmail", val);
  }
});
userName.subscribe((val) => {
  if (browser) {
    localStorage.setItem("userName", val);
  }
});

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
  userName.subscribe(($userName)=>{
    userNameValue=$userName;
  })

  export const currentUser:User={
    userToken: userTokenValue,
    userEmail: userEmailValue,
    userId: userIdValue,
    isLoggedIn: userTokenValue !== undefined && userTokenValue !== "undefined",
    userName: userNameValue,
    userPermission: userPermValue
  }
  export default currentUser;
  
