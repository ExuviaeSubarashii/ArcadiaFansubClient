<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { responseMessageStore } from "../../datas/variables";

	let message: any = '';
	let isVisible=writable(true);
	onMount(()=>{
		const unsubscribe=responseMessageStore.subscribe((value)=>{
			message=value;
			isVisible.set(true);
			setTimeout(() => {
			isVisible.set(false)
			responseMessageStore.set('');
		}, 5000);
		})
	})
</script>
{#key $responseMessageStore}
{#if $isVisible}
<div class="response-div">
	<h1 class="response-header">{message}</h1>
</div>
{/if}
{/key}

<style>
	.response-header{
		font-size: medium;
		text-align: center;
	}
	.response-div {
		border-style: outset;
		border-radius: 7px;
		position: relative;
		color: white;
		overflow: hidden;
		max-width: 230px;
		text-align: center;
	}
</style>