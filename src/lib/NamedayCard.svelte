<script lang="ts">
  import type { Nameday } from "namedays";
  import { savedNamedays } from "$lib/stores"
  export let nameday: Nameday
  export let selected: boolean = false
  export let added: boolean = false

  $: monthString = new Date(new Date().getFullYear(), nameday.date.month - 1, nameday.date.day).toLocaleString("en", { month: "long"})

  $: {
    if ($savedNamedays.includes(nameday)) {
      added = true
    } else {
      added = false
    }
  }

  const addName = () => {
    $savedNamedays = [...$savedNamedays, nameday]
  }

  const removeName = () => {
    $savedNamedays = [...$savedNamedays.filter(savedNameday => savedNameday.id !== nameday.id)]
  }
</script>

<button on:click={added ? removeName : addName}>
  <article class={`bg-gray-200 rounded p-2 flex justify-between hover:scale-105 transition ease-in-out group-focus:outline-none group-focus:border-black ${selected ? "bg-black text-gray-200" : "bg-gray-200"}`}>
    <h1>{nameday.name}</h1>
    <p>{nameday.date.day} {monthString}</p>
  </article>
</button>
