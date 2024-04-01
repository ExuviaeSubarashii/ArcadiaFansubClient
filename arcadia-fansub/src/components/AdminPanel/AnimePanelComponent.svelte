<script lang="ts">
	import { onMount } from 'svelte';
	import { GetAllAnimes, GetSpecificAnime } from '../../datas/animes/getanimes';
	import type { Animes, UpdateAnimeBody } from '../../types/types';
	import { writable } from 'svelte/store';
	import { GetAnimeProperties } from '../../datas/pages/animepage';
	import { UpdateAnimeFunction } from '../../datas/animes/updateAnime';
	import { IsNullOrEmpty } from '../../datas/emptychecker';
	import { DeleteAnime } from '../../datas/animes/deleteAnimes';
	import PopupModal from '../Modals/PopupModal.svelte';
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
	let isModalVisible: boolean = false;
	let newDescription:string;
	let selectedAnime: string;
	let isAnimePanelVisible:boolean=false;
	const animeData = writable<Animes>();
	onMount(async () => {
		paneldata = await GetAllAnimes();
	});
	async function HandleAnimeChange(animeId: string) {
		currentAnime = animeId;
		animeData.set(await GetAnimeProperties(animeId));
		visiblediv = null;
		newAnimeName = '';
		newTranslatorName = '';
		newEditorName = '';
		newReleaseDate = new Date();
		isAnimePanelVisible=!isAnimePanelVisible;
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
		if (
			IsNullOrEmpty(newEpisodeAmount) === true &&
			IsNullOrEmpty(newAnimeName.trim()) === true &&
			IsNullOrEmpty(newTranslatorName.trim()) === true &&
			IsNullOrEmpty(newEditorName.trim()) === true &&
			IsNullOrEmpty(newReleaseDate) === true
		) {
			return alert('En az bir alanın dolu olması gereklidir.');
		}
		const updateAnimeBody: UpdateAnimeBody = {
			animeId: currentAnime,
			newAnimeName: newAnimeName,
			newEpisodeAmount: newEpisodeAmount,
			newTranslatorName: newTranslatorName,
			newEditorName: newEditorName,
			newReleaseDate: newReleaseDate,
			newDescription:newDescription
		};
		animeData.set(await UpdateAnimeFunction(updateAnimeBody));
	}

	async function HandleAnimeDelete(animeId: string) {
		await DeleteAnime(animeId);
		paneldata = await GetAllAnimes();
		isModalVisible = !isModalVisible;
		isAnimePanelVisible=!isAnimePanelVisible;
	}
</script>

{#key isModalVisible}
	<PopupModal bind:showModal={isModalVisible}>
		<div slot="header" class="modal-dialog">
			<h5 class="modal-title">Seriyi Sil</h5>
		</div>
		<div slot="body" class="modal-content">
			<p>Silmek Istediginize Emin Misiniz?</p>
			<hr />
			<button on:click={() => HandleAnimeDelete(selectedAnime)}  class="btn btn-outline-danger">Sil</button>
		</div>
	</PopupModal>
{/key}

<div class="fullbody">
	<div class="buttoncontainer">
		<div class="row g-0">
			{#key paneldata}
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
			{/key}
		</div>
	</div>
</div>

{#if $animeData&&isAnimePanelVisible}
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
					<label for="animeName">Anime Adı</label>
					<input
						bind:value={newEpisodeAmount}
						class="animeInput"
						placeholder={data.animeEpisodeAmount.toString()}
					/>
					<label for="newAnimeName">Anime Adı</label>
					<input bind:value={newAnimeName} class="animeInput" placeholder={data.animeName} />
					<label for="newTranslatorName">Çevirmen</label>
					<input bind:value={newTranslatorName} class="animeInput" placeholder={data.translator} />
					<label for="newEditorName">Editör</label>
					<input bind:value={newEditorName} class="animeInput" placeholder={data.editor} />
					<label for="newReleaseDate">Yayın Tarihi</label>
					<input class="animeInput" value={data.releaseDate} type="datetime" />
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label>Açıklama</label>
						<textarea class="description-input" bind:value={newDescription} placeholder="{data.animeDescription}"/>
					<button on:click={async () => HandleUpdates()}>Değişiklikleri Kaydet</button>
					<button
						on:click={async () => {
							isModalVisible = !isModalVisible;
							selectedAnime = data.animeId;
						}}>Seriyi Sil</button
					>
				</div>
			{/await}
		</div>
	{/key}
{/if}

<style>
	.description-input{
		resize: both; 
        overflow: auto; 
        min-width: 100px; 
        max-height: 500px; 
		height: 300px;
        padding: 5px
	}
	.anime {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
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
		max-width: 650px;
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
