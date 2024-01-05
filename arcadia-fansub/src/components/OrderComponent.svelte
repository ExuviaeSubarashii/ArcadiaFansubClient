<script lang="ts">
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let numbers=29;
</script>
<div class="column border border-1 ms-5 sticky-bottom" style="width: 39%;">
    {#each alphabet as letter}
    <button type="button" on:click={()=>{
        window.location.href=`anime/${letter}`
    }} class="btn btn-primary btn-sm">{letter}</button>
    {/each}

    {#each Array(numbers) as num,i}
    <button on:click={()=>{
        window.location.href=`/sort/${i}`;
    }}>{i}</button>
    {/each}
</div>