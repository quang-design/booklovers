<script>
	import { page } from '$app/state';
	import { logout } from '$lib/firebase/auth.client';
	import { Menu, X } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import messagesStore from '$lib/stores/messages.store';

	let { isLoggedIn } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	async function handleLogout() {
		toggleMenu();
		try {
			await logout();
			goto('/');
		} catch (error) {
			console.log(error);
			messagesStore.showError(error.message);
		}
	}
</script>

<nav class="border-b border-gray-200 bg-white px-4 py-2.5">
	<div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between">
		<a href="/" class="text-xl font-semibold">Book Lover</a>

		<button
			class="ml-3 inline-flex items-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
			onclick={toggleMenu}
			aria-controls="navbar-menu"
			aria-expanded={isMenuOpen}
		>
			<span class="sr-only">Open main menu</span>
			{#if isMenuOpen}
				<X />
			{:else}
				<Menu />
			{/if}
		</button>

		<div
			class="min-h-screen w-full text-gray-400 md:block md:min-h-full md:w-auto
            {isMenuOpen ? 'block' : 'hidden'}"
			id="navbar-menu"
		>
			{#if isLoggedIn}
				<ul class="mt-4 flex flex-col md:mt-0 md:flex-row md:gap-6">
					<a
						href="/"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/'}
						onclick={toggleMenu}>Home</a
					>
					<a
						href="/add"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/add'}
						onclick={toggleMenu}>Add Book</a
					>
					<a
						href="/profile"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/profile'}
						onclick={toggleMenu}>Profile</a
					>
					<a
						href="/about"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/about'}
						onclick={toggleMenu}>About</a
					>
					<button class="py-2 text-left hover:text-gray-600" onclick={handleLogout}>
						Logout
					</button>
				</ul>
			{:else}
				<ul class="mt-4 flex flex-col md:mt-0 md:flex-row md:gap-6">
					<a
						href="/"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/'}
						onclick={toggleMenu}>Home</a
					>
					<a
						href="/about"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/about'}
						onclick={toggleMenu}>About</a
					>
					<a
						href="/login"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/login'}
						onclick={toggleMenu}>Login</a
					>
					<a
						href="/signup"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={page.url.pathname === '/signup'}
						onclick={toggleMenu}>Sign Up</a
					>
				</ul>
			{/if}
		</div>
	</div>
</nav>
