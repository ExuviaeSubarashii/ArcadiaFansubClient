<script lang="ts">
	import { onMount } from 'svelte';
	import type { Notifications } from '../types/types';
	import { GetUserNotifications } from '../datas/notifications/notification';
	let notifications: Notifications[] = [];
	onMount(async () => {
		notifications = await GetUserNotifications();
	});

</script>

<div class="dropdown">
    <label for="notificationDropdownTrigger" class="dropdown-label">Bildirimler</label>
    <div class="dropdown-content">
        {#await notifications}
            <div>Loading...</div>
        {:then data}
            {#if data.length > 0}
                {#each data as notification}
                    <button class="dropdown-item"
					on:click={()=>window.location.href=`/video/${notification.episodeLink}`}>
                        {notification.episodeNotificationMessage}
                    </button>
                {/each}
            {:else}
                <div class="dropdown-item">Bildirim Yok</div>
            {/if}
        {/await}
    </div>
</div>
<style>
.dropdown {
		position: relative;
		display: inline-block;
		color: white;
	}
	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #121212;
		border-style: ridge;
		border-radius: 25px;
		text-align: center;
		min-width: 160px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
	.dropdown:hover .dropdown-content {
		display: block;
		right: 1%;
	}
	.dropdown-content button,
	span {
		color: lightgray;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		text-align: center;
	}

</style>

