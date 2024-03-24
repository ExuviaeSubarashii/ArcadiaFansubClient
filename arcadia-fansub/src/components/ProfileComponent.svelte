<script lang="ts">
	import { onMount } from 'svelte';
	import type { Animes, Comments, UserProfile } from '../types/types';
	import { GetUserProfile } from '../datas/users/profile';
	import { AddAnimeToFavorites, GetSpecificAnime } from '../datas/animes/getanimes';
	import AnimeComponent from './AnimeComponent.svelte';
	import { DeleteComment, GetUserComments } from '../datas/comments/comments';
	import PopupModal from './PopupModal.svelte';
	import { IsAuthenticated } from '../datas/users/authentication';
	export let userName: string;
	let userData: UserProfile;
	let userFavoritedAnimes: string[] = [];
	let favoritedAnimes: Animes[] = [];
	let userComments: Comments[] = [];
	let currentlyLoadedAnimeAmount = 5;
	let currentlyLoadedCommentAmount = 5;
	let isModalVisible: boolean = false;
	let selectedComment: number;
	onMount(async () => {
		userData = await GetUserProfile(userName);
		userFavoritedAnimes = userData.favoritedAnimes.split(',');
		if (userFavoritedAnimes.length > 0) {
			favoritedAnimes = await GetSpecificAnime(userFavoritedAnimes);
		}
		userComments = await GetUserComments(userName);
	});
	async function deleteComment(commentId: number) {
		await DeleteComment(commentId);
		userComments = await GetUserComments(userName);
	}
	let isEpisodeSorted: boolean = false;

	async function SortFavoritedAnimesByEpisodeAmount() {
		if (isEpisodeSorted === true) {
			favoritedAnimes = favoritedAnimes.sort((a, b) => {
				return a.animeEpisodeAmount - b.animeEpisodeAmount;
			});
		} else {
			favoritedAnimes = favoritedAnimes.sort((a, b) => {
				return b.animeEpisodeAmount - a.animeEpisodeAmount;
			});
		}
		isEpisodeSorted = !isEpisodeSorted;
	}

	async function HandleCommentDeletion() {
		await deleteComment(selectedComment);
		isModalVisible = !isModalVisible;
	}
</script>

{#key isModalVisible}
	<PopupModal bind:showModal={isModalVisible}>
		<div slot="header" class="modal-dialog">
			<h5 class="modal-title">Yorumunu Düzenle</h5>
		</div>
		<div slot="body" class="modal-content">
			<p>Silmek Istediginize Emin Misiniz?</p>
			<hr />
			<button on:click={() => HandleCommentDeletion()}>Sil</button>
		</div>
	</PopupModal>
{/key}

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
	<div class="user-comments">
		{#if userComments.length > 0}
			{#await userComments}
				<div>Yorumlar Yukleniyor</div>
			{:then commentData}
				{#key currentlyLoadedCommentAmount}
					{#each commentData.slice(0, currentlyLoadedCommentAmount) as comment}
						<div class="comment">
							<p>{comment.commentContent}</p>
							<p>{comment.commentTextDate}</p>
							{#if comment.isCommentOwner === true}
								<button
									class="dropdown-item"
									on:click={() => {
										isModalVisible = !isModalVisible;
										selectedComment = comment.commentId;
									}}>Yorumu Kaldir</button
								>
							{/if}
						</div>
					{/each}
					{#if commentData.length > 5}
						{#if currentlyLoadedCommentAmount < commentData.length}
							<button
								on:click={() => {
									if (currentlyLoadedCommentAmount >= commentData.length) {
										return;
									} else {
										currentlyLoadedCommentAmount += 5;
									}
								}}>Daha Fazla Goster</button
							>
						{/if}
						{#if currentlyLoadedCommentAmount > 5}
							<button
								on:click={() => {
									if (currentlyLoadedCommentAmount === 5) {
										return;
									} else if (currentlyLoadedCommentAmount > 5) {
										currentlyLoadedCommentAmount -= 5;
									}
								}}>Daha Az Goster</button
							>
						{/if}
					{/if}
				{/key}
			{/await}
		{:else}
			<div>Bu kullanici daha yorum yazmamis.</div>
		{/if}
	</div>
	<div class="favorited-series">
		{#if favoritedAnimes.length > 0}
			<button on:click={async () => await SortFavoritedAnimesByEpisodeAmount()}
				>Sort By Episode Amount</button
			>
		{/if}
		{#key favoritedAnimes}
			{#if favoritedAnimes.length > 0}
				{#await favoritedAnimes}
					<div>Favorilenmis Seriler Yukleniyor...</div>
				{:then animeData}
					{#key currentlyLoadedAnimeAmount}
						{#each animeData.slice(0, currentlyLoadedAnimeAmount) as anime}
							<div
								class="series"
								style="background-image: url('../src/lib/imajlar/{anime.animeImage}')"
							>
								<div class="like-dislike">
									<!-- check if favorited or not -->
									{#if anime.isFavorited === true}
										<!-- favorites -->
										<button
											title="Favorilerden Kaldır"
											on:click={async () => {
												if ((await IsAuthenticated()) === true) {
													await AddAnimeToFavorites(anime.animeId);
												} else {
													window.location.href = '/login';
												}
											}}
											class="btn btn-light"><i class="bx bxs-bookmark"></i></button
										>
									{:else}
										<!-- unfavorites -->
										<button
											title="Favorilere Ekle"
											on:click={async () => {
												if ((await IsAuthenticated()) === true) {
													await AddAnimeToFavorites(anime.animeId);
												} else {
													window.location.href = '/login';
												}
											}}
											class="btn btn-light"><i class="bx bx-bookmark"></i></button
										>
									{/if}
								</div>
								<a href="/watch/{anime.animeId}" style="color:white; text-decoration:none;">
									<p>Seri Adı: {anime.animeName}</p>
									<p>Bölüm Sayısı: {anime.animeEpisodeAmount}</p>
									<p>Editör: {anime.editor} | Çevirmen: {anime.translator}</p>
									<p>Çıkış Tarihi: {anime.releaseDate}</p>
								</a>
							</div>
						{/each}
					{/key}

					{#if animeData.length > 5}
						<button
							on:click={() => {
								if (currentlyLoadedAnimeAmount >= animeData.length) {
									return;
								} else {
									currentlyLoadedAnimeAmount += 5;
								}
							}}>Daha Fazla Goster</button
						>
						{#if currentlyLoadedAnimeAmount > 5}
							<button
								on:click={() => {
									if (currentlyLoadedAnimeAmount === 5) {
										return;
									} else if (currentlyLoadedAnimeAmount > 5) {
										currentlyLoadedAnimeAmount -= 5;
									}
								}}>Daha Az Goster</button
							>
						{/if}
					{/if}
				{/await}
			{:else}
				<div>
					<p>Henüz favori seri bulunmamaktadır.</p>
				</div>
			{/if}
		{/key}
	</div>
</div>

<style>
	.user-comments {
		margin-top: 20px; /* Add margin to separate from other content */
	}

	/* New styles for .comment */
	.comment {
		border: 1px solid #ccc; /* Border for each comment */
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 10px; /* Adjust spacing between comments */
	}

	.comment p {
		margin: 5px 0; /* Add margin to paragraph elements within comments */
	}

	.comment button {
		background-color: blue; /* Button background color */
		color: white; /* Button text color */
		border: none;
		padding: 5px 10px;
		border-radius: 3px;
		cursor: pointer;
	}

	.comment button:hover {
		background-color: darkblue; /* Button background color on hover */
	}
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
		height: 200px; /* Set height for the series container */
	}
</style>
