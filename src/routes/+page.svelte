<script>
	import { goto } from '$app/navigation';

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

<ul>
	{#each data.books as book}
		<li>{book.title}</li>
	{/each}
</ul>

<div class="flex justify-center gap-4">
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
