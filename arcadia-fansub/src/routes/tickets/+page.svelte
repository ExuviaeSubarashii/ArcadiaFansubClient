<script lang="ts">
	import { onMount, tick } from 'svelte';
	import {
		DeleteTicket,
		GetAllTickets,
		GetTicketById,
		GetTicketBySearch,
		GetTicketByType
	} from '../../datas/tickets/tickets';
	import type { TicketDto } from '../../types/types';
	import currentUser from '../../datas/users/user';
	let ticketData: TicketDto[] = [];
	let ticketIdValue: string;
	let searchValue: string;
	async function SortTickets(event: any) {
		if(event.target.value === '')
		{
			ticketData = await GetAllTickets();
		}
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
	async function HandleSearch() {
		if (searchValue === undefined || searchValue === null || searchValue === '') {
			ResetTickets();
		} else if (searchValue !== undefined || searchValue !== null || searchValue !== '') {
			setTimeout(async () => {
				ticketData = await GetTicketBySearch(searchValue);
			}, 1000);
		}
	}
</script>

<div class="create-ticket">
	<a href="tickets/createticket" type="button" class="btn btn-info relative">Bilet Oluştur</a>
</div>
<div class="sort-tickets">
	<div>
		<label for="ticket">Ticket Type:</label>
		<select name="ticket" on:change={(event) => SortTickets(event)}>
			<option value="">Tüm Biletler</option>
			<option value="Bölüm Sorunları">Bölüm Sorunları</option>
			<option value="Kullanıcı Sorunları">Kullanıcı Sorunları</option>
			<option value="Site Sorunları">Site Sorunları</option>
		</select>
	</div>
	<div class="search-ticket">
		<input
			style="background: white; color:black; border-radius:10px;"
			bind:value={ticketIdValue}
			placeholder="Direkt Bilet Numarasıyla Bilete Git"
			on:keypress={async (event) => {
				if (event.key === 'Enter') {
					await GetTicketById(ticketIdValue);
				}
			}}
		/>
		<input
			bind:value={searchValue}
			on:keypress={async (event) => {
				if (event.key === 'Enter') {
					await HandleSearch();
				}
			}}
			placeholder="BİLETLERDE ARA"
			class="search-input"
		/>
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
					<p>Bilet Numarası: {ticket.ticketId}</p>
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
	.search-input{
		background: white;
		color:black;
		border-radius:10px;
	}
	.create-ticket {
		position: absolute;
		left: 15%;
	}
	.delete-ticket {
		position: relative;
		float: right;
		border-radius: 5px;
		background-color: navy;
		background: linear-gradient(to right, rgb(109, 92, 106), rgb(84, 102, 184));
		margin: 0;
		color: black;
	}
	.sort-tickets {
		display: flex;
		flex-direction: row;
		color: white;
		position: relative;
		padding-left: 25em;
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
