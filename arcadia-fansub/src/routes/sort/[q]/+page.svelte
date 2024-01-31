<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		GetEpisodesByPageQuery
	} from '../../../datas/episodes/getepisodes';
	import OrderComponent from '../../../components/OrderComponent.svelte';
	import type { Episodes } from '../../../types/types';
	import HomeContentComponent from '../../../components/HomeContentComponent.svelte';

	export let data: PageData;
	let num = data.props.querydata.querynumber;
	let episodes: Episodes[] = [];
	
	onMount(async () => {
		episodes=await GetEpisodesByPageQuery(num);
	});
</script>

<HomeContentComponent episodes={episodes}/>
<OrderComponent />

