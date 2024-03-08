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
        <button class="btn btn-secondary dropdown-toggle overflow-hidden p-1 d-inline-block text-truncate" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            {currentUser.userName}
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
                <a class="dropdown-item" href="/profile/{encodeURIComponent(currentUser.userName)}" target="_parent">Profile</a>
            </li>
            {#if isAdmin===true}
            <li>
                <a class="dropdown-item" href="/addnew">Admin Panel</a>
            </li>
            {/if}
            <li><hr class="dropdown-divider"></li>
            <li>
                <a class="dropdown-item" href="/" on:click={LogOut}>Log out</a>
            </li>
        </ul>
    </div>
</div>
<style>
.top-right-user-component {
    border-radius: 15px;
    color: white;
    font-size: 20px;
}

.dropdown-menu {
    background-color: #121212;
    border-style: ridge;
    border-radius: 25px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
    color: lightgray;
    text-align: center;
}

.dropdown-item:hover {
    color: white;
    background-color: #121212;
}
</style>