<script lang="ts">
	import { onMount } from 'svelte';
	import type { Notifications } from '../types/types';
	import { GetUserNotifications, GetUserNotificationsIfOutOfDate } from '../datas/notifications/notification';
	import { writable, type Writable } from 'svelte/store';
	let notifications = writable<Notifications[]>([]);

	async function GetUserNotificationsIfEmpty() {
		if (localStorage.getItem('notifications') === null) {
			notifications.set(await GetUserNotifications());
		}
	}
	onMount(async () => {
		await GetUserNotificationsIfOutOfDate();
		await GetUserNotificationsIfEmpty();
		notifications.set(JSON.parse(localStorage.getItem('notifications') || '[]'));
	});

	async function HandleNotificationDeletion(num: number) {
		notifications.update((array) => {
        const updatedArray = array.map((notification, index) => {
            if (index === num) {
                return { ...notification, isVisible: !notification.isVisible };
            }
            return notification;
        });
        localStorage.setItem('notifications', JSON.stringify(updatedArray));
        return updatedArray;
    });
	}
</script>

<div class="full-body">
	<div class="dropdown">
		<label for="notificationDropdownTrigger" class="dropdown-label">Bildirimler</label>
		<div class="dropdown-content">
			{#await $notifications}
				<div>Loading...</div>
			{:then data}
				{#if data.length >= 0}
					<div>Takip Ettiginiz Seriler</div>
					{#key $notifications}
						{#each data as notification, index}
							{#if notification.isVisible === true}
								<div class="notification-item">
									<button
										class="dropdown-item"
										on:click={() => (window.location.href = `/video/${notification.episodeLink}`)}
									>
										{notification.episodeNotificationMessage}
									</button>
									<button
										class="delete-notification"
										on:click={() => HandleNotificationDeletion(index)}
										>X
									</button>
								</div>
							{/if}
						{/each}
					{/key}
				{:else}
					<div class="dropdown-item">Bildirim Yok</div>
				{/if}
			{/await}
		</div>
	</div>
</div>

<style>
	.delete-notification:hover {
		background-color: lightblue;
	}
	.delete-notification {
		position: relative;
		float: right;
		background-color: #121212;
		border-style: ridge;
		border-radius: 25px;
		text-align: center;
		min-width: 120px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
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
	.dropdown-content button {
		color: lightgray;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		text-align: center;
		position: relative;
		right: 15px;
	}
</style>
