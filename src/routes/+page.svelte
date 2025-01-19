<script>
	$effect(async () => {
		const response = await fetch('/like/mZjseyEmGjUL3d6WDT4I');

		const json = await response.json();
		console.log(json, 'book');
	});
</script>
