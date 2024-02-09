<script lang="ts">
	import { onMount } from 'svelte';
	import type { Animes, UserProfile } from '../types/types';
	import { GetUserProfile } from '../datas/users/profile';
	import { GetSpecificAnime } from '../datas/animes/getanimes';
	import AnimeComponent from './AnimeComponent.svelte';

	export let userName: string;
	let userData: UserProfile;
	let userFavoritedAnimes: string[] = [];
	let favoritedAnimes: Animes[] = [];
	let currentlyLoadedAmount = 5;
	onMount(async () => {
		console.log('started');
		userData = await GetUserProfile(userName);
		userFavoritedAnimes = userData.favoritedAnimes.split(',');
		if (userFavoritedAnimes.length > 0) {
			favoritedAnimes = await GetSpecificAnime(userFavoritedAnimes);
		}
	});
</script>

<div class="fullbody">
	<div class="user-body">
		{#if userData}
			{#await userData}
				<div>Loading user data...</div>
			{:then data}
				<div class="user">
					<p>User Email: {data.userEmail}</p>
					<p>User Name: {data.userName}</p>
					<p>User Permission: {data.userPermission}</p>
				</div>
			{:catch error}
				<p>Error: {error.message}</p>
			{/await}
		{/if}
	</div>
	<!-- yorumlar -->
	<div class="favorited-series">
		{#if favoritedAnimes}
			{#await favoritedAnimes}
				<div>Favorilenmis Seriler Yukleniyor...</div>
			{:then animeData}
				{#key currentlyLoadedAmount}
					{#each animeData.slice(0, currentlyLoadedAmount) as anime}
						<div
							class="series"
							style="background-image: url('../src/lib/imajlar/{anime.animeImage}')"
						>
							<p>{anime.animeName}</p>
							<p>{anime.animeEpisodeAmount}</p>
							<p>{anime.editor} | {anime.translator}</p>
							<p>{anime.releaseDate}</p>
						</div>
					{/each}
				{/key}
				{#if animeData.length > 5}
					<button on:click={() => (currentlyLoadedAmount += 5)}>Daha Fazla Goster</button>
					{#if currentlyLoadedAmount>5}
					<button on:click={() => {
						if(currentlyLoadedAmount===5){
							return;
						}
						else if(currentlyLoadedAmount>5){
							currentlyLoadedAmount -= 5;
						}
					}}>Daha Az Goster</button>
					{/if}
				{/if}
			{/await}
		{:else}
			<div>
				<p>Henüz favori seri bulunmamaktadır.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.fullbody {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-style: solid;
		border-radius: 20px;
		color: white;
	}

	.user-body {
		width: 30%;
		padding: 20px;
		box-sizing: border-box;
	}

	.favorited-series {
		width: 65%;
		overflow: auto;
		max-height: 50%;
		padding: 2em;
		box-sizing: border-box;
	}

	/* Adjust styling as needed */
	.user {
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 5px;
		height: 100%;
	}

	.series {
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 7px; /* Adjust spacing between series */
		background-size: 70% 10% 100%; /* Make the background image stretch to fill the container */
		background-repeat: no-repeat;
		background-position: right;
		width: 100%; /* Set width to fill the container */
		height: 150px; /* Set height for the series container */
	}
</style>
