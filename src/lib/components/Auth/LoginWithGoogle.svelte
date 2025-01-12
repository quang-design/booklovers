<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import { afterLogin } from '$lib/helpers/route.helper';
	import messagesStore from '$lib/stores/messages.store';
	import { page } from '$app/state';

	async function handleLoginWithGoogle() {
		try {
			const user = await loginWithGoogle();
			await afterLogin(page.url, user.uid);
			console.log(user);
		} catch (e) {
			if (e.code === 'auth/popup-closed-by-user') {
				console.log('Google login cancelled');
				return;
			}
			console.error('Login error:', e);
			messagesStore.showError();
		}
	}
</script>

<div class="flex flex-row items-center justify-center">
	<button
		class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		onclick={handleLoginWithGoogle}
	>
		Login with Google
	</button>
</div>
