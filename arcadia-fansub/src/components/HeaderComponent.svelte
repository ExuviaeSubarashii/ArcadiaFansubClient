<script lang="ts">
	import { onMount } from "svelte";
	import currentUser from "../datas/users/user";
	import { LogOut, ShowCurrentUser } from "../datas/users/useractivies";
	import UserComponent from "./UserComponent.svelte";
  onMount(()=>{
    if(currentUser.isLoggedIn){
      console.log(currentUser);
    }
  })
</script>
<div class="container" style="background-color:#121212;">
    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
      </a>

      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" class="nav-link px-2 text-secondary">Ana Sayfa</a></li>
        <li><a href="/" class="nav-link px-2 text-white" on:click={()=>{
          window.location.href="/anime";
        }}>Animeler</a></li>
        <button on:click={ShowCurrentUser}>Bombo</button>
        <li><a href="/" class="nav-link px-2 text-white">Gidilecek Yer </a></li>
        <li><a href="https://discord.gg/wHVPuuKSjR" class="nav-link px-2 text-white"><i class='bx bxl-discord-alt' ></i>Discord Sunucumuz</a></li>
        <li><a href="/about" class="nav-link px-2 text-white">Hakkımızda</a></li>
      </ul>

      <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
        <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search">
      </form>
      {#if currentUser.isLoggedIn===true}
      <UserComponent/>
      {:else}
      <div class="text-end">
        <!-- <button type="button" on:click={()=>{
          window.location.href="/login";
        }} class="btn btn-outline-light me-2">Giriş Yap</button>
        <button type="button" on:click={()=>{
          window.location.href="/register";
        }} class="btn btn-warning">Kayıt Ol</button> -->
        <a type="button" class=" btn btn-outline-light me-2" href="/login">Giriş Yap</a>
        <a type="button" class="btn btn-warning" href="/register">Kayıt ol</a>
      </div>
      {/if}
    </div>
  </div>