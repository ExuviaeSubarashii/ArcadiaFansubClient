<script lang="ts">
	import { onMount } from 'svelte';
	import {  GetAllAnimes } from '../../datas/animes/getanimes';
	import type { Animes } from '../../types/types';
	import AnimeComponent from '../../components/AnimeComponent.svelte';
	import OrderComponent from '../../components/OrderComponent.svelte';

	onMount(async () => {
		await GetAllAnimes();
	});
</script>
<AnimeComponent/>
<OrderComponent/>

