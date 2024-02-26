<script lang="ts">
	import { onMount } from 'svelte';
	import ChangePageComponent from '../components/ChangePageComponent.svelte';
	import HomeContentComponent from '../components/HomeContentComponent.svelte';
	import OrderComponent from '../components/OrderComponent.svelte';
	import { GetAllEpisodes, GetEpisodesByPageQuery } from '../datas/episodes/getepisodes';
	import type { Episodes } from '../types/types';
	export let episodes: Episodes[] = [];

	onMount(async () => {
		episodes=await GetEpisodesByPageQuery(1);
	});
</script>

<HomeContentComponent episodes={episodes}/>
<footer>
	<OrderComponent />
</footer> 
