<script lang="ts">
	import { onMount } from "svelte";
	import type { Episodes } from "../../types/types";
	import OrderComponent from "../Layout/OrderComponent.svelte";
	import { GetEpisodesByPageQuery } from "../../datas/episodes/getepisodes";

	let episodes: Episodes[] = [];
	export let offSet:number|null;
	onMount(async () => {
		episodes=await GetEpisodesByPageQuery(offSet);
	});
</script>

<div class="row mt-0 g-0 ms-5">
	<h1 class="text-light">Son Eklenenler</h1>
	{#await episodes}
		<h1>Yukleniyor</h1>
	{:then episodelist}
		{#key episodes}
			{#each episodelist as episode}
				<div class="episode">
					<a href="/video/{episode.episodeId}" class="text-decoration-none text-light">
						<div class="image col g-0">
							<img src={`../src/lib/imajlar/${episode.animeImage}`} alt={episode.animeImage} />
						</div>
						<div class="col-md-8">
							<div class="episode-info">
								<h2 class="anime-name">
									{episode.animeName}
								</h2>
								<span class="episode-number">
									{episode.episodeNumber}. Bölüm
								</span>
							</div>
						</div>
					</a>
					<p class="episode-date">{episode.sortingDate}</p>
				</div>

			{/each}
		{/key}
	{/await}
</div>
<footer>
	<OrderComponent />
</footer>

<style>
	.anime-name,
	.episode-info {
		font-family: Roboto, sans-serif !important;
		font-size: 0.875rem !important;
		font-weight: 500;
		line-height: 1.375rem;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		margin-top: 8px;
		overflow: hidden;
		word-break: break-all;
		-webkit-text-size-adjust: 100%;
		tab-size: 4;
		-webkit-font-smoothing: antialiased;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		text-rendering: optimizeLegibility;
		--primary-color: #fdd835;
		--primary-color-transparent: rgba(253, 216, 53, 0);
		color: #fff;
		background-repeat: no-repeat;
		box-sizing: inherit;
		position: relative;
		margin-left: 4%;
	}
	.episode-number,
	.episode-date {
		-webkit-text-size-adjust: 100%;
		tab-size: 4;
		word-break: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		text-rendering: optimizeLegibility;
		--primary-color: #fdd835;
		--primary-color-transparent: rgba(253, 216, 53, 0);
		font-family: Roboto, sans-serif;
		box-sizing: inherit;
		margin: 0;
		align-items: center;
		cursor: default;
		display: inline-flex;
		line-height: 30px;
		max-width: 100%;
		outline: none;
		overflow: hidden;
		padding: 0 12px;
		position: relative;
		text-decoration: none;
		transition-duration: 0.28s;
		transition-property: box-shadow, opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		vertical-align: middle;
		white-space: nowrap;
		border-radius: 4px !important;
		margin-right: 4px !important;
		padding-left: 8px !important;
		padding-right: 8px !important;
		border-color: hsla(0, 0%, 100%, 0.12);
		color: #fff;
		border-style: solid;
		border-width: thin;
		font-size: 14px;
		height: 19px;
		background: #555;
		background-color: transparent !important;
		position: relative;
		margin-left: 6%;
	}
	.episode {
		-webkit-text-size-adjust: 100%;
		tab-size: 4;
		word-break: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-size: 16px;
		text-rendering: optimizeLegibility;
		--primary-color: #fdd835;
		--primary-color-transparent: rgba(253, 216, 53, 0);
		font-family: Roboto, sans-serif;
		line-height: 1.5;
		color: #fff;
		background-repeat: no-repeat;
		box-sizing: inherit;
		margin: 0;
		padding: 12px;
		max-width: 275px;
	}
	img {
		display: block;
		margin: auto;
		max-width: 230px;
	}
</style>
