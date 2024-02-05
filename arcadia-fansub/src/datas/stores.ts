import { browser } from "$app/environment";
import { writable } from "svelte/store";

export let pageCount=writable<number>(0);
