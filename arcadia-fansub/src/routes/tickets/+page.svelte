<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { GetAllTickets, GetTicketByType } from '../../datas/tickets/tickets';
	import type { TicketDto } from '../../types/types';
	let ticketData:TicketDto[]=[];
	async function SortTickets(event:any){
		ticketData=await GetTicketByType(event.target.value);
		console.log(ticketData);
	}
	async function ResetTickets(){
		ticketData=await GetAllTickets();
	}
	onMount(async()=>{
		ticketData=await GetAllTickets();
	})
</script>

<div class="create-ticket">
	<a href="tickets/createticket" type="button" class="btn btn-info">Bilet Oluştur</a>
</div>
<div class="sort-tickets">
	<div>
		<label for="ticket">Bölüm Problemi</label>
		<input type="radio" name="ticket" value="Bölüm Problemi" on:click={(event)=>SortTickets(event)}/>
	</div>
	<div>
		<label for="ticket">Kullanıcı Problemi</label>
		<input type="radio" name="ticket" value="Kullanıcı Sorunları" on:click={(event)=>SortTickets(event)}/>
	</div>
	<div>
		<label for="ticket">Site Problemi</label>
		<input type="radio" name="ticket" value="Site Sorunları" on:click={(event)=>SortTickets(event)}/>
	</div>
	<button on:click={()=>ResetTickets()}>Sıfırla</button>
</div>

<div class="tickets">
	{#await ticketData}
		<div>
			<h1>Loading...</h1>
		</div>
	{:then data}
		{#each data as ticket}
			<div class="ticket-body">
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
	.sort-tickets{
		display: block;
		flex-direction: row;
		color: white;
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
