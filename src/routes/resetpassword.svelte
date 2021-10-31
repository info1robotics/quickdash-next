<script context="module" lang="ts">
	export async function load(res) {
		return {
			status: 200
		}
	}
</script>

<script lang="ts">
import { access_token } from "$lib/supabase";

import { onMount } from "svelte";

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.hash.substr(1));

		const token = urlParams.get("access_token");
		access_token.set(token)
	});

	let password = "";
	async function resetPassword() {
		
		if(password.length === 0) return;
		
		const response = await fetch('/api/resetpassword', {
			method: 'post',
			body: JSON.stringify({
				query: {
					access_token: $access_token,
					new_password: password, 
				}
			})
		});
		
		history.pushState({}, "", "/");
		history.go(0);


	}
</script>

<h1>Reset your Password</h1>
<input type="password" bind:value={password} class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
<button class="btn bg-green-400 p-3" on:click={resetPassword}>Request</button>

