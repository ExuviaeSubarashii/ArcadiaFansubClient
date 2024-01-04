<script lang="ts">
	import { onMount } from 'svelte';
	import { ExportedAnimeLists } from '../datas/animes/getanimes';
	import { AddEpisodeFunction, GetAddEpisodeNumber } from '../datas/episodes/addEpisode';
	import type { AddEpisode } from '../types/types';

	//add episode
	var episodeAnimeName: any;
	var episodeNumberVar: any;
	var episodeLinks: any;
	var episodeUploadDate: any;

	//add episode
	let animeEpisodeNumber: any;
	async function handleAnimeChange(animeId: string) {
		animeEpisodeNumber = await GetAddEpisodeNumber(animeId);
		console.log(animeEpisodeNumber);
	}
	async function handleEpisodeNumberChange(episodeNumber: number) {
		episodeNumberVar = episodeNumber;
		console.log(animeEpisodeNumber);
	}
	async function SendAddEpisodeRequest(
		episodeAnimeName: any,
		episodeNumberVar: any,
		episodeLinks: any,
		episodeUploadDate: any
	) {
		const newEpisode: AddEpisode = {
			animeName: episodeAnimeName,
			episodeLikes: 0,
			episodeLinks: (episodeLinks || '').split(' '),
			episodeNumber: episodeNumberVar,
			episodeUploadDate: episodeUploadDate
		};
		console.log(JSON.stringify(newEpisode));
		await AddEpisodeFunction(newEpisode);
	}
	onMount(async () => {
		await handleAnimeChange(episodeAnimeName);
	});
</script>

<div class="fullbody">
	<div class="mt-3">
		<select
			class="form-select mb-3"
			bind:value={episodeAnimeName}
			on:change={() => handleAnimeChange(episodeAnimeName)}
		>
			{console.log(episodeAnimeName)}
			{#each $ExportedAnimeLists as anime}
				<option value={anime.animeId}>{anime.animeName}</option>
			{/each}
		</select>
		<!-- <input bind:value={episodeLinks} placeholder="Links">
            <input bind:value={episodeUploadDate} type="date"> -->
		<div class="input-group mb-3">
			<input
				type="text"
				class="form-control"
				bind:value={episodeLinks}
				placeholder="Links"
				aria-label="Links"
				aria-describedby="basic-addon2"
			/>
		</div>

		<div class="input-group mb-3">
			<input
				type="date"
				class="form-control"
				bind:value={episodeUploadDate}
				aria-label="Recipient's username"
				aria-describedby="basic-addon2"
			/>
		</div>

		<select
			class="form-select mb-3"
			bind:value={episodeNumberVar}
			on:change={() => handleEpisodeNumberChange(episodeNumberVar)}
		>
			{#each Array(animeEpisodeNumber) as _, i (i)}
				<option
					value={i + 1}
					on:change={() => {
						console.log(episodeNumberVar);
					}}>{i + 1}.Bolum</option
				>
			{/each}
		</select>
		<div class="d-flex justify-content-center">
			<button
				class="btn btn-light"
				on:click={() => {
					if (
						episodeAnimeName !== 'undefined' ||
						(episodeAnimeName !== null && episodeNumberVar !== 'undefined') ||
						(episodeNumberVar !== null && episodeLinks !== 'undefined') ||
						(episodeLinks !== null && episodeUploadDate !== 'undefined') ||
						episodeUploadDate !== null
					)
						SendAddEpisodeRequest(
							episodeAnimeName,
							episodeNumberVar,
							episodeLinks,
							episodeUploadDate
						);
				}}>Add New Episode</button
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
