<script lang="ts">
	import { onMount } from 'svelte';
	import ChangePageComponent from '../components/Layout/ChangePageComponent.svelte';
	import { GetAllEpisodes, GetEpisodesByPageQuery } from '../datas/episodes/getepisodes';
	import type { Episodes } from '../types/types';
	import EpisodesComponent from '../components/HomeContent/EpisodesComponent.svelte';
	// export let episodes: Episodes[] = [];
</script>
<EpisodesComponent offSet={1}/>
