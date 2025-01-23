<script>
	import { page } from '$app/state';

	let { children } = $props();
</script>

<h1>Profile</h1>

<div class="w-full">
	<nav class="border-b border-gray-200">
		<ul class="-mb-px flex flex-wrap">
			<li class="mr-2">
				<a
					class="inline-block border-solid px-4 py-2 text-sm font-medium text-blue-500 hover:bg-gray-100 hover:text-blue-600
					{page.url.pathname === '/profile' ? 'border-l border-r border-t border-gray-200 bg-white' : ''}"
					aria-current="page"
					href="/profile"
				>
					My Books
				</a>
			</li>
			<li class="mr-2">
				<a
					class="inline-block border-solid px-4 py-2 text-sm font-medium text-blue-500 hover:bg-gray-100 hover:text-blue-600
					{page.url.pathname === '/profile/favorites'
						? 'border-l border-r border-t border-gray-200 bg-white'
						: ''}"
					href="/profile/favorites"
				>
					Favorites
				</a>
			</li>
		</ul>
	</nav>
</div>

{@render children()}

<svelte:head>
	<title>Book Lovers - Profile</title>
</svelte:head>
