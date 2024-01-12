<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { responseMessageStore } from "../datas/variables";

	let message: any = '';
	let isVisible=writable(true);
	onMount(()=>{
		const unsubscribe=responseMessageStore.subscribe((value)=>{
			message=value;
			isVisible.set(true);
			setTimeout(() => {
			isVisible.set(false)
			responseMessageStore.set('');
		}, 1000);
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
	}
	.response-div {
		border-style: outset;
		border-radius: 25px;
		position: absolute;
		top: 5px;
		right: 1%;
		color: white;
		font-size: 7px;
		/* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
	}
</style>