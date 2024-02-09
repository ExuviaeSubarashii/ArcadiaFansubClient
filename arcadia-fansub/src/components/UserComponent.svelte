<script lang="ts">

	import { onMount } from "svelte";
import currentUser from "../datas/users/user";
	import { LogOut } from "../datas/users/useractivies";
	import { IsAdmin } from "../datas/users/authentication";
	let isAdmin:boolean=false;
	onMount(async()=>{
		let isAdminresponse= await IsAdmin();
		if(isAdminresponse){
			isAdmin=isAdminresponse;
		}
	})
</script>
<div class="top-right-user-component">
    <div class="dropdown">
      <span><p>{currentUser.userName}</p></span>
      <div class="dropdown-content">
        <a href="/profile/{encodeURIComponent(currentUser.userName)}">Profile</a>
		{#if isAdmin===true}
		<a href="/addnew">Admin Panel</a>
		{/if}
        <hr />
        <a href="/" on:click={LogOut}>Log out</a>
      </div>
    </div>
  </div>
  <style>
     .top-right-user-component {
		border-style: outset;
		border-radius: 25px;
		color: white;
		font-size: 20px;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}
	.dropdown {
		position: relative;
		display: inline-block;
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
	.dropdown-content a,
	span {
		color: lightgray;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		text-align: center;
	}
  </style>