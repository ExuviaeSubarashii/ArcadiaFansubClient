<script lang="ts">
	import { onMount } from 'svelte';
	import currentUser from '../datas/users/user';
	import UserComponent from './UserComponent.svelte';
	import ResponseMessageComponent from './ResponseMessageComponent.svelte';
	import { responseMessageStore } from '../datas/variables';
	import NotificationComponent from './NotificationComponent.svelte';
	onMount(() => {
		if (currentUser.isLoggedIn) {
			console.log(currentUser);
		}
	});
</script>

<div class="container" style="background-color:#121212;">
	<div
		class="topbar d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
	>
		<a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
			<header>
				<h1>Arcadia Fansub</h1>
			</header>
		</a>

		<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
			<li><a href="/anime" class="nav-link px-2 text-white">Seriler</a></li>
			<li><a href="/tickets" class="nav-link px-2 text-white">Bilet Aç</a></li>
			<li>
				<a href="https://discord.gg/wHVPuuKSjR" class="nav-link px-2 text-white"
					><i class="bx bxl-discord-alt"></i>Discord Sunucumuz</a
				>
			</li>
			<li><a href="/about" class="nav-link px-1 text-white">Hakkımızda</a></li>
		</ul>

		<form class="searchbar col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
			<input
				type="search"
				class="form-control form-control-dark text-bg-dark"
				placeholder="Search..."
				aria-label="Search"
			/>
		</form>
		{#key $responseMessageStore}
			<ResponseMessageComponent />
		{/key}
		<div class="userbar">
			{#if currentUser.isLoggedIn === true}
				<UserComponent />
				<div class="notif-comp">
					<NotificationComponent />
				</div>
			{:else}
				<div class="text-end">
					<a type="button" class=" btn btn-outline-light me-2" href="/login">Giriş Yap</a>
					<a type="button" class="btn btn-warning" href="/register">Kayıt ol</a>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.notif-comp{
		position: absolute;
		left: 63%;
		top: 1%;
	}
	h1 {
		background: linear-gradient(to right, rgb(192, 1, 156), rgb(84, 102, 184));
		-webkit-background-clip: text;
		color: transparent;
		background-clip: text;
		margin: 0;
	}
</style>
