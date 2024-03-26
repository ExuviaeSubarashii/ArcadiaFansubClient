<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		GetEpisodesByPageQuery
	} from '../../../datas/episodes/getepisodes';
	import type { Episodes } from '../../../types/types';
	import EpisodesComponent from '../../../components/HomeContent/EpisodesComponent.svelte';

	export let data: PageData;
	let num = data.props.querydata.querynumber;
	let episodes: Episodes[] = [];
	
	onMount(async () => {
		episodes=await GetEpisodesByPageQuery(num);
	});
</script>
<EpisodesComponent episodes={episodes}/>
