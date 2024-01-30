<script lang="ts">
	import { onMount } from 'svelte';
	import { GetAllAnimes } from '../datas/animes/getanimes';
	import { AddEpisodeFunction, GetAddEpisodeNumber } from '../datas/episodes/addEpisode';
	import type { AddEpisode, Animes } from '../types/types';
	let animes: Animes[] = [];

	//add episode
	var episodeAnimeName: any;
	var episodeNumberVar: any;
	var episodeLinks: any;

	//add episode
	let animeEpisodeNumber: any;
	async function handleAnimeChange(animeId: string) {
		if (animeId === 'undefined' || animeId === null || animeId === '') {
			return;
		} else {
			animeEpisodeNumber = await GetAddEpisodeNumber(animeId);
		}
	}
	async function handleEpisodeNumberChange(episodeNumber: number) {
		episodeNumberVar = episodeNumber;
	}
	async function SendAddEpisodeRequest(
		episodeAnimeName: any,
		episodeNumberVar: any,
		episodeLinks: any
	) {
		const newEpisode: AddEpisode = {
			animeName: episodeAnimeName,
			episodeLikes: 0,
			episodeLinks: (episodeLinks || '').split(' '),
			episodeNumber: episodeNumberVar
		};
		await AddEpisodeFunction(newEpisode);
	}
	onMount(async () => {
		animes = await GetAllAnimes();
		await handleAnimeChange(episodeAnimeName);
	});
</script>

<div class="fullbody mt-3">
	<div class="mt-3">
		{#await animes}
			<div>Loading</div>
		{:then animelist}
			<select
				class="form-select mb-3"
				bind:value={episodeAnimeName}
				on:change={() => handleAnimeChange(episodeAnimeName)}
			>
				{#each animelist as anime}
					<option value={anime.animeId}>{anime.animeName}</option>
				{/each}
			</select>
			<div class="input-group mb-3">
				<input
					type="text"
					class="form-control"
					bind:value={episodeLinks}
					placeholder="Video Linkleri"
					aria-label="Links"
					aria-describedby="basic-addon2"
				/>
			</div>
		{/await}

		{#key animes}
			<select
				class="form-select mb-3"
				bind:value={episodeNumberVar}
				on:change={() => handleEpisodeNumberChange(episodeNumberVar)}
			>
				{#each Array(animeEpisodeNumber) as _, i (i)}
					<option value={i + 1} on:change={() => {}}>{i + 1}.Bolum</option>
				{/each}
			</select>
		{/key}
		<div class="d-flex justify-content-center">
			<button
				class="btn btn-light"
				on:click={() => {
					if (
						episodeAnimeName !== 'undefined' ||
						(episodeAnimeName !== null && episodeNumberVar !== 'undefined') ||
						(episodeNumberVar !== null && episodeLinks !== 'undefined') ||
						episodeLinks !== null
					)
						SendAddEpisodeRequest(episodeAnimeName, episodeNumberVar, episodeLinks);
				}}>Yeni Bölüm Oluştur</button
			>
		</div>
	</div>
</div>

<style>
	.fullbody {
		padding: 10px;
		position: relative;
		left: 30%;
		border-style: solid;
		border-radius: 20px;
		width: 700px;
		height: 300px;
		border-color: blueviolet;
	}
</style>
