<script lang="ts">
	import { onMount } from 'svelte';
    import AddNewComponent from '../../components/AddNewComponent.svelte';
	import { GetAllAnimes } from '../../datas/animes/getanimes';
	import { IsAdmin } from '../../datas/users/authentication';
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
    <p>Redirecting...</p>
    {/if}
</div>