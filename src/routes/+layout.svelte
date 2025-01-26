<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { X } from 'lucide-svelte';
	import messagesStore from '$lib/stores/messages.store';
	import '$lib/firebase/firebase.client';
	import { sendJWTToken } from '$lib/firebase/auth.client';
	import authStore from '$lib/stores/auth.store';
	import bookNotifyStore from '$lib/stores/book-notify.store';

	let { data, children } = $props();

	let notifyBook = $state(null);
	let isLoggedIn = $derived($authStore.isActive ? $authStore.isLoggedIn : data.isLoggedIn);

	function closeMessage() {
		messagesStore.hide();
	}

	function closeBookNotify() {
		notifyBook = null;
	}

	$effect(() => {
		const refreshToken = async () => {
			try {
				await sendJWTToken();
			} catch (error) {
				console.log(error);
				messagesStore.showError();
			}
		};

		// Initial token refresh
		refreshToken();

		// Set up interval for token refresh
		const timerId = setInterval(refreshToken, 1000 * 10 * 60);

		const unsubscribeBookNotify = bookNotifyStore.subscribe((book) => {
			if (!$authStore.isLoggedIn) {
				notifyBook = book;
				return;
			}

			if (book && $authStore.userId !== book.user_id) {
				notifyBook = book;
				return;
			}
		});

		// Cleanup function
		return () => {
			clearInterval(timerId);
			unsubscribeBookNotify();
		};
	});
</script>

<Nav {isLoggedIn} />

<main class="px-4 py-2.5">
	<div class="mx-auto max-w-7xl">
		{#if $messagesStore.show}
			{@render messageSnippet()}
		{/if}
		{@render children()}
		{#if notifyBook}
			<div
				class="fixed right-0 top-0 m-3 rounded-md border border-green-200 bg-green-500/10 p-4 shadow-lg backdrop-blur-sm"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<div class="flex w-full items-center justify-between">
					<strong class="font-bold">New Book</strong>
					<button
						type="button"
						class="ml-2 text-sm font-medium text-gray-700 hover:text-gray-900"
						onclick={closeBookNotify}
					>
						<X class="h-4 w-4" />
					</button>
				</div>

				<div class="mt-2">
					Book <a href="/book/{notifyBook?.id}" class="text-blue-500 hover:text-blue-600"
						>{notifyBook?.title}</a
					> just created!!
				</div>
			</div>
		{/if}
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
