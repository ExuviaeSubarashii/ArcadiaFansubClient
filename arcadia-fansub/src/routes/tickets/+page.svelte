<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { DeleteTicket, GetAllTickets, GetTicketByType } from '../../datas/tickets/tickets';
	import type { TicketDto } from '../../types/types';
	import currentUser from '../../datas/users/user';
	let ticketData: TicketDto[] = [];
	async function SortTickets(event: any) {
		ticketData = await GetTicketByType(event.target.value);
	}
	async function ResetTickets() {
		ticketData = await GetAllTickets();
	}
	async function HandleTicketDelete(ticketId: string) {
		await DeleteTicket(ticketId);
		ticketData = await GetAllTickets();
	}
	onMount(async () => {
		ticketData = await GetAllTickets();
	});
</script>

<div class="create-ticket">
	<a href="tickets/createticket" type="button" class="btn btn-info relative">Bilet Oluştur</a>
</div>
<div class="sort-tickets">
	<div>
		<label for="ticket">Bölüm Problemi</label>
		<input
			type="radio"
			name="ticket"
			value="Bölüm Problemi"
			on:click={(event) => SortTickets(event)}
		/>
	</div>
	<div>
		<label for="ticket">Kullanıcı Problemi</label>
		<input
			type="radio"
			name="ticket"
			value="Kullanıcı Sorunları"
			on:click={(event) => SortTickets(event)}
		/>
	</div>
	<div>
		<label for="ticket">Site Problemi</label>
		<input
			type="radio"
			name="ticket"
			value="Site Sorunları"
			on:click={(event) => SortTickets(event)}
		/>
	</div>
	<div>
		<button class="reset-button" on:click={() => ResetTickets()}>Sıfırla</button>
	</div>
</div>

<div class="tickets">
	{#await ticketData}
		<div>
			<h1>Loading...</h1>
		</div>
	{:then data}
		{#each data as ticket}
			<div class="ticket-body">
				{#if currentUser.userPermission === 'Admin'}
					<div class="ticket-options">
						<button class="delete-ticket" on:click={() => HandleTicketDelete(ticket.ticketId)}
							>Bileti Sil</button
						>
					</div>
				{/if}
				<div class="ticket-headers">
					<a href="tickets/{ticket.ticketId}" style="text-decoration: none; color:white;">
						<h1>{ticket.ticketTitle}</h1>
						<p>{ticket.ticketMessage}</p>
					</a>
				</div>
				<div class="ticket-user-information">
					<p>Bileti Açanın Adı: {ticket.senderName}</p>
					<p>Biletin Açılış Tarihi: {ticket.ticketDate}</p>
				</div>
				<div class="ticket-information">
					<p>Sebep: {ticket.ticketReason}</p>
					<p>Durum: {ticket.ticketStatus}</p>
				</div>
			</div>
		{/each}
	{/await}
</div>

<style>
	.create-ticket{
		position: absolute;
		left:28%;
	}
	.delete-ticket {
		position: relative;
		float: right;
	}
	.reset-button {
		background-color: black;
		color: beige;
		border-radius: 7px;
	}
	.sort-tickets {
		display: flex;
		flex-direction: row;
		color: white;
		position: relative;
		padding-left: 40em;
		top: 2%;
		gap: 10px;
	}

	.tickets {
		margin-top: 0.5em;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: scroll;
		color: antiquewhite;
	}
	.ticket-body {
		border: solid;
		border-color: white;
		padding: 2em;
		margin: 1em;
		border-radius: 15px;
	}
</style>
