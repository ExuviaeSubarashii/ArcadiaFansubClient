<script lang="ts">
	import { onMount } from 'svelte';
	import { GetAllAnimes, GetSpecificAnime } from '../datas/animes/getanimes';
	import type { Animes, UpdateAnimeBody } from '../types/types';
	import { writable } from 'svelte/store';
	import { GetAnimeProperties } from '../datas/pages/animepage';
	import { UpdateAnimeFunction } from '../datas/animes/updateAnime';
	import { IsNullOrEmpty } from '../datas/emptychecker';
	let paneldata: Animes[] = [];
	let visiblediv: any = null;
	let currentAnime: string;
	let animeInputVisibility: boolean = false;
	let animeId: string;

	let newEpisodeAmount: number;
	let newAnimeName: string;
	let newTranslatorName: string;
	let newEditorName: string;
	let newReleaseDate: Date;

	const animeData = writable<Animes>();
	onMount(async () => {
		paneldata = await GetAllAnimes();
	});
	async function HandleAnimeChange(animeId: string) {
		currentAnime = animeId;
		animeData.set(await GetAnimeProperties(animeId));
		console.log($animeData);
		visiblediv = null;
		newAnimeName = "";
		newTranslatorName = "";
		newEditorName = "";
		newReleaseDate = new Date();
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
	
	async function HandleUpdates() {
		if(IsNullOrEmpty(newEpisodeAmount)===true&&IsNullOrEmpty(newAnimeName)===true&&IsNullOrEmpty(newTranslatorName)===true&&IsNullOrEmpty(newEditorName)===true&&IsNullOrEmpty(newReleaseDate)===true){
			return alert('En az bir alanın dolu olması gereklidir.');
		}
		const updateAnimeBody: UpdateAnimeBody = {
			animeId: currentAnime,
			newAnimeName: newAnimeName,
			newEpisodeAmount: newEpisodeAmount,
			newTranslatorName: newTranslatorName,
			newEditorName: newEditorName,
			newReleaseDate: newReleaseDate
		};
		animeData.set(await UpdateAnimeFunction(updateAnimeBody));
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
					style="background-image: url('../src/lib/imajlar/{data.animeImage}"
				>
					{data.animeName}
				</button>
			{/each}
		</div>
	</div>
</div>
{#if $animeData}
	{#key $animeData}
		<div class="animepanel">
			{#await $animeData}
				<div>Yukleniyor...</div>
			{:then data}
				<div class="anime">
					<img
						src={`../src/lib/imajlar/${data.animeImage}` ?? ''}
						class="img-fluid rounded-start"
						alt="..."
					/>
					<hr />
					<input
						bind:value={newEpisodeAmount}
						class="animeInput"
						placeholder={data.animeEpisodeAmount.toString()}
					/>
					<input bind:value={newAnimeName} class="animeInput" placeholder={data.animeName} />
					<input bind:value={newTranslatorName} class="animeInput" placeholder={data.translator} />
					<input bind:value={newEditorName} class="animeInput" placeholder={data.editor} />
					<input class="animeInput" value={data.releaseDate} type="datetime" />
					<button on:click={async () => HandleUpdates()}>Değişiklikleri Kaydet</button>
				</div>
			{/await}
		</div>
	{/key}
{/if}

<style>
	.drop-buttons {
		background-size: 70% 10% 100%;
		padding: 10px;
		background-position: center;
	}
	.animeInput {
		overflow: auto;
		padding: 1em;
		padding-top: 10px;
		border-radius: 0 15px 0 0;
		background-color: black;
		color: white;
	}
	.animepanel {
		position: relative;
		display: flex;
		flex-direction: column;
		max-width: 350px;
		padding-left: 30px;
		top: 10px;
		border-style: groove;
		align-self: center;
	}
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
	img {
		inline-size: 150px;
	}
</style>
