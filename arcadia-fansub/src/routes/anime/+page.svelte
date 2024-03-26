<script lang="ts">
	import AnimeComponent from '../../components/HomeContent/AnimeComponent.svelte';
	import { GetAllAnimes } from '../../datas/animes/getanimes';
</script>

{#await GetAllAnimes()}
	<div>Seriler Yükleniyor...</div>
{:then animeData}
	<AnimeComponent animes={animeData}/>
{/await}
