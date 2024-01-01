<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Animes, Episodes } from '../../types/types';
	import { GetAnimeEpisodes, GetAnimeProperties } from '../../datas/pages/animepage';
	export let data: PageData;
	let name = data.props.animedata.animename;
	console.log(name);
	let animedata: Animes | null;
	let episodedata: Episodes[] = [];
	onMount(async () => {
		const returnedAnimedata = await GetAnimeProperties(name);
		const returnedEpisodesdata = await GetAnimeEpisodes(name);

		if (returnedAnimedata) {
			animedata = returnedAnimedata;
			episodedata = returnedEpisodesdata;
		}
	});
</script>

<div class="information-card">
	<div class="card-body">
		<h5 class="card-title">{animedata?.animeName}</h5>
		<img src={animedata?.animeImage} alt="captura" />
		<p>Çevirmen: {animedata?.translator} || Editör:{animedata?.editor}</p>
	</div>
</div>

{#each episodedata as episode}
	<div class="episode-group">
		<a href="/video/{episode.episodeId}" class="group-anchor" aria-current="true">
			<div>
				<h5 class="episode-information">{episode.animeName} - {episode.episodeNumber}. Bölüm</h5>
			</div>
		</a>
	</div>
{/each}

<style>
	.episode-group {
		border-color: #914747;
		border-style: solid;
		width: 290px;
		height: 30px;
		position: relative;
		width: 18rem;
		top: 20%;
		left: 43%;
		text-align: center;
		border-radius: 10px;
	}
	.group-anchor {
		text-decoration: none;
	}
	.episode-information {
		color: #891b8c;
	}
	.information-card {
		display: flex;
		border-color: #891b8c;
		border-radius: 10px;
		overflow: auto;
		text-align: center;
		border-style: solid;
		color: white;
		position: relative;
		width: 18rem;
		top: 10%;
		left: 43%;
	}
</style>
