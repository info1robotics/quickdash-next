<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import { Stay, stays, staysSubscribe } from '$lib/stays';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import '../app.css';
	import "../styles/tailwind-output.css";

	onMount(async () => {
		const { data, error } = await supabase.from('stays').select().is('endDate', null);
		
		stays.update(s => data as Stay[]);
		staysSubscribe.subscribe();
	});

</script>

<Header />

<main>
	<slot />
</main>

<footer>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
