<script lang="ts">
	import { onMount } from 'svelte';
    import AddNewComponent from '../../components/AddNewComponent.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
    let admincheck=data.props.isUserAdmin.adminCheck;
    console.log("AddNew:",data.props.isUserAdmin.adminCheck);
    onMount(()=>{
        if(!admincheck){
            window.location.href="/"
        }
    })
</script>
<div style="color:white;">
    {#if admincheck===true}
    <AddNewComponent/>
    {:else}
    <p>Redirecting...</p>
    {/if}
</div>