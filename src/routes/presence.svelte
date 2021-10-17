<script lang="ts">
	import { stays } from '$lib/stays';
	import { supabase, user } from '$lib/supabase';
	import { onDestroy, onMount } from 'svelte';

	let amICheckedIn = false;

	const staysUnsubscribe = stays.subscribe(val => {
		const myId = supabase.auth.user()?.id;
		amICheckedIn = val.find(v => v?.user === myId) !== undefined;
	});

	onDestroy(staysUnsubscribe);

	async function checkIn() {
		const { data, error } = await supabase
			.from('stays')
			.insert([
				{ user: supabase.auth.user()?.id }
			]);

	}

	async function checkOut() {
		const { data, error } = await supabase
			.from('stays')
			.update({ endDate: new Date()})
			.match({user: supabase.auth.user()?.id});
	}



</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	{#if $user}
		<div class="container w-100 flex flex-col justify-center">
				{#if amICheckedIn}
					<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={checkOut}>Check Out</button>
				{:else}
					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={checkIn}>Check In</button>
				{/if}

			<p class="text-center">Currently in Lab</p>
			<div class="container flex rounded-md shadow-md bg-white">
				{#each $stays as stay}
					<h1>{stay?.user}</h1>
					<h1>{stay?.startDate}</h1>
					<h1> || </h1>
				{/each}
			</div>

		</div>
	{/if}
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
