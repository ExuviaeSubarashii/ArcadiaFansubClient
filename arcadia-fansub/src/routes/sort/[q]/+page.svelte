<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		ExportedEpisodeLists,
		GetEpisodesByPageQuery
	} from '../../../datas/episodes/getepisodes';
	import OrderComponent from '../../../components/OrderComponent.svelte';
	import type { Episodes } from '../../../types/types';
	import HomeContentComponent from '../../../components/HomeContentComponent.svelte';

	export let data: PageData;
	let num = data.props.querydata.querynumber;
	let episodes: Episodes[] = [];
	onMount(async () => {
		await GetEpisodesByPageQuery(num);
		console.log(num);
	});
</script>


<!-- <div class="row gap-3 ms-5">
	<h1 class="text-light">Son Eklenenler</h1>
	{#key $ExportedEpisodeLists}
		{#each $ExportedEpisodeLists as episode}
			<div
				class="card mb-3 text-bg-dark border-5 rounded border-secondary"
				style="max-width: 540px;"
			>
				<a href="video/{episode.episodeId}" class="text-decoration-none text-light">
					<div class="row g-0">
						<div class="col-md-4">
							<img src={`src/lib/imajlar/${episode.animeImage}`} class="img-fluid rounded-start" alt="..." />
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<h5 class="card-title">{episode.animeName} - {episode.episodeNumber}</h5>
								<p class="card-text">
									{episode.episodeLikes} Begeni
								</p>
								<p class="card-text">
									<small class="card-text">{episode.episodeUploadDate}</small>
								</p>
							</div>
						</div>
					</div>
				</a>
			</div>
		{/each}
	{/key}
</div> -->
<HomeContentComponent/>
<OrderComponent />

<style>
	/* img {
		inline-size: 150px;
	} */
</style>
