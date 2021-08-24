<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import NamedayCard from "$lib/NamedayCard.svelte"; 
  import type { Nameday } from "$lib/namedays";
  import { namedays, namedaysToday, savedNamedays } from "$lib/stores";
  
  let searchInput = "";
  let searchResult: Nameday[] = []

  $: {
    if (searchInput !== "") {
      searchResult = $namedays.filter(nameday => nameday.name.toLowerCase().includes(searchInput.toLowerCase()))
    } else {
      searchResult = $namedays;
    }
  }

  const formatter = new Intl.ListFormat("en")
  let timer: NodeJS.Timeout;
  const debounce = e => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      searchInput = e.target.value
    }, 50)
  }
</script>

<svelte:head>
	<title>Nameday</title>
</svelte:head>

<h1 class="text-4xl text-center my-4">Nameday</h1>

<h2 class="text-2xl text-center mb-2">{$namedaysToday.length ? formatter.
  format($namedaysToday) : "None"} {$namedaysToday.length > 1 ? "have" : "has"} nameday today!</h2>

<input class="rounded p-2 border-2 border-gray-200 my-4 w-full focus:outline-none focus:border-black" type="text" placeholder="Search for names" on:keyup={debounce}/>

{#if searchResult.length}
  <section class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
    {#each searchResult as nameday}
      <NamedayCard nameday={nameday} selected={$savedNamedays.map(savedNameday => savedNameday.id).includes(nameday.id)} />
    {/each}
  </section>
{:else}
  <p>No nameday names matches your search input. Please try again.</p>
{/if}
