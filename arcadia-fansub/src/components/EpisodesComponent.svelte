<script lang="ts">
	import type { Episodes } from '../types/types';
	import OrderComponent from './OrderComponent.svelte';
	export let episodes: Episodes[] = [];
</script>

<div class="row gap-2 ms-5 g-0">
	<h1 class="text-light">Son Eklenenler</h1>
	{#await episodes}
		<h1>Yukleniyor</h1>
	{:then episodelist}
		{#key episodes}
			{#each episodelist as episode}
				<div class="bomba card mb-3 text-bg-dark border-5 rounded" style="max-width: 440px;">
					<a href="/video/{episode.episodeId}" class="text-decoration-none text-light">
						<div class="row g-0">
							<div class="col-md-4 mt-4">
								<!-- svelte-ignore a11y-missing-attribute -->

								<img
									src={`../src/lib/imajlar/${episode.animeImage}`}
									class="img-fluid rounded-start"
									alt={episode.animeImage}
								/>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">{episode.animeName} - {episode.episodeNumber}</h5>
									<p class="card-text">
										{episode.episodeLikes} Begeni
									</p>
									<p class="card-text">
										<small class="card-text">{episode.sortingDate}</small>
									</p>
								</div>
							</div>
						</div>
					</a>
					<!-- <div class="like-dislike">
						<button class="btn btn-light"><i class="bx bxs-heart"></i></button>
					</div> -->
				</div>
			{/each}
		{/key}
	{/await}
</div>
<footer>
	<OrderComponent />
</footer> 

<style>
	.bomba {
		border-radius: 25px;
		border-style: solid;
		border-width: 1px;
		border-image: linear-gradient(to right, rgb(192, 1, 156) 0%, rgb(84, 102, 184) 100%);
		border-image-slice: 1;
	}
	/* .like-dislike {
		position: absolute;
		left: 90%;
		top: 2%;
	}
	.btn-light i.bxs-heart {
		color: black;
		transition: color 0.3s ease;
	}
	.btn-light:hover i.bxs-heart {
		color: white;
	} */
	img {
		inline-size: 100px;
	}
</style>
