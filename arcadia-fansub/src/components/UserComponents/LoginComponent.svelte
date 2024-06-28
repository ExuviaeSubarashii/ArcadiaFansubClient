<script lang="ts">
	import { onMount } from 'svelte';
	import { IsNullOrEmpty } from '../../datas/emptychecker';
	import { Login } from '../../datas/users/useractivies';
	import { responseMessageStore } from '../../datas/variables';

	var email = '';
	var password = '';
	var failedResult:boolean=false;
</script>

<div class="loginpage">
	<h1 class="toArcadia">Log in to Arcadia</h1>
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
	<hr />
	<br />
	<input bind:value={email} placeholder="E-Posta" class="email-input" on:input={()=>{failedResult=true}}/>
	<input bind:value={password} placeholder="Şifre" class="password-input" on:input={()=>{failedResult=true}}/>
	{#key failedResult}
		
	<button
		class="login-button"
		disabled={!email||!password||!failedResult}
		on:click={async() => {
			if (!IsNullOrEmpty(email)&&!IsNullOrEmpty(password)) {
				const loginResult= await Login(email, password);

				console.log(loginResult);

				if(loginResult==="Failed"){
					failedResult=!failedResult;
				}
			} else {
				{
					
					responseMessageStore.set('Email or Password is empty.');
				}
			}
		}}>Login</button
	>
	{/key}

	<h1 style="color:gray; text-align:center; font:sans-serif; margin;0 auto">
		Hesabın Yok Mu? <a style="color:white;" href="/register">Buradan Kayıt Ol</a>
	</h1>
</div>

<style>
	.toArcadia {
		color: white;
		position: fixed;
		top: 15%;
		margin-left: 10%;
	}
	.loginpage {
		
		position: fixed;
		margin-top: 10%;
		margin-left: 35%;
	}
	.login-options li {
		list-style: none;
	}
	.login-options button {
		list-style: none;
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
	.password-input {
		color: white;
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
		position: relative;
		display: flex;
		border-radius: 25px;
		min-block-size: 48px;
		align-items: center;
		justify-content: center;
		padding-inline: 32px;
		margin: auto;
		background: linear-gradient(to right, rgb(192, 1, 156), rgb(84, 102, 184));
		-webkit-background-clip: text;
		color: transparent;
		background-clip: text;
		
	}
</style>
