<script>
	import BookForm from '$lib/components/Books/BookForm.svelte';

	let { form } = $props();
</script>

<div class="flex flex-col md:flex-row md:space-x-6">
	<div class="space-y-6">
		<h1 class="text-3xl font-bold">Add Book</h1>
	</div>
</div>
<hr />

{#if form && form.success}
	<h2>Success</h2>
{:else}
	<BookForm {form} />
{/if}

<svelte:head>
	<title>Book Lovers - Add Book</title>
</svelte:head>
