<script>
	import Book from '$lib/components/Books/Book.svelte';

	let { data = $bindable() } = $props();
	let books = $state(data.books);

	function filterUnlikedBooks(id) {
		books = books.filter((book) => book.id !== id);
	}
</script>

{#each books as book (book.id)}
	<Book {book} {filterUnlikedBooks} />
{/each}
