<script lang="ts">
	import { onMount } from 'svelte';
	import { ExportedEpisodeLists, GetAllEpisodes } from '../datas/episodes/getepisodes';
	onMount(async()=>{
		await GetAllEpisodes();
	})
</script>

<div class="row gap-2 ms-5">
	<h1 class="text-light">Son Eklenenler</h1>
	{#key $ExportedEpisodeLists}
	{#each $ExportedEpisodeLists as episode}
	<div class="card mb-3 text-bg-dark border-5 rounded border-secondary" style="max-width: 540px;">
		<a href="video/{episode.episodeId}" class="text-decoration-none text-light">
			<div class="row g-0">
				<div class="col-md-3">
					<img src={episode.episodeImage} class="img-fluid rounded-start" alt="..." />
				</div>
				<div class="col-md-9">
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
	{/key}
</div>

<style>
	img {
		inline-size: 150px;
	}
</style>
