<script lang="ts">
	import { AddAnimeFunction } from '../datas/animes/addAnime';
	import { IsNullOrEmpty } from '../datas/emptychecker';
	import type { AddAnime } from '../types/types';

	//add anime
	let animeName: any;
	let episodeAmount: any;
	let editor: any;
	let translator: any;
	let releaseDate: any;
    let imageLink:any;

	async function SendAddAnimeRequest() {
		const addAnime: AddAnime = {
			animeName: animeName,
			animeEpisodeAmount: episodeAmount,
			editor: editor,
			translator: translator,
			releaseDate: releaseDate,
            imageLink:imageLink
		};
        await AddAnimeFunction(addAnime)
	}
</script>

<div class="mt-3" id="fullbody">
	<div class="input-group mb-3">
        <input type="text" class="form-control" bind:value={animeName} placeholder="Seri Adı" aria-label="Links" aria-describedby="basic-addon2">
      </div>
	  <div class="input-group mb-3">
        <input type="text" class="form-control" bind:value={episodeAmount} placeholder="Bölüm Sayısı" aria-label="Links" aria-describedby="basic-addon2">
      </div>
	  <div class="input-group mb-3">
        <input type="text" class="form-control" bind:value={editor} placeholder="Editör Adı" aria-label="Links" aria-describedby="basic-addon2">
      </div>
	  <div class="input-group mb-3">
        <input type="text" class="form-control" bind:value={translator} placeholder="Çevirmen Adı" aria-label="Links" aria-describedby="basic-addon2">
      </div>
	  <div class="input-group mb-3">
        <input type="text" class="form-control" bind:value={imageLink} placeholder="Görsel Bağlantısı" aria-label="Links" aria-describedby="basic-addon2">
      </div>
	  <div class="input-group mb-3">
        <input type="date" class="form-control" bind:value={releaseDate} placeholder="Yayınlanma Tarihi" aria-label="Links" aria-describedby="basic-addon2">
      </div>
	  <div class="d-flex justify-content-center">

		  <button class="btn btn-light text-center" on:click={()=>{
			  if(IsNullOrEmpty(animeName)!==false || IsNullOrEmpty(episodeAmount)!==false || IsNullOrEmpty(editor)!==false || IsNullOrEmpty(translator)!==false || IsNullOrEmpty(releaseDate)!==false || IsNullOrEmpty(imageLink)!==false){
				  SendAddAnimeRequest()}
				}
			}>Yeni Seri Oluştur</button>
			</div>
</div>
<style>
	#fullbody{
		padding: 10px;
		position: relative;
		left:30%;
		border-style: solid;
		border-radius: 20px;
		width: 700px;
		height: 380px;
		border-color: blueviolet;
	}
</style>