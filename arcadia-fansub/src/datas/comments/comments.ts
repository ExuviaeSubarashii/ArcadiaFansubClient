import type { Comments, CreateCommentBody, UpdateCommentBody } from "../../types/types";
import currentUser from "../users/user";
import { baseUrl, responseMessageStore } from "../variables";

export async function CreateComment(commentBody:CreateCommentBody){
    try {
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(commentBody),
            headers: { 'Content-Type': 'application/json' },
        };
        const createComment=await fetch(`${baseUrl}/Comment/CreateEpisodeComment`,requestOptions);
        if(!createComment.ok){
            return [];
        }
        const commentData=await createComment.text();
        responseMessageStore.set(commentData);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create comment.');
    }

}
export async function GetComments(episodeId:string):Promise<Comments[]>{
    try {
        const body={
            userToken:currentUser.userToken??""
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getComments=await fetch(`${baseUrl}/Comment/GetEpisodeComments/${episodeId}`,requestOptions);
        if(!getComments.ok){
            return[];
        }
        const commentData:Comments[]=await getComments.json();
        return commentData;
    } catch (error) {
        
        console.error('Error:', error);
        throw new Error('Failed to get comments.');
    }
}
export async function DeleteComment(commentToDeleteId:number){
    try {
        const body={
            commentId:commentToDeleteId,
            userToken:currentUser.userToken
        }
        const requestOptions = {
            method: 'DELETE',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const deleteComment=await fetch(`${baseUrl}/Comment/DeleteEpisodeComment`,requestOptions);
        if(!deleteComment.ok){
            return[];
        }
        const commentData=await deleteComment.text();
        return commentData;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete comment.');
    }
}
export async function UpdateComment(updateCommentBody:UpdateCommentBody){
    try {
        const requestOptions = {
            method: 'PUT',
            body:JSON.stringify(updateCommentBody),
            headers: { 'Content-Type': 'application/json' },
        };
        const updateComment=await fetch(`${baseUrl}/Comment/UpdateEpisodeComment`,requestOptions);
        if(!updateComment.ok){
            return[];
        }
        const commentData=await updateComment.text();
        responseMessageStore.set(commentData);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update comment.');
    }
}
export async function GetUserComments(userName:string):Promise<Comments[]>{
    try {
        const body={
            userToken:currentUser.userToken
        }
        const requestOptions = {
            method: 'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getComments=await fetch(`${baseUrl}/Comment/GetUserComments/${userName}`,requestOptions);
        if(!getComments.ok){
            return[];
        }
        const commentData:Comments[]=await getComments.json();
        return commentData;
    } catch (error) {
        
        console.error('Error:', error);
        throw new Error('Failed to get comments.');
    }
}