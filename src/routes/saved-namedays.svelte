<script lang="ts">
  import { savedNamedays } from "$lib/stores"
  import NamedayCardRemove from "$lib/NamedayCardRemove.svelte";
</script>

<h1 class="text-4xl text-center my-4">Saved namedays</h1>
{#if $savedNamedays.length}
<section class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
  {#each $savedNamedays as nameday}
      <NamedayCardRemove nameday={nameday} />
  {/each}
</section>
{:else}
  <p>You haven't saved any namedays yet.</p>
{/if}
