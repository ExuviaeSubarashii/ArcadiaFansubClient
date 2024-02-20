<script lang="ts">
	import { onMount } from 'svelte';
	import { GetAllAnimes, GetSpecificAnime } from '../datas/animes/getanimes';
	import type { Animes } from '../types/types';
	import { writable } from 'svelte/store';
	import { GetAnimeProperties } from '../datas/pages/animepage';
	let paneldata: Animes[] = [];
	let visiblediv: any = null;
	let currentAnime: string;
	let animeInputVisibility: boolean = false;
	let animeId: string;
	const animeData = writable<Animes>();
	onMount(async () => {
		paneldata = await GetAllAnimes();
	});
	async function HandleAnimeChange(animeId: string) {
		currentAnime = animeId;
		animeData.set(await GetAnimeProperties(animeId));
		visiblediv = null;
		// if (episodeLinkInputVisibility === true) {
		// 	HandleUpdateVisibility();
		// }
	}
	async function handleVisibility(index: any, paramepisodeId: any) {
		animeId = paramepisodeId;
		visiblediv = visiblediv === index ? null : index;
		if (animeInputVisibility === true) {
			HandleUpdateVisibility();
		}
	}
	async function HandleUpdateVisibility() {
		animeInputVisibility = !animeInputVisibility;
		// episodeLinkValue = null;
	}
</script>

<div class="fullbody">
	<div class="buttoncontainer">
		<div class="row g-0">
			{#each paneldata as data}
				<button
					class="drop-buttons"
					value={data.animeId}
					on:click={() => HandleAnimeChange(data.animeId)}
				>
					{data.animeName}
				</button>
			{/each}
		</div>
	</div>
</div>


<style>
	.buttoncontainer button {
		padding: 0.2em;
		margin: 0.2em;
		background-color: black;
		color: blueviolet;
		position: relative;
		border-radius: 15px;
		overflow-x: auto;
		white-space: nowrap;
	}
	.fullbody {
		padding: 2px;
		position: absolute;
		left: 40%;
		width: 350px;
		top: 25%;
	}
</style>
