<script lang="ts">
  import { savedNamedays } from "$lib/stores"
  import NamedayCard from "$lib/NamedayCard.svelte";
</script>

<h1 class="text-4xl text-center my-4">Saved namedays</h1>
{#if $savedNamedays.length}
<section class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
  {#each $savedNamedays as nameday}
      <NamedayCard nameday={nameday} added />
  {/each}
</section>
{:else}
  <p>You haven't saved any namedays yet.</p>
{/if}
