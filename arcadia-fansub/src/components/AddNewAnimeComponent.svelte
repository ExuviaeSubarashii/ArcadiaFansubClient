<script lang="ts">
	import { AddAnimeFunction } from '../datas/animes/addAnime';
	import type { AddAnime } from '../types/types';

	//add anime
	let animeName: any;
	let episodeAmount: any;
	let editor: any;
	let translator: any;
	let releaseDate: any;
    let imageLink:any;

	async function SendAddAnimeRequest(
		animeName: any,
		episodeAmount: any,
		editor: any,
		translator: any,
		releaseDate: any,
        imageLink:any) {
		const addAnime: AddAnime = {
			animeName: animeName,
			animeEpisodeAmount: episodeAmount,
			editor: editor,
			translator: translator,
			releaseDate: releaseDate,
            imageLink:imageLink
		};
        console.log(JSON.stringify(addAnime));
        await AddAnimeFunction(addAnime)
	}
	//add anime
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
			  if(animeName!=='undefined' || animeName!==null ||episodeAmount!=='undefined' || episodeAmount!==null ||editor!=='undefined' || translator!==null ||translator!=='undefined' || releaseDate!==null ||releaseDate!=='undefined'||imageLink!=='undefined' || imageLink!==null){
				  SendAddAnimeRequest(animeName,episodeAmount,editor,translator,releaseDate,imageLink)}
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