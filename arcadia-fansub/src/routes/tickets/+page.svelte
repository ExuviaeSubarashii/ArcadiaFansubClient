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
	import { IsAdmin } from '../../datas/users/authentication';
	import { IsNullOrEmpty } from '../../datas/emptychecker';
	let ticketData: TicketDto[] = [];
	let ticketIdValue: string;
	let searchValue: string;
	let isAdmin: boolean = false;
	async function SortTickets(event: any) {
		if (IsNullOrEmpty(event.target.value)) {
			ResetTickets();
		}
		ticketData = await GetTicketByType(event.target.value);
	}
	async function ResetTickets() {
		ticketData = await GetAllTickets();
	}
	async function HandleTicketDelete(ticketId: string) {
		await DeleteTicket(ticketId);
		await ResetTickets();
	}
	onMount(async () => {
		ticketData = await GetAllTickets();
		isAdmin = await IsAdmin();
	});
	async function HandleSearch() {
		if (IsNullOrEmpty(searchValue)) {
			ResetTickets();
		} else if (IsNullOrEmpty(searchValue) === false) {
			setTimeout(async () => {
				ticketData = await GetTicketBySearch(searchValue);
			}, 1000);
		}
	}
</script>

<div class="sort-tickets">
	<a href="tickets/createticket" type="button" class="create-ticket btn btn-info relative"
		>Bilet Oluştur</a
	>

	<div>
		<label for="ticket">Bilet Türü:</label>
		<select name="ticket" on:change={(event) => SortTickets(event)}>
			<option value="">Tüm Biletler</option>
			<option value="EpisodeProblems">Bölüm Sorunları</option>
			<option value="UserProblems">Kullanıcı Sorunları</option>
			<option value="SiteProblems">Site Sorunları</option>
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
	{#key ticketData}
		{#await ticketData}
			<div>
				<h1>Loading...</h1>
			</div>
		{:then data}
			{#if data.length > 0}
				{#each data as ticket}
					<div class="ticket-body">
						{#await isAdmin}
							<div>Checking if you are an admin...</div>
						{:then isAdminResult}
							{#if isAdminResult === true}
								<div class="ticket-options">
									<button class="delete-ticket" on:click={() => HandleTicketDelete(ticket.ticketId)}
										>Bileti Sil</button
									>
								</div>
							{/if}
						{/await}

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
							{#if ticket.ticketStatus === 'Completed'}
								<p>Durum: Bilet Tamamlandı</p>
							{:else if ticket.ticketStatus === 'WIP'}
								<p>Durum: Bilet Yapım Aşamasında</p>
							{/if}
							{#if ticket.ticketReason === 'EpisodeProblems'}
								<p>Sebep: Bölüm Sorunları</p>
							{:else if ticket.ticketReason === 'UserProblems'}
								<p>Sebep: Kullanıcı Sorunları</p>
							{:else if ticket.ticketReason === 'SiteProblems'}
								<p>Sebep: Site Sorunları</p>
							{/if}
						</div>
					</div>
				{/each}
			{:else}
				<div>
					<h1>Hiç Bu Etiketle Bilet Yok</h1>
				</div>
			{/if}
		{/await}
	{/key}
</div>

<style>
	.search-input {
		background: white;
		color: black;
		border-radius: 10px;
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
		margin-left: 30%;
		top: 2%;
		gap: 10px;
	}

	.tickets {
		margin-top: 0.5em;
		display: flex;
		flex-direction: column;
		position: relative;
		
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
