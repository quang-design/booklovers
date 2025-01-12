<script>
	import { goto } from '$app/navigation';
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import { resetPassword } from '$lib/firebase/auth.client';
	import messagesStore from '$lib/stores/messages.store';

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const formData = new FormData(e.target);
			const email = formData.get('email');
			await resetPassword(email);
			goto('/login');
			alert('Password reset email sent.');
		} catch (error) {
			if (error.code === 'auth/user-not-found') {
				messagesStore.showError('User not found.');
				return;
			}
			messagesStore.showError('Something went wrong.');
		}
	}
</script>

<div class="flex flex-col space-y-4">
	<h1 class="text-3xl font-bold">Forgot password</h1>
</div>

<AuthForm btnName="Reset password" hidePassword={true} {handleSubmit} />

<svelte:head>
	<title>Book Lovers - Forgot password</title>
</svelte:head>
