<script>
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';
	let isLoggedIn = $state(false);
	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav class="bg-white border-b border-gray-200 px-4 py-2.5">
	<div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
		<a href="/" class="text-xl font-semibold">Book Lover</a>

		<button
			class="inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
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
			class="w-full min-h-screen md:block md:w-auto md:min-h-full text-gray-400
            {isMenuOpen ? 'block' : 'hidden'}"
			id="navbar-menu"
		>
			{#if isLoggedIn}
				<div class="flex flex-col md:flex-row md:gap-6 mt-4 md:mt-0">
					<a
						href="/"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/'}
						onclick={toggleMenu}>Home</a
					>
					<a
						href="/add-book"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/add-book'}
						onclick={toggleMenu}>Add Book</a
					>
					<a
						href="/profile"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/profile'}
						onclick={toggleMenu}>Profile</a
					>
					<a
						href="/about"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/about'}
						onclick={toggleMenu}>About</a
					>
					<a
						href="/logout"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/logout'}
						onclick={toggleMenu}>Logout</a
					>
				</div>
			{:else}
				<div class="flex flex-col md:flex-row md:gap-6 mt-4 md:mt-0">
					<a
						href="/"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/'}
						onclick={toggleMenu}>Home</a
					>
					<a
						href="/about"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/about'}
						onclick={toggleMenu}>About</a
					>
					<a
						href="/login"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/login'}
						onclick={toggleMenu}>Login</a
					>
					<a
						href="/signup"
						class="py-2 hover:text-gray-600"
						class:text-gray-900={$page.url.pathname === '/signup'}
						onclick={toggleMenu}>Sign Up</a
					>
				</div>
			{/if}
		</div>
	</div>
</nav>
