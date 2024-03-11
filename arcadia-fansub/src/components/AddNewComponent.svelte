<script lang="ts">
	import { writable } from "svelte/store";
	import AddNewEpisodeComponent from "./AddNewEpisodeComponent.svelte";
	import AddNewAnimeComponent from "./AddNewAnimeComponent.svelte";
	import EpisodePanelComponent from "./EpisodePanelComponent.svelte";
	import AnimePanelComponent from "./AnimePanelComponent.svelte";
	import UserManagementComponent from "./UserManagementComponent.svelte";

	let userOption=writable();
    function SetOption(option:number){
        $userOption=option;
    }

</script>
<div class="container">
    <div class="row g-0">
        <button type="button" class="mt-2 col btn btn-dark border border-secondary {$userOption === 0 ? 'selected' : ''}" on:click={() => SetOption(0)}>Yeni Seri Ekle</button>
        <button type="button" class="mt-2 col btn btn-dark border border-secondary {$userOption === 1 ? 'selected' : ''}" on:click={() => SetOption(1)}>Yeni Bölüm Ekle</button>
        <div class="w-100"></div>
        <button type="button" class="col btn btn-dark border border-secondary {$userOption === 2 ? 'selected' : ''}" on:click={() => SetOption(2)}>Bölüm Paneli</button>
        <button type="button" class="col btn btn-dark border border-secondary {$userOption === 3 ? 'selected' : ''}" on:click={() => SetOption(3)}>Seri Paneli</button>
        <button type="button" class="col btn btn-dark border border-secondary {$userOption === 4 ? 'selected' : ''}" on:click={() => SetOption(4)}>Ekip Üyesi Paneli</button>
    </div>
</div>

<div class="full-body" style="display:flex; column-direction:column;">

    <!-- add anime -->
    {#if $userOption === 0}
        <AddNewAnimeComponent/>
    {/if}

    <!-- add episode -->
    {#if $userOption === 1}
        <AddNewEpisodeComponent/>
    {/if}

    {#if $userOption === 2}
        <EpisodePanelComponent/>
    {/if}

    {#if $userOption === 3}
        <AnimePanelComponent/>
    {/if}
    {#if $userOption === 4}
        <UserManagementComponent/>
    {/if}
</div>

<style>
    .selected {
        background: linear-gradient(to right, rgb(192, 1, 156), rgb(84, 102, 184));
		-webkit-background-clip: text;
		color: transparent;
		background-clip: text;
    }
</style>
