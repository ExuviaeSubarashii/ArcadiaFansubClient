<script lang="ts">
	import { onMount } from 'svelte';
	import ChangePageComponent from '../components/ChangePageComponent.svelte';
	import HomeContentComponent from '../components/HomeContentComponent.svelte';
	import OrderComponent from '../components/OrderComponent.svelte';
	import { GetAllEpisodes } from '../datas/episodes/getepisodes';
	onMount(async () => {
		await GetAllEpisodes();
	});
</script>
<form class="searchbar col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
	<input
		type="search"
		class="form-control form-control-dark text-bg-dark"
		placeholder="Search..."
		aria-label="Search"
		
	/>
</form>
<HomeContentComponent />
<footer>
	<OrderComponent />
</footer> 
