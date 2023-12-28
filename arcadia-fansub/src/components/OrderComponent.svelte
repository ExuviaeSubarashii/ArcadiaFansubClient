<script lang="ts">
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
</script>
<div class="column border border-1 " style="width: 39%;">
    {#each alphabet as letter}
    <button type="button" class="btn btn-primary btn-sm">{letter}</button>
    {/each}
</div>