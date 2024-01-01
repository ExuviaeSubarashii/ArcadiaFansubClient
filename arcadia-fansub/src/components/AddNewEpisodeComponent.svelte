<script lang="ts">
	import { ExportedAnimeLists } from "../datas/animes/getanimes";
	import { AddEpisodeFunction, GetAddEpisodeNumber } from "../datas/episodes/addEpisode";
	import type { AddEpisode } from "../types/types";

    //add episode
    var episodeAnimeName:any;
    var episodeNumberVar:any;
    var episodeLinks:any;
    var episodeUploadDate:any;

    
    //add episode
    let animeEpisodeNumber:any;
    async function handleAnimeChange(animeId:string){
        animeEpisodeNumber= await GetAddEpisodeNumber(animeId)
        console.log(animeEpisodeNumber);
    }
    async function handleEpisodeNumberChange(episodeNumber:number){
        animeEpisodeNumber=episodeNumber
        console.log(animeEpisodeNumber);
    }
    async function SendAddEpisodeRequest(episodeAnimeName:any,episodeNumberVar:any,episodeLinks:any,episodeUploadDate:any){
        const newEpisode:AddEpisode={
        animeName:episodeAnimeName,
        episodeLikes:0,
        // episodeLinks:['Link1', 'Link2'],
        episodeLinks: (episodeLinks || '').split(" "),
        episodeNumber:episodeNumberVar,
        episodeUploadDate:episodeUploadDate
    }
    console.log(JSON.stringify(newEpisode));
    await AddEpisodeFunction(newEpisode);
    }
</script>

<div>
    <select bind:value={episodeAnimeName} on:change={()=>handleAnimeChange(episodeAnimeName)}>

        {#each $ExportedAnimeLists as anime}
        <option value="{anime.animeId}">{anime.animeName}</option>
        {/each}

    </select>

    <input bind:value={episodeLinks} placeholder="Links">
    <input bind:value={episodeUploadDate} type="date">
    <select bind:value={episodeNumberVar} on:change={()=>handleEpisodeNumberChange(episodeNumberVar)}>

        
        {#each Array(animeEpisodeNumber) as _,i(i)}
        <option value="{i+1}" on:change={()=>{console.log(episodeNumberVar)}}>{i+1}.Bolum</option>
        {/each}

        
    </select>
    <button on:click={()=>SendAddEpisodeRequest(episodeAnimeName,episodeNumberVar,episodeLinks,episodeUploadDate)}>Add New Episode</button>
</div>