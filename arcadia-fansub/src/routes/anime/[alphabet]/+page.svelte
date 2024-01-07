<script lang="ts">
	import AnimeComponent from '../../../components/AnimeComponent.svelte';
	import OrderComponent from '../../../components/OrderComponent.svelte';
	import { GetAllAnimes, GetAnimeByAlphabet } from '../../../datas/animes/getanimes';
    import type { PageData } from './$types';
	import { onMount } from 'svelte';
    
    export let data: PageData;
    let letter=data.props.querydata.alphabet;
    console.log(data.props.querydata.alphabet);
	onMount(async () => {
        await GetAnimeByAlphabet(letter);
	});
    </script>
<AnimeComponent/>
<OrderComponent/>