<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CreateAdminResponse,
		DeleteAdminResponse,
		GetSpecificTickets,
		GetTicketReplies,
		UpdateTicketStatus
	} from '../../../datas/tickets/tickets.js';
	import type { AdminResponse, TicketDto, TicketReply } from '../../../types/types.js';
	import currentUser from '../../../datas/users/user.js';

	export let data;
	let userTicketMessage: TicketDto;
	let adminTicketReplies: TicketReply[] = [];
	let ticketId = data.props.ticketdata.ticketnumber;
	onMount(async () => {
		userTicketMessage = await GetSpecificTickets(ticketId);
		adminTicketReplies = await GetTicketReplies(ticketId);
	});
	let adminResponse: string;
	let ticketStatus: string;
	async function HandleAdminResponse() {
		const responseBody: AdminResponse = {
			adminName: currentUser.userName,
			adminReply: adminResponse,
			ticketId: ticketId
		};
		if (Object.values(responseBody).some((value) => value === null || value === undefined)) {
			console.error(
				'responseBody contains null or undefined values. Aborting CreateAdminResponse.'
			);
			return;
		}

		await CreateAdminResponse(responseBody);
		adminTicketReplies = await GetTicketReplies(ticketId);
	}
	function HandleStatusChange(event: any) {
		ticketStatus = event.target.value;
	}


	async function DeleteAdminResponseHandle(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }): Promise<any> {
		const inputValue=(e.target as HTMLInputElement)?.value;
		await DeleteAdminResponse(inputValue);
		adminTicketReplies = await GetTicketReplies(ticketId);

	}
</script>

{#await GetSpecificTickets(ticketId)}
	<div>Loading...</div>
{:then ticketmessage}
	<div class="user-ticket">
		<div class="post-info">
			<h1>{ticketmessage.ticketTitle}</h1>
			<p>{ticketmessage.ticketMessage}</p>
		</div>
		<div class="ticket-info">
			<p>{ticketmessage.senderName}</p>
			<p>{ticketmessage.ticketReason}</p>
			<p>{ticketmessage.ticketDate}</p>
			<p>{ticketmessage.ticketStatus}</p>
		</div>
	</div>
{/await}
{#if currentUser.userPermission === 'Admin'}
	<div class="admin-reply">
		<div class="ticket-status">
			<input class="admin-input" type="text" bind:value={adminResponse} />

			<label for="completed">
				<input
					type="radio"
					id="completed"
					name="status"
					value="Tamamlandı"
					on:click={(e) => HandleStatusChange(e)}
				/>
				Tamamlandı
			</label>

			<label for="examining">
				<input
					type="radio"
					id="examining"
					name="status"
					value="İncelenecek"
					on:click={(e) => HandleStatusChange(e)}
				/>
				İncelenecek
			</label>

			<label for="progress">
				<input
					type="radio"
					id="progress"
					name="status"
					value="Yapım Aşamasında"
					on:click={(e) => HandleStatusChange(e)}
				/>
				Yapım Aşamasında
			</label>

			<button on:click={() => HandleAdminResponse()}>Kaydet ve Gönder</button>
			{#if ticketStatus}
				<button
					on:click={() => {
						UpdateTicketStatus(ticketStatus, ticketId);
					}}>Durumu Guncelle</button
				>
			{/if}
		</div>
	</div>
{/if}
{#await adminTicketReplies}
	<div>Yanitlar Yukleniyor</div>
{:then replies}
	<div class="replies">
		{#each replies as reply}
			<div class="reply">
				<button value="{reply.responseId}" on:click={(e)=>DeleteAdminResponseHandle(e)} class="delete-button">Delete</button>
				<p>{reply.ticketAdminName}</p>
				<p>{reply.ticketReply}</p>
				<p>{reply.ticketReplyDate}</p>
			</div>
		{/each}
	</div>
{/await}

<style>
	.delete-button {
		position: absolute;
		float: right;
		border-radius: 5px;
		background-color: navy;
		background: linear-gradient(to right, rgb(109, 92, 106), rgb(84, 102, 184));
		margin: 0;
		color: black;
	}
	.admin-input {
		border-radius: 15px;
		background-color: transparent;
		color: wheat;
		width: 100%;
	}
	.ticket-status {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.admin-reply {
		background-color: transparent;
		color: white;
		border-radius: 15px;
		border: 2px solid white;
		width: 750px;
		margin: 3em auto;
		padding: 1em;
	}
	.reply {
		padding: 1em;
		display: flex;
		text-align: start;
		flex-direction: column;
		border-radius: 15px;
		position: relative;
		border-style: solid;
		margin: 0.5em;
	}
	.replies {
		border-style: solid;
		color: white;
		display: flex;
		flex-direction: column;
		border-radius: 15px;
		position: relative;
		margin: 2em;
	}
	.post-info {
		border-style: solid;
		border-radius: 10px;
		text-align: center;
	}
	.ticket-info {
		text-align: center;
		margin-top: 3em;
		border-style: solid;
		border-radius: 10px;
	}
	.user-ticket {
		position: relative;
		top: 10%;
		padding: 20px;
		margin: 0.5em;
		display: block;
		border-style: solid;
		border-color: #3a2424;
		border-radius: 10px;
		color: white;
	}
</style>
