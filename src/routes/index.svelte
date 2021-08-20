<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import NamedayCardAdd from "$lib/NamedayCardAdd.svelte"; 
  import NamedayCardAdded from "$lib/NamedayCardAdded.svelte";
  import type { Nameday } from "$lib/namedays";
  import { API_URL } from "$lib/env"
  import { savedNamedays } from "$lib/stores";
  let namedays: Nameday[] = []
  
  fetch(`${API_URL}/namedays`)
    .then(response => response.json())
    .then(data => namedays = data);
  
  const today = {
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  }
    
  let searchInput = "";
  let searchResult: Nameday[] = []

  $: {
    if (searchInput !== "") {
      searchResult = namedays.filter(nameday => nameday.name.toLowerCase().includes(searchInput.toLowerCase()))
    } else {
      searchResult = namedays;
    }
  }

  let namedaysToday: Nameday[] = [];
  fetch(`${API_URL}/namedays/date/${today.month}/${today.day}`)
    .then(response => response.json())
    .then(data => namedaysToday = data.map(nameday => nameday.name))

  const formatter = new Intl.ListFormat("en")
</script>

<svelte:head>
	<title>Nameday</title>
</svelte:head>

<h1 class="text-4xl text-center my-4">Nameday</h1>
<h2 class="text-2xl text-center mb-2">Today's {namedaysToday.length > 1 ? "names are" : "name is"} {namedaysToday.length ? formatter.
  format(namedaysToday) : "none"}</h2>
<input class="rounded p-2 border-2 border-gray-200 my-4 w-full focus:outline-none focus:border-black" type="text" placeholder="Search for names" bind:value={searchInput}/>
{#if searchResult.length}
<section class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
  {#each searchResult as nameday}
    {#if $savedNamedays.map(savedNameday => savedNameday.id).includes(nameday.id)}
      <NamedayCardAdded nameday={nameday} />
    {:else}
      <NamedayCardAdd nameday={nameday} />   
    {/if}
  {/each}
</section>
{:else}
  <p>No nameday names matches your search input. Please try again.</p>
{/if}
