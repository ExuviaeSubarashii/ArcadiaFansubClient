<script lang="ts">
	import { onMount } from 'svelte';
	import ChangePageComponent from '../components/ChangePageComponent.svelte';
	import HomeContentComponent from '../components/HomeContentComponent.svelte';
	import OrderComponent from '../components/OrderComponent.svelte';
	import { GetAllEpisodes } from '../datas/episodes/getepisodes';
	let searchParameter:string='';
</script>
<form class="searchbar col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
	<input
		class="form-control form-control-dark text-bg-light border-3 border-info p-3 "
		placeholder="Ara"
		bind:value={searchParameter}
		on:keypress={e => {
			if (e.key === 'Enter') {
				window.location.href=`/anime/${searchParameter}`;
			}
		}}
	/>
</form>
<HomeContentComponent />
<footer>
	<OrderComponent />
</footer> 
