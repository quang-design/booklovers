<script>
	import LoginWithGoogle from '$lib/components/Auth/LoginWithGoogle.svelte';
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import { loginWithEmailAndPassword } from '$lib/firebase/auth.client';
	import messagesStore from '$lib/stores/messages.store';
	import { afterLogin } from '$lib/helpers/route.helper';
	import { page } from '$app/state';

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const formData = new FormData(e.target);
			const email = formData.get('email');
			const password = formData.get('password');
			const user = await loginWithEmailAndPassword(email, password);
			await afterLogin(page.url, user.uid);
			console.log(user);
		} catch (error) {
			console.log(error.code);
			if (error.code === 'auth/invalid-credential') {
				messagesStore.showError('Invalid email or password.');
				return;
			}
			messagesStore.showError();
		}
	}
</script>

<div class="flex flex-col space-y-4">
	<h1 class="text-3xl font-bold">Login</h1>
</div>

<hr />
<AuthForm btnName="Login" {handleSubmit} />
<hr />
<LoginWithGoogle />
<hr />
<a href="/forgot-password" class="text-blue-500">Forgot password</a>

<svelte:head>
	<title>Book Lovers - Login</title>
</svelte:head>
