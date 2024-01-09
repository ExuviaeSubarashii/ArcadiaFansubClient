<script lang="ts">
	import { ExportedAnimeLists } from "../datas/animes/getanimes";
</script>
<div class="row gap-2 ms-5">
	<h1 class="text-light">Tüm Seriler</h1>
	{#each $ExportedAnimeLists as anime}
		<div class="card mb-3 text-bg-dark border-5 rounded border-secondary" style="max-width: 240px;">
			<a href="/watch/{anime.animeId}" class="text-decoration-none text-light">
				<div class="row g-0">
					<div class="col-md-4">
						<img src={`../src/lib/imajlar/${anime.animeImage}`??""} class="img-fluid rounded-start" alt="..." />
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">{anime.animeName}</h5>
							<p class="card-text"><small class="card-text">{anime.releaseDate}</small></p>
							<p class="card-text">
								<small class="card-text">{anime.translator}||{anime.editor}</small>
							</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>
<style>
	img {
		inline-size: 100px;

	}
</style>