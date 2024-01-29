import type { User } from "../../types/types";
import { baseUrl, responseMessageStore } from "../variables";
import currentUser from "./user";

export async function LogOut() {
    await localStorage.clear();
    await location.reload();
    await localStorage.setItem("isLoggedIn","false");
    window.location.href='/';
}
export async function Login(email: string, password: string) {
    try {
        const user = {
            userEmail: email,
            password: password
        };

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const loginResponse = await fetch(`${baseUrl}/User/Login`, requestOptions);
        if (!loginResponse.ok) {
            throw new Error(loginResponse.statusText);
        }
        const data:User = await loginResponse.json();
        localStorage.setItem('userId', data.userId.toString());
        localStorage.setItem('userToken', data.userToken);
        localStorage.setItem('userEmail', data.userEmail);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userPerm',data.userPermission)
        localStorage.setItem('isLoggedIn', "true");
        window.location.href = '/';
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function Register(email: string, password: string, username: string) {
    
    try {
        const user = {
            userEmail: email,
            userPassword: password,
            userName: username
        };
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const registerResponse = await fetch(`${baseUrl}/User/Register`, requestOptions);
        if (!registerResponse.ok) {
            throw new Error(registerResponse.statusText);
        }
        window.location.href = '/login';
    } catch (error) {
        console.error('Error:', error);
    }
}