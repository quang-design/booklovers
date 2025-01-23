<script>
	import { goto } from '$app/navigation';
	import Book from '$lib/components/Books/Book.svelte';

	let { data } = $props();
	// console.log(data);

	async function back() {
		try {
			await goto(`?page=${data.page - 1}`);
		} catch (e) {
			console.log(e);
			messagesStore.showError(e.message);
		}
	}

	async function forward() {
		try {
			if (data.next) {
				await goto(`?page=${+data.page + 1}`);
			}
		} catch (e) {
			console.log(e);
			messagesStore.showError(e.message);
		}
	}
</script>

<div class="row">
	<div class="col">
		<h1 class="text-3xl font-bold">Latest Books</h1>
		<h3 class="text-xl">Page: {data.page}</h3>
	</div>
</div>
{#each data.books as book}
	<Book {book} />
{/each}

<div class="mt-2 flex justify-center gap-4">
	<button
		class="rounded-xl border bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
		disabled={!data.previous}
		onclick={back}
	>
		Previous
	</button>
	<button
		class="rounded-xl border bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
		disabled={!data.next}
		onclick={forward}
	>
		Next
	</button>
</div>

<svelte:head>
	<title>Book Lovers</title>
</svelte:head>
