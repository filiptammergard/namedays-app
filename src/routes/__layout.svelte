<script lang="ts">
	import Header from '$lib/Header.svelte';
</script>

<div class="flex flex-col h-screen justify-between">
<div><Header />
<main class="max-w-6xl p-8 mx-auto">
	<slot />
</main>
</div>
<footer class="text-center p-4 bg-black text-gray-100">
	<p>&copy; {new Date().getFullYear()} Tammergård</p>
</footer>
</div>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
