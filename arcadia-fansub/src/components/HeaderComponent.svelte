<script lang="ts">
	import { onMount } from 'svelte';
	import currentUser from '../datas/users/user';
	import UserComponent from './UserComponent.svelte';
	import ResponseMessageComponent from './ResponseMessageComponent.svelte';
	import { responseMessageStore } from '../datas/variables';
	import WarningComponent from './WarningComponent.svelte';
	import { IsAuthenticated } from '../datas/users/authentication';
	// import NotificationComponent from './NotificationComponent.svelte';
	let searchParameter:string='';

	onMount(async() => {
		if (await IsAuthenticated()===true) {
			console.log(currentUser);
		}
	});
</script>

<div class="container" style="background-color:#121212;">
	<div
		class="topbar d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
	>
	<div class="warning">
		<WarningComponent/>
	</div>

		<a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
			<header>
				<h1>Arcadia Fansub</h1>
			</header>
		</a>

		<ul class="nav">
			<li><a href="/anime" class="nav-link-series">Seriler</a></li>
			<li><a href="/tickets" class="nav-link-ticket">Bilet Aç</a></li>
			<li>
				<a href="https://discord.gg/wHVPuuKSjR" class="nav-link-discord"
					><i class="bx bxl-discord-alt"></i>Discord Sunucumuz</a
				>
			</li>
			<li><a href="/about" class="nav-link-about">Hakkımızda</a></li>
		</ul>
		<form class="searchbar col-12 col-sm-1 mb-3 mb-lg-0 me-lg-1" role="search">
			<input
				class="form-control form-control-dark text-bg-light border-3 border-info p-3 "
				placeholder="Ara"
				bind:value={searchParameter}
				on:keypress={e => {
					if (e.key === 'Enter') {
						window.location.href=`/anime/${searchParameter}`;
					}
				}}
			/>
		</form>
		<div class="response">
			{#key $responseMessageStore}
			<ResponseMessageComponent />
			{/key}
		</div>
		<div class="userbar">
			{#await IsAuthenticated()}
				<div>Authenticating...</div>
			{:then result} 
			{#if result===true}
				<UserComponent />
				<!-- <div class="notif-comp">
					<NotificationComponent />
				</div> -->
			{:else}
				<div class="text-end">
					<a type="button" class=" btn btn-outline-light me-2" href="/login">Giriş Yap</a>
					<a type="button" class="btn btn-warning" href="/register">Kayıt ol</a>
				</div>
			{/if}	
			{/await}
			
		</div>
	</div>
</div>

<style>
	.response{
		position: absolute;
		right: 0;
		top: 6px;
	}
	.warning{
		position: absolute;
		right: 23%;
	}
	.nav {
		list-style: none;
		display: flex;
		justify-content: center;
		margin: 0;
		padding: 0;
	}

	.nav-link-series,
	.nav-link-ticket,
	.nav-link-discord,
	.nav-link-about {
		text-decoration: none;
		color: white;
		padding: 0.5rem 1rem;
	}
	.nav-link-series:hover,
	.nav-link-ticket:hover,
	.nav-link-discord:hover,
	.nav-link-about:hover {
		background-color: #1f1f1f;
		border-radius: 5px;
		border-style: solid;
		border-color: #ffffff;
		background: linear-gradient(to right, rgb(192, 1, 156), rgb(84, 102, 184));
		-webkit-background-clip: text;
		color: transparent;
		background-clip: text;
		margin: 0;

	}
	.userbar {
		margin-left: auto;
	}
	h1 {
		background: linear-gradient(to right, rgb(192, 1, 156), rgb(84, 102, 184));
		-webkit-background-clip: text;
		color: transparent;
		background-clip: text;
		margin: 0;
	}
</style>
