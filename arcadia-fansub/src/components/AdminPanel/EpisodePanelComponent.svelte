<script lang="ts">
	import { onMount } from 'svelte';
	import type { Animes } from '../../types/types';
	import { GetEpisodePanelData, exportedepisodes } from '../../datas/episodes/episodespanel';
	import { GetAllAnimes } from '../../datas/animes/getanimes';
	import { DeleteBulkEpisodeAsync, DeleteEpisode } from '../../datas/episodes/deletepisode';
	import { UpdateEpisode } from '../../datas/episodes/updateEpisode';
	import { writable } from 'svelte/store';
	import PopupModal from '../Modals/PopupModal.svelte';

	let paneldata: Animes[] = [];
	let currentAnime: any;
	let visiblediv: any = null;
	let episodeLinkInputVisibility: boolean = false;
	let episodeLinkValue: any;
	let episodeId: any;
	const episodeIdArray = writable<string[]>([]);
	let isModalVisible: boolean = false;
	onMount(async () => {
		paneldata = await GetAllAnimes();
	});
	async function HandleAnimeChange(animeId: string) {
		currentAnime = animeId;
		await GetEpisodePanelData(animeId);
		visiblediv = null;
		if (episodeLinkInputVisibility === true) {
			HandleUpdateVisibility();
		}
	}
	async function handleVisibility(index: any, paramepisodeId: any) {
		episodeId = paramepisodeId;
		visiblediv = visiblediv === index ? null : index;
		if (episodeLinkInputVisibility === true) {
			HandleUpdateVisibility();
		}
	}
	async function HandleEpisodeDeletion(episodeId: string) {
		await DeleteEpisode(episodeId, currentAnime);
		await GetEpisodePanelData(currentAnime);
		if (episodeLinkInputVisibility === true) {
			HandleUpdateVisibility();
		}
	}
	async function HandleUpdateVisibility() {
		episodeLinkInputVisibility = !episodeLinkInputVisibility;
		episodeLinkValue = null;
	}
	async function HandleEpisodeUpdate(episodeLinks: string) {
		await UpdateEpisode(episodeId, episodeLinks);
		if (episodeLinkInputVisibility === true) {
			HandleUpdateVisibility();
		}
	}
	function AddEpisodeIdsToRemove(e: any) {
		episodeIdArray.update((array) => {
			const index = array.indexOf(e.target.value);
			if (array.includes(e.target.value.trim())) {
				array.splice(index, 1);
				console.log(array);
			} else {
				array.push(e.target.value.trim());
				console.log(array);
			}
			return array;
		});
	}
	async function HandleBulkDelete() {
		if ($episodeIdArray.length > 0) {
			await DeleteBulkEpisodeAsync($episodeIdArray);
			window.location.href = '/addnew';
		} else {
			alert('Bölüm Seçilmelidir.');
		}
	}
</script>

<PopupModal bind:showModal={isModalVisible}>
	<div slot="header" class="modal-dialog">
		<h5 class="modal-title">Bölümleri Kaldır</h5>
	</div>
	<div slot="body" class="modal-content">
		<p>Bu Bölümler Kaldırılacaktır, Onaylıyor Musunuz?</p>
		<hr />
		{#each $episodeIdArray as id, i}
			<div class="selected-episodes">
				<p>{id}</p>
			</div>
		{/each}
		<button on:click={() => HandleBulkDelete()} class="btn btn-outline-danger">Sil</button>
	</div>
</PopupModal>
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

<div class="episodepanel">
	{#if $exportedepisodes !== undefined}
		{#key $exportedepisodes}
			{#each $exportedepisodes as data, index}
				<div class="episodes">
					<button class="editbutton" on:click={() => handleVisibility(index, data.episodeId)}
						>...</button
					>
					<p>{data.animeName}</p>
					<p>{data.episodeNumber}. Bölüm</p>
					<img
						src={`/src/lib/imajlar/${data.animeImage}`}
						class="img-fluid rounded-start"
						alt={data.animeImage}
					/>
					<input
						type="checkbox"
						value={data.episodeId}
						on:click={async (e) => await AddEpisodeIdsToRemove(e)}
						class="episode-selecter"
					/>

					{#if visiblediv === index}
						<div class="optionsdiv">
							<button on:click={() => HandleEpisodeDeletion(data.episodeId)}>Bölümü Kaldır</button>
							<button on:click={() => HandleUpdateVisibility()}>Bölümü Güncelle</button>
						</div>
					{/if}
				</div>
			{/each}
		{/key}
	{/if}
</div>

{#if episodeLinkInputVisibility === true}
	<div class="episode-update-panel">
		<input placeholder="Linklerin arasına virgül koyunuz." bind:value={episodeLinkValue} />
		{#if episodeLinkValue}
			<button on:click={() => HandleEpisodeUpdate(episodeLinkValue)}>Güncelle</button>
		{/if}
	</div>
{/if}
{#if $episodeIdArray.length > 0}
	<button
		class="delete-bulk-button"
		on:click={() => {
			isModalVisible = !isModalVisible;
		}}>Toplu Sil</button
	>
{/if}

<style>
	.episode-selecter {
		position: absolute;
		left: 90%;
		width: 30px;
		border-radius: 10px;
		background-color: #121212;
		color: white;
		padding: 1;
		left: 1%;
	}
	.selected-episodes {
		display: flex;
		max-width: 100px;
		flex-direction: column;
	}
	.drop-buttons {
		background-size: 70% 10% 100%;
		padding: 10px;
		background-position: center;
	}
	img {
		inline-size: 150px;
	}
	.episode-update-panel {
		position: relative;
		top: 50%;
		height: 776px;
		overflow-x: auto;
		white-space: nowrap;
	}
	.optionsdiv button:hover {
		background-color: gray;
		color: black;
	}
	.optionsdiv button,.delete-bulk-button {
		padding: 0.2em;
		border-radius: 10px;
		background-color: #121212;
		color: blueviolet;
		border-color: #121212;
		text-align: center;
		align-self: center;
	}
	.optionsdiv {
		display: flex;
		align-items: center;
		margin-top: 10px;
	}
	.editbutton {
		position: relative;
		left: 90%;
		width: 30px;
		border-radius: 10px;
		background-color: #121212;
		color: white;
		padding: 1;
	}
	.episodes {
		display: flex;
		flex-direction: column;
		border-radius: 15px;
		margin: 1em;
		padding: 1em;
		border-style: solid;
		position: relative;
	}
	.episodepanel {
		position: relative;
		top: 50%;
		overflow-x: scroll;
		height: 750px;
		white-space: nowrap;
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
</style>
