import { writable } from "svelte/store";

export var baseUrl=`https://localhost:7028/api`;
export var responseMessageStore=writable('');

