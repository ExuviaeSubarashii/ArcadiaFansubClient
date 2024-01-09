<script lang="ts">
	import { onMount } from 'svelte';
	import { ExportedEpisodeLists, GetAllEpisodes } from '../datas/episodes/getepisodes';
</script>

<div class="row gap-2 ms-5">
	<h1 class="text-light">Son Eklenenler</h1>
	{#key $ExportedEpisodeLists}
		{#each $ExportedEpisodeLists as episode}
			<div
				class="card mb-3 text-bg-dark border-5 rounded border-secondary"
				style="max-width: 240px;"
			>
				<a href="/video/{episode.episodeId}" class="text-decoration-none text-light">
					<div class="row g-0">
						<div class="col-md-4">
							<!-- svelte-ignore a11y-missing-attribute -->
							<img
								src={`../src/lib/imajlar/${episode.animeImage}`}
								class="img-fluid rounded-start"
								alt={episode.animeImage}
							/>
						</div>
						<div class="col-md-9">
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
				<div class="like-dislike">
					<button class="btn btn-light"><i class="bx bxs-heart"></i></button>
				</div>
			</div>
		{/each}
	{/key}
</div>

<style>
	.like-dislike{
		position: absolute;
		left: 80%;
		top: 2%;
	}
	.btn-light i.bxs-heart {
		color: black;
		transition: color 0.3s ease;
	}
	.btn-light:hover i.bxs-heart {
		color: white;
	}
	img {
		inline-size: 150px;
	}
</style>
