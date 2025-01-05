<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import messagesStore from '$lib/stores/messages.store';

	async function handleLoginWithGoogle() {
		try {
			const user = await loginWithGoogle();
			console.log(user);
		} catch (e) {
			if (e.code === 'auth/popup-closed-by-user') {
				console.log('Google login cancelled');
				return;
			}
			console.log(e);
			messagesStore.showError();
		}
	}
</script>

<div class="flex flex-row items-center justify-center">
	<button
		class="rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		onclick={handleLoginWithGoogle}
	>
		Login with Google
	</button>
</div>
