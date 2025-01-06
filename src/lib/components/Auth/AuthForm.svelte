<script>
	let { btnName, handleSubmit, email = $bindable(), password = $bindable() } = $props();
</script>

<form onsubmit={handleSubmit}>
	<div class="mb-3">
		<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
		<input
			type="email"
			name="email"
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			id="email"
			placeholder="Email"
			bind:value={email}
			required
		/>
	</div>
	<div class="mb-3">
		<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
		<input
			type="password"
			name="password"
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			id="password"
			placeholder="*********"
			bind:value={password}
			required
		/>
	</div>
	<button
		type="submit"
		class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
	>
		{btnName}
	</button>
</form>
