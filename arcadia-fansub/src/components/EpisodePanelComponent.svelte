<script lang="ts">
	import { onMount } from 'svelte';
	import type { Animes, Episodes } from '../types/types';
	import { GetEpisodePanelData } from '../datas/episodes/episodespanel';
	import { GetAllAnimes } from '../datas/animes/getanimes';
	let paneldata: Animes[] = [];
	onMount(async () => {
		paneldata = await GetAllAnimes();
	});
</script>
	<div class="container-fluid d-flex justify-content-center align-items-center" style="height: 100vh;">
		<div class="row">
			{#each paneldata as data}
			<select class="m-5 p-2 text-center">
				<option class="option">{data.animeName}</option>
			</select>
			{/each}
		</div>
	</div>
  

<style>
	
</style>