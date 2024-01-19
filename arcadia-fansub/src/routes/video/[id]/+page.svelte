<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Episodes } from '../../../types/types';
	import { GetEpisodeVideo } from '../../../datas/episodes/getepisodevideo';
	export let data: PageData;
	var episodeId = data.props.episodedata.episodeId;
	let episodeData: Episodes;
	let linkArray: string[] = [];
	let player: string;
	
	onMount(async () => {
		episodeData = await GetEpisodeVideo(episodeId);
		if (episodeData && episodeData.episodeLinks) {
			linkArray = episodeData.episodeLinks.split(',');
		} else {
			console.error('Episode data or episodeLinks is undefined.');
		}
	});
	async function SetPlayer(playerName: string) {
		player = playerName;
	}
</script>
<div class="col-sm-4">
    <div class="card d-flexbox align-items-center justify-content-center" style="position:fixed; top:30%;right:30%;">
        {#key player}
		{#if episodeData}
        <iframe src={player} height="422" width="654" title="Iframe Example"></iframe>
		{:else}
		<p>No Video</p>
		{/if}
        {/key}
        
        <div class="btn-group">
            {#each linkArray as link}
                <button
                    type="button"
                    on:click={() => SetPlayer(link)}
                    class="btn btn-primary"
                    style="width:50px; height:50px; text-align:center; overflow:hidden;">{link}</button
                >
            {/each}
        </div>
    </div>
</div>

