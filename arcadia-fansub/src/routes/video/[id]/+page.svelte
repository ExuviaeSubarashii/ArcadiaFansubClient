<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type {
		Comments,
		CreateCommentBody,
		Episodes,
		UpdateCommentBody
	} from '../../../types/types';
	import { GetEpisodeVideo } from '../../../datas/episodes/getepisodevideo';
	import {
		CreateComment,
		DeleteComment,
		GetComments,
		UpdateComment
	} from '../../../datas/comments/comments';
	import currentUser from '../../../datas/users/user';
	import PopupModal from '../../../components/PopupModal.svelte';
	import UserComponent from '../../../components/UserComponent.svelte';
	import { IsAdmin, IsAuthenticated } from '../../../datas/users/authentication';
	import { IsNullOrEmpty } from '../../../datas/emptychecker';
	export let data: PageData;
	var episodeId = data.props.episodedata.episodeId;
	let episodeData: Episodes;
	let linkArray: string[] = [];
	let player: string;
	let commentData: Comments[] = [];
	let isAdmin: boolean = false;
	let visiblediv: any = null;
	let commentValue: string;
	let isOptionsVisible: boolean = false;
	let isModalVisible: boolean = false;

	let newCommentValue: string;

	const updateBody = {
		updateOldCommentValue: '',
		updateCommentId: 0
	};

	async function HandleComment() {
		if (IsNullOrEmpty(commentValue) === false) {
			let commentBody: CreateCommentBody = {
				episodeId: episodeId,
				commentContent: commentValue,
				userId: currentUser.userId,
				userName: currentUser.userName
			};

			await CreateComment(commentBody);
			commentData = await GetComments(episodeId);
			commentValue = '';
		}
	}
	let isSorted = false;

	async function HandleSorting() {
    isSorted = !isSorted;
    commentData = commentData.sort((a, b) => {
        if (isSorted) {
            return new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime();
        } else {
            return new Date(a.commentDate).getTime() - new Date(b.commentDate).getTime();
        }
    });
}

	onMount(async () => {
		episodeData = await GetEpisodeVideo(episodeId);
		if (episodeData && episodeData.episodeLinks) {
			linkArray = episodeData.episodeLinks.split(',');
		} else {
			console.error('Episode data or episodeLinks is undefined.');
		}
		isAdmin = await IsAdmin();
		commentData = await GetComments(episodeId);
	});

	async function SetPlayer(playerName: string) {
		player = playerName;
	}

	async function updateComment() {
		if (newCommentValue) {
			let commentBody: UpdateCommentBody = {
				newComment: newCommentValue,
				userId: currentUser.userId,
				commentId: updateBody.updateCommentId,
				userToken: currentUser.userToken
			};
			console.log(updateBody.updateCommentId);
			console.log(commentBody);
			await UpdateComment(commentBody);
			isModalVisible = false;
			commentData = await GetComments(episodeId);
			newCommentValue = '';
		}
	}
	function handleModal(commentId: number, oldCommentValue: string) {
		isModalVisible = !isModalVisible;
		updateBody.updateOldCommentValue = oldCommentValue;
		updateBody.updateCommentId = commentId;
	}
	async function deleteComment(commentId: number) {
		console.log(commentId);
		await DeleteComment(commentId);
		commentData = await GetComments(episodeId);
	}
</script>

<PopupModal bind:showModal={isModalVisible}>
	<div slot="header" class="modal-dialog">
		<h5 class="modal-title">Yorumunu Düzenle</h5>
	</div>
	<div slot="body" class="modal-content">
		<p>Eski Yorumun:{updateBody.updateOldCommentValue}</p>
		<hr />
		<input type="text" bind:value={newCommentValue} placeholder="Yeni Yorumunu Gir." />
		<button on:click={() => updateComment()}>Değişikliği Kaydet</button>
	</div>
</PopupModal>

