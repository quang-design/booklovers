<script>
	import Like from '$lib/components/Like.svelte';

	let { data } = $props();
	let book = data.book;
</script>

<div class="mt-3 text-center">
	<h1 class="text-3xl font-bold">Title: {book.title}</h1>
</div>
<div class="mt-2 text-center">
	<h2 class="text-2xl">Author: {book.author}</h2>
</div>
<div class="mt-2 flex justify-center">
	<img class="max-h-80" src={book.main_picture} alt={book.title} />
</div>
<div class="mt-2 flex justify-center">
	<img class="max-h-80" src={book.small_picture} alt={book.title} />
</div>
<div class="mt-3 text-center">
	<pre>{book.description}</pre>
</div>
<div class="mt-3 text-center">
	<Like {book} textAlign="center" />
</div>

<svelte:head>
	<title>Book Lovers - {book.title}</title>
</svelte:head>
