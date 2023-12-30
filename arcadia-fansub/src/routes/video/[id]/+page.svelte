<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Episodes } from '../../../types/types';
	import { GetEpisodeVideo } from '../../../datas/episodes/getepisodevideo';
	export let data: PageData;
	var episodeId = data.props.episodedata.episodeId;
	console.log(episodeId);
	let episodeData: Episodes;
	let linkArray: string[] = [];
	let player: string;
	async function SetPlayer(playerName: string) {
		player = playerName;
		console.log(player);
	}
	onMount(async () => {
		episodeData = await GetEpisodeVideo(episodeId);
		console.log(episodeData);
		if (episodeData && episodeData.episodeLinks) {
			linkArray = episodeData.episodeLinks.split(',');
			console.log(linkArray);
			SetPlayer(linkArray[0]);
		} else {
			console.error('Episode data or episodeLinks is undefined.');
		}
	});
</script>
<div class="col-sm-4">
    <div class="card d-flexbox align-items-center justify-content-center" style="position:fixed; top:30%;right:30%;">
        {#key player}
        <iframe src={player} height="422" width="654" title="Iframe Example"></iframe>
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

