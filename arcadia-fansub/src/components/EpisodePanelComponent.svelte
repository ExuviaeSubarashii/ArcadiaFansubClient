<script lang="ts">
	import { onMount } from 'svelte';
	import type { Animes, Episodes } from '../types/types';
	import { GetEpisodePanelData } from '../datas/episodes/episodespanel';
	import { GetAllAnimes } from '../datas/animes/getanimes';
	let paneldata: Animes[] = [];
	onMount(async () => {
		paneldata = await GetAllAnimes();
	});
	let episodedata: Episodes[] = [];
	async function HandleAnimeChange(animeId: string) {
		episodedata = await GetEpisodePanelData(animeId);
		visiblediv=null;
	}
	let visiblediv: any = null;
	function handleVisibility(index: any) {
		console.log(index);
		visiblediv = visiblediv === index ? null : index;
	}
</script>

<div class="fullbody">
	<div class="buttoncontainer">
		<div class="row">
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
<div class="episodepanel">
	{#if episodedata !== undefined}
		{#key episodedata}
			{#each episodedata as data, index}
				<div class="episodes">
					<button class="editbutton" on:click={() => handleVisibility(index)}>...</button>
					<p>{data.animeName}</p>
					<p>{data.episodeNumber}. Bolum</p>
					<p>{data.episodeUploadDate}</p>
					<img src={data.episodeImage} alt="{data.animeName}_image" />
					{#if visiblediv === index}
					<div class="optionsdiv">
						<button>Delete Episode</button>
					</div>
				{/if}
				</div>
				
			{/each}
		{/key}
	{/if}
</div>

<style>
	.optionsdiv button:hover{
		background-color: gray;
		color:black;
	}
	.optionsdiv button{
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
		height: 776px;
		overflow-x: auto;
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
