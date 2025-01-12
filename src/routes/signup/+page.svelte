<script>
	import messagesStore from '$lib/stores/messages.store';
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import LoginWithGoogle from '$lib/components/Auth/LoginWithGoogle.svelte';
	import { registerWithEmailAndPassword } from '$lib/firebase/auth.client';
	import { goto } from '$app/navigation';
	import { afterLogin } from '$lib/helpers/route.helper';
	import { page } from '$app/state';

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const formData = new FormData(e.target);
			const email = formData.get('email');
			const password = formData.get('password');
			if (!email || !password) {
				messagesStore.showError('Please enter an email and password.');
				return;
			}
			if (password.length < 6) {
				messagesStore.showError('Password must be at least 6 characters long.');
				return;
			}
			const user = await registerWithEmailAndPassword(email, password);
			afterLogin(page.url, user.uid);
			console.log(user);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				messagesStore.showError('You have already signed up with this email. Please log in.');
				await goto('/login');
			}
			console.log(error);
			messagesStore.showError(error.message);
		}
	}
</script>

<div class="flex flex-col md:flex-row md:space-x-6">
	<div class="space-y-6">
		<h1 class="text-3xl font-bold">Sign Up</h1>
	</div>
</div>

<hr />

<AuthForm btnName="Sign Up" {handleSubmit} />

<hr />

<LoginWithGoogle />

<svelte:head>
	<title>Book Lovers - Sign Up</title>
</svelte:head>
