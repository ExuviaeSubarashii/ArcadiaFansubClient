<script lang="ts">
	import { onMount } from 'svelte';
	import ChangePageComponent from '../components/ChangePageComponent.svelte';
	import HomeContentComponent from '../components/HomeContentComponent.svelte';
	import OrderComponent from '../components/OrderComponent.svelte';
	import { GetAllEpisodes } from '../datas/episodes/getepisodes';
</script>

<HomeContentComponent />
<footer>
	<OrderComponent />
</footer> 
