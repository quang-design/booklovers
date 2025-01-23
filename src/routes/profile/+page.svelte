<script>
	import Book from '$lib/components/Books/Book.svelte';

	let { data } = $props();
</script>

{#each data.books as book (book.id)}
	<Book {book} />
{/each}
