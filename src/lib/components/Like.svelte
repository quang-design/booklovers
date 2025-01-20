<script>
	import messagesStore from '$lib/stores/messages.store';
	import { Heart } from 'lucide-svelte';

	let { book, textAlign = 'left' } = $props();
	let submitting = $state(false);

	async function toggleLike() {
		try {
			submitting = true;
			const response = await fetch(`/like/${book.id}`);
			book = await response.json();
		} catch (error) {
			console.log(error);
			messagesStore.showError(error.message);
		}
		submitting = false;
	}
</script>

<div class="flex select-none items-center justify-center text-{textAlign} gap-1">
	{#if submitting}
		<img src="/loading.gif" alt="" />
	{:else if book.likedBook}
		<span class="text-xl">{book.likes}</span>
		<Heart class="h-8 w-8 cursor-pointer fill-red-500 text-red-500" onclick={toggleLike} />
	{:else}
		<span class="text-xl">{book.likes}</span>
		<Heart class="h-8 w-8 cursor-pointer text-red-500" onclick={toggleLike} />
	{/if}
</div>

<style>
</style>
