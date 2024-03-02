<script lang="ts">
	import { IsNullOrEmpty } from '../../datas/emptychecker';
	import { Register } from '../../datas/users/useractivies';
	import { responseMessageStore } from '../../datas/variables';
	var email = '';
	var password = '';
	var username = '';
</script>

<div class="loginpage">
	<h1 class="tospotify">Sign up to start watching</h1>
	<hr />
	<br />
	<input bind:value={email} placeholder="Email" class="email-input" />
	<input bind:value={username} placeholder="Username" class="username-input" />
	<input bind:value={password} placeholder="Password" class="password-input" />
	<button
		class="login-button"
		on:click={() => {
			if (!IsNullOrEmpty(email)&&!IsNullOrEmpty(password)&&!IsNullOrEmpty(username)) {
				Register(email, password, username);
			} else {
				responseMessageStore.set('Email and password are required');
			}
		}}>Sign up</button
	>
	<h1 style="color:white; text-align:center;">Or</h1>
	<ul class="login-options">
		<li>
			<button>Continue with Google</button>
		</li>
		<li>
			<button>Continue with Facebook</button>
		</li>
		<li>
			<button>Continue with Apple</button>
		</li>
	</ul>
	<h1 style="color:gray; text-align:center; font:sans-serif">
		Already have an account? <a style="color:white;" href="/login">Log in here</a>
	</h1>
</div>

<style>
	.tospotify {
		color: white;
		text-align: center;
	}
	.loginpage {
		position: fixed;
		top: 20%;
		right: 30%;
	}
	.login-options li {
		list-style: none;
	}
	.login-options button {
		right: 20px;
		list-style: none;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		font-size: 1rem;
		font-weight: 700;
		background-color: transparent;
		border-radius: 500px;
		text-align: center;
		text-decoration: none;
		text-transform: none;
		touch-action: manipulation;
		transition-duration: 33ms;
		user-select: none;
		vertical-align: middle;
		transform: translate3d(0px, 0px, 0px);
		padding-block: 7px;
		padding-inline: 31px;
		position: relative;
		border: 1px solid var(--essential-subdued, #878787);
		color: var(--text-base, #000000);
		min-block-size: 48px;
		display: inline-flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		inline-size: 100%;
		overflow-wrap: anywhere;
		margin-bottom: 8px;
		color: white;
		margin: auto;
	}
	.email-input,
	.password-input,
	.username-input {
		gap: 10px 20px;
		appearance: none;
		background-image: none;
		border: 0px;
		display: block;
		font-size: 1rem;
		font-weight: 400;
		font-family: sans-serif;
		transition:
			box-shadow 0.1s ease-in-out 0s,
			color 0.1s ease-in-out 0s;
		inline-size: 100%;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		margin-block: 0px;
		border-radius: 4px;
		padding-inline: 14px;
		padding-block-start: 8px;
		padding-block-end: 8px;
		min-block-size: 48px;
		background-color: #121212;
		box-shadow: inset 0 0 0 1px #878787;
		color: white;
		text-overflow: ellipsis;
	}
	.login-button {
		font-weight: 700;
		font-family: sans-serif;
		text-align: center;
		text-transform: none;
		user-select: none;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		position: relative;
		background-color: #1ed760;
		color: #000000;
		display: flex;
		border-radius: 500px;
		font-size: inherit;
		min-block-size: 48px;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		padding-block: 8px;
		padding-inline: 32px;
		overflow-wrap: anywhere;
		margin: auto;
	}
</style>