<div class="col-sm-4">
	<div
		class="card d-flexbox align-items-center justify-content-center"
		style="position:absolute; top:30%;right:30%;"
	>
		{#key player}
			{#await episodeData}
				<p>loading...</p>
			{:then data}
				{#if data}
					<a href="/watch/{data.animeId}" style="text-decoration: none;"
						>{data.animeName} {data.episodeNumber}. Bölüm</a
					>
					<iframe src={player} height="422" width="654" title="Iframe"></iframe>
				{:else}
					<p>No Video</p>
				{/if}
			{/await}
		{/key}

		<div class="btn-group">
			{#each linkArray as link}
				<button
					type="button"
					on:click={() => SetPlayer(link)}
					class="btn btn-primary"
					style="width:50px; height:50px; text-align:center; overflow:hidden;">{link}</button
				>
			{/each}
		</div>
	</div>
</div>
<hr />
<div class="comments">
	<div class="comment-menu">
		{#await IsAuthenticated()}
			<div>Authenticating...</div>
		{:then result}
			{#if result === true}
				<input
					class="comment-input"
					type="text"
					placeholder="Yorum Yap"
					bind:value={commentValue}
				/>
				<button class="send-button" on:click={() => HandleComment()}>Yorum Yap</button>
				<button class="sort-button" on:click={() => HandleSorting()}>Sırala </button>
			{:else}
				<a href="/login" style="text-decoration: none; color:black;"
					>Yorum yapmak için giriş yapmalısınız.</a
				>
			{/if}
		{/await}
	</div>
	{#key commentData}
		{#await commentData}
			<div>Yorumlar Yükleniyor...</div>
		{:then data}
			{#if data.length > 0}
				{#each data as comment, index}
					<div class="comment" id={index.toString()}>
						<a href="/profile/{comment.userName}" style="text-decoration: none;"
							>{comment.userName}</a
						>
						<p>{comment.commentContent}</p>
						<p style="position:absolute; left:80%; top:70%">{comment.commentTextDate}</p>
						{#await isAdmin}
							<div>Checking if you are an admin...</div>
						{:then isAdminResult}
							{#if comment.isCommentOwner === true || isAdminResult === true}
								<div class="dropdown">
									<button
										class="btn btn-secondary dropdown-toggle"
										type="button"
										id="dropdownMenuButton"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
										on:click={() => {
											visiblediv = visiblediv === index ? null : index;
										}}
									>
										Actions
									</button>
									{#if visiblediv === index}
										<div class="actions" id={comment.commentId.toString()}>
											{#if comment.isCommentOwner === true}
												<button
													class="dropdown-item"
													on:click={() => handleModal(comment.commentId, comment.commentContent)}
													>Update comment</button
												>
												<button
													class="dropdown-item"
													on:click={() => deleteComment(comment.commentId)}>Delete comment</button
												>
											{/if}
											{#if isAdminResult === true}
												<button
													class="dropdown-item"
													on:click={() => deleteComment(comment.commentId)}
													>Admin Force Delete Comment</button
												>
											{/if}
										</div>
									{/if}
								</div>
							{/if}
						{/await}
					</div>
				{/each}
			{:else}
				<p>Yorum yok.</p>
			{/if}
		{/await}
	{/key}
</div>

<style>
	.sort-button {
		background-color: #121212;
		color: white;
		border-radius: 10px;
		border-color: #121212;
		position: absolute;
		left: 100%;
	}
	.send-button {
		background-color: #121212;
		color: white;
		border-radius: 10px;
		border-color: #121212;
		position: relative;
		right: 86%;
	}
	.comment-input {
		position: relative;
		right: 75%;
		width: 750px;
		height: 40px;
		border-radius: 10px;
		color: black;
	}
	.comment-menu {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		left: 40%;
		width: 950px;
		height: 50px;
		top: 7px;
	}
	.comments-label {
		position: absolute;
		top: 100%;
		left: 40%;
	}
	.comment {
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #121212;
		color: white;
		padding: 10px;
		border-radius: 10px;
		left: 0.2%;
	}
	.comments {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 90%;
		background-color: darkgray;
		width: 99%;
		gap: 10px 20px;
	}
</style>
