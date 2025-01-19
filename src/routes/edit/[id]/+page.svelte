<script>
	import BookForm from '$lib/components/Books/BookForm.svelte';

	let { data, form } = $props();
</script>

<BookForm form={{ ...data.book, ...form }} />
