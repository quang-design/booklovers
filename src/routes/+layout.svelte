<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	let { children } = $props();
</script>

<Nav />
<main class="px-4 py-2.5">
	<div class="mx-auto max-w-7xl">
		{@render children()}
	</div>
</main>
