<script lang="ts">
  import type { Nameday } from "$lib/namedays";
  import { savedNamedays } from "$lib/stores"
  export let nameday: Nameday

  const monthString = new Date(new Date().getFullYear(), nameday.date.month - 1, nameday.date.day).toLocaleString("en", { month: "long"})

  const addName = () => {
    $savedNamedays = [...$savedNamedays, nameday]
  }
</script>

<article class="bg-gray-200 rounded p-2 flex justify-between">
  <div>
    <h1>{nameday.name}</h1>
    <p>{nameday.date.day} {monthString}</p>
  </div>
  <button class="p-2" on:click={addName}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:scale-125 transition ease-in-out" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
    </svg>
  </button>
</article>
