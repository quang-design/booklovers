<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { X } from 'lucide-svelte';
	import messagesStore from '$lib/stores/messages.store';
	import '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';
	import { sendJWTToken } from '$lib/firebase/auth.client';
	let timerId;

	async function sendServerToken() {
		try {
			await sendJWTToken();
		} catch (error) {
			clearInterval(timerId);
			messagesStore.showError();
			console.log(error);
		}
	}

	onMount(async () => {
		try {
			await sendServerToken();
			timerId = setInterval(
				async () => {
					await sendServerToken();
				},
				1000 * 10 * 60
			);
		} catch (error) {
			console.log(error);
			messagesStore.showError();
		}

		return () => {
			clearInterval(timerId);
		};
	});

	let { children } = $props();

	$effect(() => {
		// messagesStore.showError();
		return () => {};
	});

	function closeMessage() {
		messagesStore.hide();
	}
</script>

<Nav />
<main class="px-4 py-2.5">
	<div class="mx-auto max-w-7xl">
		{#if $messagesStore.show}
			{@render messageSnippet()}
		{/if}
		{@render children()}
	</div>
</main>

{#snippet messageSnippet()}
	<div class="my-3 flex flex-wrap">
		<div class="w-full">
			<div
				class="flex justify-between rounded border p-4
				{$messagesStore.type === 'error'
					? 'border-red-200 bg-red-500/10 text-red-500'
					: 'border-green-200 bg-green-500/10 text-green-500'}"
				role="alert"
			>
				<p>
					<strong>{$messagesStore.type === 'error' ? 'Error:' : 'Success:'}</strong>
					{$messagesStore.message}
				</p>
				<button
					type="button"
					class="text-red-500hover:text-red-600"
					aria-label="Close"
					onclick={closeMessage}
				>
					<X />
				</button>
			</div>
		</div>
	</div>
{/snippet}
