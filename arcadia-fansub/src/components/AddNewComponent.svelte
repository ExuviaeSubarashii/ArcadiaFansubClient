<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import type { AddAnime,AddEpisode } from "../types/types";
	import { ExportedAnimeLists} from "../datas/animes/getanimes";
	import { AddEpisodeFunction, GetAddEpisodeNumber } from "../datas/episodes/addEpisode";
	import AddNewEpisodeComponent from "./AddNewEpisodeComponent.svelte";

	let userOption=writable(0);
    function SetOption(option:number){
        $userOption=option;
    }
    //add anime
    let animeName: any;
    let episodeAmount: any;
    let editor: any;
    let translator: any;
    let releaseDate: any;
    const addAnime:AddAnime={
        AnimeName:animeName,
        AnimeEpisodeAmount:episodeAmount,
        Editor:editor,
        Translator:translator,
        ReleaseDate:releaseDate
    }
    //add anime

    

</script>
{#key $userOption}
<div class="options">
    <button on:click={()=>SetOption(0)}>Add Anime</button>
    <button on:click={()=>SetOption(1)}>Add Episode</button>
    <button on:click={()=>SetOption(2)}>Update Anime</button>
    <button on:click={()=>SetOption(3)}>Update Episode</button>
</div>
<div class="full-body" style="display:flex; column-direction:column;">

    <!-- add anime -->
	{#if $userOption === 0}
		<div>
			<input bind:value={animeName} placeholder="Anime Name">
			<input bind:value={episodeAmount} placeholder="Episode Amount">
			<input bind:value={editor} placeholder="Editor">
			<input bind:value={translator} placeholder="Translator">
			<input bind:value={releaseDate} placeholder="Release Date" type="date">
            <button>Create New Anime</button>
		</div>
	{/if}

    <!-- add episode -->
    {#if $userOption === 1}
    <AddNewEpisodeComponent/>
    {/if}
    {#if $userOption === 2}
    <div>
        <p>{$userOption}</p>
    </div>
    {/if}
    {#if $userOption === 3}
    <div>
        <p>{$userOption}</p>
    </div>
    {/if}
</div>
{/key}

<style>
</style>
