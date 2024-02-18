<script lang="ts">
	import { writable } from "svelte/store";
	import AddNewEpisodeComponent from "./AddNewEpisodeComponent.svelte";
	import AddNewAnimeComponent from "./AddNewAnimeComponent.svelte";
	import EpisodePanelComponent from "./EpisodePanelComponent.svelte";

	let userOption=writable();
    function SetOption(option:number){
        $userOption=option;
    }
 

    

</script>
{#key $userOption}

<div class="container">
    <div class="row g-0">
        <button type="button" class="mt-2 col btn btn-dark border border-secondary"  on:click={()=>SetOption(0)}>Yeni Seri Ekle</button>
        <button type="button" class="mt-2 col btn btn-dark border border-secondary" on:click={()=>SetOption(1)}>Yeni Bölüm Ekle</button>
      <div class="w-100"></div>
      <button type="button" class="col btn btn-dark border border-secondary" on:click={()=>SetOption(2)}>Bölüm Paneli</button>
    </div>
  </div>
<div class="full-body" style="display:flex; column-direction:column;">

    <!-- add anime -->
	{#if $userOption === 0}
		<AddNewAnimeComponent/>
	{/if}

    <!-- add episode -->
    {#if $userOption === 1}
    <AddNewEpisodeComponent/>
    {/if}
    {#if $userOption===2}
        <EpisodePanelComponent/>
    {/if}
</div>
{/key}

<style>
    
</style>
