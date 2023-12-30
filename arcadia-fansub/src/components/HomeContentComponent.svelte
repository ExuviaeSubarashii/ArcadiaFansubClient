<script lang="ts">
	import Volume_1 from '../Volume_1.png';
	import Volume_8 from '../Volume_8.png';
	import Volume_17 from '../Volume_17.png';
	import { onMount } from 'svelte';
	import { ExportedEpisodeLists, GetAllEpisodes } from '../datas/episodes/getepisodes';
	onMount(async()=>{
		await GetAllEpisodes();
	})
</script>

<div class="row gap-4 ms-5">
	<h1 class="text-light">Latest Update</h1>
	{#each $ExportedEpisodeLists as episode}
		
	<div class="card mb-3 text-bg-dark border-5 rounded border-secondary" style="max-width: 540px;">
		<a href="video/{episode.episodeId}" class="text-decoration-none text-light">
			<div class="row g-0">
				<div class="col-md-4">
					<img src={episode.episodeImage} class="img-fluid rounded-start" alt="..." />
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5 class="card-title">{episode.animeName} - {episode.episodeNumber}</h5>
						<p class="card-text">
							{episode.episodeLikes} Begeni
						</p>
						<p class="card-text"><small class="card-text">{episode.episodeUploadDate}</small></p>
					</div>
				</div>
			</div>
		</a>
	</div>

	
	{/each}
</div>

<style>
	img {
		inline-size: 150px;
	}
</style>
