<script lang="ts">
	import { GetAllTickets } from '../../datas/tickets/tickets';
</script>
<div class="create-ticket">
<a href="/createticket" type="button" class="btn btn-info">Bilet Oluştur</a>
</div>
<div class="tickets">
	{#await GetAllTickets()}
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
    .create-ticket{
        position: relative;
        left: 90%;
        top: 1.7%;
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
