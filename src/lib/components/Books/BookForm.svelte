<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
	let submitting = $state(false);

	function submitForm(e) {
		submitting = true;
	}

	$effect(() => {
		if (form && form.success === false) {
			submitting = false;
		}
	});
</script>

<form onsubmit={submitForm} enctype="multipart/form-data" method="POST" use:enhance>
	<div class="mb-3">
		<label for="title" class="block text-sm font-medium text-gray-700">Book Title</label>
		<input
			type="text"
			name="title"
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			id="title"
			value={form?.title || ''}
			class:is-invalid={form?.error_title}
			placeholder="Book Title"
		/>
		{#if form?.error_title}
			<p class="mt-2 text-sm text-red-600 dark:text-red-500">{form?.error_title}</p>
		{/if}
	</div>
	<div class="mb-3">
		<label for="author" class="block text-sm font-medium text-gray-700">Author</label>
		<input
			type="text"
			name="author"
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			id="author"
			value={form?.author || ''}
			class:is-invalid={form?.error_author}
			placeholder="Author"
		/>
		{#if form?.error_author}
			<p class="mt-2 text-sm text-red-600 dark:text-red-500">{form?.error_author}</p>
		{/if}
	</div>
	<div class="mb-3">
		<label for="short_description" class="block text-sm font-medium text-gray-700"
			>Short Description</label
		>
		<input
			type="text"
			name="short_description"
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			id="short_description"
			value={form?.short_description || ''}
			class:is-invalid={form?.error_short_description}
			placeholder="Enter short description"
		/>
		{#if form?.error_short_description}
			<p class="mt-2 text-sm text-red-600 dark:text-red-500">{form?.error_short_description}</p>
		{/if}
	</div>
	<div class="mb-3">
		<label class="block text-sm font-medium text-gray-700" for="description">Description</label>
		<textarea
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			placeholder="Book Description here"
			id="description"
			name="description"
			style="height: 100px"
			class:is-invalid={form?.error_description}>{form?.description || ''}</textarea
		>
		{#if form?.error_description}
			<p class="mt-2 text-sm text-red-600 dark:text-red-500">{form?.error_description}</p>
		{/if}
	</div>
	<div class="mb-3">
		<label for="main_picture" class="block text-sm font-medium text-gray-700">
			Main Book Picture
		</label>
		<input
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			id="main_picture"
			accept="image/*"
			name="main_picture"
			type="file"
			class:is-invalid={form?.error_main_picture}
		/>
		{#if form?.error_main_picture}
			<p class="mt-2 text-sm text-red-600 dark:text-red-500">{form?.error_main_picture}</p>
		{/if}
	</div>
	<div class="mb-3">
		<label for="small_picture" class="block text-sm font-medium text-gray-700">
			Small Book Picture
		</label>
		<input
			class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
			id="small_picture"
			accept="image/*"
			name="small_picture"
			type="file"
			class:is-invalid={form?.error_small_picture}
		/>
		{#if form?.error_small_picture}
			<p class="mt-2 text-sm text-red-600 dark:text-red-500">{form?.error_small_picture}</p>
		{/if}
	</div>
	<button
		disabled={submitting}
		type="submit"
		class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
	>
		{submitting ? 'Submitting...' : 'Submit'}
	</button>
</form>

<style>
	.is-invalid {
		@apply border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 dark:invalid:border-red-400 dark:invalid:text-red-400 dark:focus:invalid:border-red-400 dark:focus:invalid:ring-1 dark:focus:invalid:ring-red-400;
	}
</style>
