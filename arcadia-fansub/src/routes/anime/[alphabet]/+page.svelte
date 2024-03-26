<script lang="ts">
	import AnimeComponent from '../../../components/HomeContent/AnimeComponent.svelte';
	import { GetAnimeByAlphabet } from '../../../datas/animes/getanimes';
	import type { Animes } from '../../../types/types';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let letter = data.props.querydata.alphabet;

	let animes: Animes[] = [];
	onMount(async () => {
		animes = await GetAnimeByAlphabet(letter);
	});
</script>

{#await animes}
	<div>Seriler Yükleniyor...</div>
{:then animeData}
	<AnimeComponent animes={animeData} />
{/await}
