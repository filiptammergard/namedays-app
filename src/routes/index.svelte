<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import { Nameday, today } from "namedays";
  import NamedayCard from "$lib/NamedayCard.svelte"; 
  import { namedays, savedNamedays } from "$lib/stores";
  
  type Sorting = "chronological-asc" | "chronological-desc" | "alfabetical-asc" | "alfabetical-desc" | "name-length-asc" | "name-length-desc"

  let searchInput = "";
  let searchResult: Nameday[] = []
  let sorting: Sorting = "chronological-asc"

  const namedaysToday = today().map(nameday => nameday.name)

  $: {
    if (searchInput !== "") {
      const searchedNames = $namedays.filter(nameday => nameday.name.toLowerCase().includes(searchInput.toLowerCase()))
      if (sorting === "chronological-asc") {
        searchResult = searchedNames.sort((a, b) => {
          if (a.date.month !== b.date.month) return a.date.month - b.date.month
          else return a.date.day - b.date.day
        })
      } else if (sorting === "chronological-desc") {
        searchResult = searchedNames.sort((a, b) => {
          if (a.date.month !== b.date.month) return a.date.month - b.date.month
          else return a.date.day - b.date.day
        }).reverse()
      } else if (sorting === "alfabetical-asc") {
        searchResult = searchedNames.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          else return 0
        })
      } else if (sorting === "alfabetical-desc") {
        searchResult = searchedNames.sort((a, b) => {
          if (a.name < b.name) return 1
          if (a.name > b.name) return -1
          else return 0
        })
      } else if (sorting === "name-length-asc") {
        searchResult = searchedNames.sort((a, b) => {
          if (a.name.length < b.name.length) return -1
          if (a.name.length > b.name.length) return 1
          else return 0
        })
      } else if (sorting === "name-length-desc") {
        searchResult = searchedNames.sort((a, b) => {
          if (a.name.length < b.name.length) return 1
          if (a.name.length > b.name.length) return -1
          else return 0
        })
      }
    } else {
      if (sorting === "chronological-asc") {
        searchResult = $namedays.sort((a, b) => {
          if (a.date.month !== b.date.month) return a.date.month - b.date.month
          else return a.date.day - b.date.day
        })
      } else if (sorting === "chronological-desc") {
        searchResult = $namedays.sort((a, b) => {
          if (a.date.month !== b.date.month) return a.date.month - b.date.month
          else return a.date.day - b.date.day
        }).reverse()
      } else if (sorting === "alfabetical-asc") {
        searchResult = $namedays.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          else return 0
        })
      } else if (sorting === "alfabetical-desc") {
        searchResult = $namedays.sort((a, b) => {
          if (a.name < b.name) return 1
          if (a.name > b.name) return -1
          else return 0
        })
      } else if (sorting === "name-length-asc") {
        searchResult = $namedays.sort((a, b) => {
          if (a.name.length < b.name.length) return -1
          if (a.name.length > b.name.length) return 1
          else return 0
        })
      } else if (sorting === "name-length-desc") {
        searchResult = $namedays.sort((a, b) => {
          if (a.name.length < b.name.length) return 1
          if (a.name.length > b.name.length) return -1
          else return 0
        })
      }
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
	<title>Namedays</title>
</svelte:head>

<h1 class="text-4xl text-center my-4">Nameday</h1>

<h2 class="text-2xl text-center mb-2">{namedaysToday.length ? formatter.
  format(namedaysToday) : "None"} {namedaysToday.length > 1 ? "have" : "has"} nameday today!</h2>

<div class="grid sm:grid-cols-2 gap-4 my-4">
  <input class="rounded p-2 border-2 border-gray-200 focus:outline-none focus:border-black" type="text" placeholder="Search for names" on:keyup={debounce}/>
  <select class="rounded p-2 border-2 border-gray-200 focus:outline-none focus:border-black" bind:value={sorting}>
    <option value="chronological-asc">Chronological (ascending)</option>
    <option value="chronological-desc">Chronological (descending)</option>
    <option value="alfabetical-asc">Alfabetical (ascending)</option>
    <option value="alfabetical-desc">Alfabetical (descending)</option>
    <option value="name-length-asc">Name length (ascending)</option>
    <option value="name-length-desc">Name length (descending)</option>
  </select>
</div>

{#if searchResult.length}
  <section class="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
    {#each searchResult as nameday}
      <NamedayCard nameday={nameday} selected={$savedNamedays.map(savedNameday => savedNameday.id).includes(nameday.id)} />
    {/each}
  </section>
{:else}
  <p>No nameday names matches your search input. Please try again.</p>
{/if}
