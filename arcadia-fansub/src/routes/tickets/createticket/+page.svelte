<script lang="ts">
	import { onMount } from "svelte";
	import { CreateTicket } from "../../../datas/tickets/tickets";
	import currentUser from "../../../datas/users/user";
	import type { TicketBody } from "../../../types/types";
	import { IsAuthenticated } from "../../../datas/users/authentication";

    let reason:string;
    let mainTitle:string;
    let mainText:string;
    
	async function CreateTicketHandler(){
        const ticketBody:TicketBody={
            senderName:currentUser.userEmail,
            ticketMessage:mainText,
            ticketTitle:mainTitle,
            ticketReason:reason,
            ticketStatus:"Sent",
			senderToken:currentUser.userToken
        }
        await CreateTicket(ticketBody);
    }
    function ReasonSetter(event:any){
        reason=event.target.value;
    }
    onMount(async ()=>{
        if(await IsAuthenticated()===false){
            window.location.href="/login";
        }
    })
</script>

<div class="fullbody">
	<div class="inputs">
        <h1>Konu Basligi</h1>
		<input type="text" maxlength="48" bind:value={mainTitle}>
        <h1>Konu Metni</h1>
        <input type="text" maxlength="256" bind:value={mainText}>
	</div>
	<div class="reason-panel">
		<div class="reason">
			<label for="reason">Bölüm Problemi</label>
			<input type="radio" name="reason" value="EpisodeProblems" on:click={(e) => ReasonSetter(e)} />
		</div>
		<div class="reason">
			<label for="reason">Kullanıcı Problemi</label>
			<input
				type="radio"
				name="reason"
				value="UserProblems"
				on:click={(e) => ReasonSetter(e)}
			/>
		</div>
		<div class="reason">
			<label for="reason">Site Problemi</label>
			<input type="radio" name="reason" value="SiteProblems" on:click={(e) => ReasonSetter(e)} />
		</div>
	</div>
	<button
		style="border: solid; border-color:blueviolet; border-radius:10px; background-color:transparent; color:dodgerblue; position:relative; left:50%; top:15%;"
		on:click={()=>CreateTicketHandler()}>Gönder</button
	>
</div>

<style>
    .inputs input{
        height: 50px;
        width: 100%;
        background-color: transparent;
        color: white;
    }
    .inputs h1{
     color: white;   
    }
	.reason-panel {
		display: flex;
		flex-direction: column;
		position: relative;
		top: 10%;
		left: 50%;
	}
	.reason {
		color: white;
	}
</style>
