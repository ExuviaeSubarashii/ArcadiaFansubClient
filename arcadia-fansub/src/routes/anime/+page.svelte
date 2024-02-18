<script lang="ts">
	import AnimeComponent from '../../components/AnimeComponent.svelte';
	import OrderComponent from '../../components/OrderComponent.svelte';
	import { GetAllAnimes } from '../../datas/animes/getanimes';
</script>

{#await GetAllAnimes()}
	<div>Seriler Yükleniyor...</div>
{:then animeData}
	<AnimeComponent animes={animeData}/>
{/await}
<OrderComponent />
