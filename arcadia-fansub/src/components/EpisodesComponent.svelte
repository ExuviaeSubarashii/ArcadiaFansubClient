<script lang="ts">
	import type { Episodes } from '../types/types';
	import OrderComponent from './OrderComponent.svelte';
	export let episodes: Episodes[] = [];
</script>

<div class="row gap-3 ms-4 g-0">
	<h1 class="text-light">Son Eklenenler</h1>
	{#await episodes}
		<h1>Yukleniyor</h1>
	{:then episodelist}
		{#key episodes}
			{#each episodelist as episode}
			<div class="episode" style="max-width: 275px;">
				<a href="/video/{episode.episodeId}" class="text-decoration-none text-light">
					<div class="col g-0">
						<div class="col">
							<!-- svelte-ignore a11y-missing-attribute -->
							<img
								src={`../src/lib/imajlar/${episode.animeImage}`}
								class="img-fluid rounded-start"
								alt={episode.animeImage}
							/>
						</div>
						<div class="col-md-8 ">
							<div class="card-body">
								<h1
									class="card-title"
									style="font-size:medium;"
								>
									{episode.animeName}
								</h1>
								<h1
									class="card-title"
									style="border: solid; text-align:center; border-color: gray; border-radius:20px;font-size:small;"
								>
									Bölüm: {episode.episodeNumber}
								</h1>
							</div>
						</div>
					</div>
				</a>
			</div>
			{/each}
		{/key}
	{/await}
</div>
<footer>
	<OrderComponent />
</footer>

<style>
	.episode {
		border-radius: 25px;
		border-style: solid;
		border-width: 5px;
		border-image: linear-gradient(to right, rgb(192, 1, 156) 0%, rgb(84, 102, 184) 100%);
		border-image-slice: 1;
		align-items: center;
		margin-bottom: 0.7rem;
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
		inline-size: 270px;
		max-width: 260px;
		max-height: 353px;
	}
</style>
