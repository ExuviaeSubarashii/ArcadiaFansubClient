<script lang="ts">
	import { onMount } from 'svelte';
	import { GetAllAnimes } from '../../datas/animes/getanimes';
	import { IsAdmin } from '../../datas/users/authentication';
	import AddNewComponent from '../../components/AdminPanel/AddNewComponent.svelte';
    let adminCheck:boolean=false;
    onMount(async()=>{
    adminCheck = await IsAdmin();
        if(!adminCheck){
            window.location.href="/"
        }
        await GetAllAnimes();

    })
</script>
<div style="color:white;">
    {#if adminCheck===true}
    <AddNewComponent/>
    {:else}
    <p>Yönlendiriliyor...</p>
    {/if}
</div>