<script lang="ts">
	import { onMount } from 'svelte';
	import { AddAnimeToFavorites, GetAllAnimes } from '../datas/animes/getanimes';	
	import type { Animes } from '../types/types';
	import currentUser from '../datas/users/user';
	import { IsAuthenticated } from '../datas/users/authentication';
	export let animes:Animes[] = [];
	onMount(async () => {
		animes=await GetAllAnimes();
	});
</script>

<div class="row gap-2 ms-5">
	<h1 class="text-light">Tüm Seriler</h1>
	{#await animes}
		<div>Seriler Yükleniyor...</div>
	{:then animelist}
		{#each animelist as anime}
			<div
				class="bomba card mb-3 text-bg-dark border-5 rounded border-secondary"
				style="max-width: 540px;"
			>
				<a href="/watch/{anime.animeId}" class="text-decoration-none text-light">
					<div class="row g-0">
						<div class="col-md-4 mt-4">
							<img
								src={`../src/lib/imajlar/${anime.animeImage}` ?? ''}
								class="img-fluid rounded-start"
								alt="..."
							/>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<h5 class="card-title">{anime.animeName}</h5>
								<p class="card-text"><small class="card-text">{anime.releaseDate}</small></p>
								<p class="card-text">
									<small class="card-text">{anime.translator}||{anime.editor}</small>
								</p>
							</div>
						</div>
					</div>
				</a>
				<div class="like-dislike">
					<!-- check if favorited or not -->
					{#if anime.isFavorited===true}
					<!-- favorites -->
					<button title="Favorilerden Kaldır" on:click={async()=> {
						if(await IsAuthenticated()===true){
							await AddAnimeToFavorites(anime.animeId)}
						else{
							window.location.href="/login";
						}}
						}
						 class="btn btn-light"><i class='bx bxs-bookmark'></i></button> 
					{:else}
					<!-- unfavorites -->
					<button title="Favorilere Ekle" on:click={async()=> {
						if(await IsAuthenticated()===true){
							await AddAnimeToFavorites(anime.animeId)}
						else{
							window.location.href="/login";
						}}
						} class="btn btn-light"><i class='bx bx-bookmark' ></i></button>
					{/if}
				</div>
			</div>
		{/each}
		{:catch error}
	<p>error loading comments: {error.message}</p>
	{/await}
</div>

<style>
		.like-dislike {
		position: absolute;
		left: 90%;
		top: 2%;
	}
	.bomba {
		border-radius: 25px;
		border-style: solid;
		border-width: 1px;
		border-image: linear-gradient(to right, rgb(192, 1, 156) 0%, rgb(84, 102, 184) 100%);
		border-image-slice: 1;
	}
	img {
		inline-size: 150px;
	}
</style>
