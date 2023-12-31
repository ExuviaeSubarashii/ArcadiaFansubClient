<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
	import type { Animes, Episodes } from '../../types/types';
	import { GetAnimeEpisodes, GetAnimeProperties } from '../../datas/pages/animepage';
    export let data: PageData;
    let name=data.props.animedata.animename;
    console.log(name);
    let animedata:Animes|null;
    let episodedata:Episodes[]=[];
    onMount(async()=>{
        const returnedAnimedata=    await GetAnimeProperties(name);
        const returnedEpisodesdata= await GetAnimeEpisodes(name);
        
        if(returnedAnimedata){
            animedata=returnedAnimedata;
            episodedata=returnedEpisodesdata;
        }
    })
</script>

<div class="card" style="width: 18rem; top:10%; left:43%;">
    <div class="card-body">
      <h5 class="card-title">{animedata?.animeName}</h5>
      <img src="{animedata?.animeImage}" alt="captura">
      <p>Çevirmen: {animedata?.translator} || Editör:{animedata?.editor} </p>
    </div>
  </div>


  <div class="list-group">
    {#each episodedata as episode}
      <a href="/video/{episode.episodeId}" class="list-group-item" style="display:flex; flex-direction:column; width: 150px; margin: 10px 0; padding: 10px;" aria-current="true">
          <div>
              <h5 class="mb-3 text-center">{episode.animeName} - {episode.episodeNumber}. Bölüm</h5>
          </div>
          <div>
            <h5 class="mb-3 text-center">{episode.animeName} - {episode.episodeNumber}. Bölüm</h5>
        </div>
      </a>
    {/each}
  </div>
  

