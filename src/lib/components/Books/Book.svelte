<script>
	import Like from '$lib/components/Like.svelte';
	import { goto } from '$app/navigation';

	let { book, filterUnlikedBooks } = $props();
</script>

<button
	onclick={async () => await goto(`/book/${book.id}`)}
	type="button"
	class="mt-2 w-full justify-center gap-2 border border-gray-300 p-2 text-left md:flex"
>
	<div class="">
		<img
			class="m-1 aspect-[3/2] max-h-52 max-w-full object-cover"
			src={book.small_picture}
			alt={book.title}
		/>
	</div>
	<div class="flex w-full flex-col">
		<h2 class="m-1 break-all text-2xl font-bold">Title: {book.title}</h2>
		<h2 class="m-1 break-all text-xl font-bold">Author: {book.author}</h2>
		<p class="m-1 break-all">{book.description}</p>
		<Like {book} textAlign="left" {filterUnlikedBooks} />
	</div>
</button>
