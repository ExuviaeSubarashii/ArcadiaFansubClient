<script lang="ts">
	import { onMount } from 'svelte';
	import {  GetAllAnimes } from '../../datas/animes/getanimes';
	import type { Animes } from '../../types/types';
	import AnimeComponent from '../../components/AnimeComponent.svelte';

	onMount(async () => {
		await GetAllAnimes();
	});
</script>
<AnimeComponent/>

