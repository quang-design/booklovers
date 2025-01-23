<script>
	import messagesStore from '$lib/stores/messages.store';
	import authStore from '$lib/stores/auth.store';
	import { Heart } from 'lucide-svelte';

	let { book, textAlign = 'left' } = $props();
	let submitting = $state(false);

	async function toggleLike() {
		if (!$authStore.isLoggedIn) {
			return;
		}
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

<div class="flex select-none text-{textAlign} gap-1">
	{#if submitting}
		<img src="/loading.gif" alt="" />
	{:else if book.likedBook}
		<span class="text-md">{book.likes}</span>
		<Heart
			class="h-6 w-6 
			{$authStore.isLoggedIn ? 'cursor-pointer' : 'cursor-not-allowed'}
				 fill-red-500 text-red-500"
			onclick={toggleLike}
		/>
	{:else}
		<span class="text-md">{book.likes}</span>
		<Heart
			class="h-6 w-6 
			{$authStore.isLoggedIn ? 'cursor-pointer' : 'cursor-not-allowed'}
			{book.likedBook ? 'fill-red-500' : 'text-red-500'}"
			onclick={toggleLike}
		/>
	{/if}
</div>

<style>
</style>
