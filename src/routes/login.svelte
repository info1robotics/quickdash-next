<script lang="ts">
    import { SupabaseClient } from "@supabase/supabase-js";
    import { supabase, user } from "$lib/supabase";

    let loading = false;
    let triedToLogIn = false;

    let email = "";
    let password = "";

    async function handleSignIn() {
        triedToLogIn = true;
        try {
            loading = true
            const { error } = await supabase.auth.signIn({ email, password })
            if (error) throw error
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            loading = false
        }

    }

    async function handleSignOut() {
        try {
            loading = true
            const { error } = await supabase.auth.signOut();
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            loading = false
        }
    }
</script>

<div class="flex justify-center">

    {#if $user}
        <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded py-2 px-4" on:click={handleSignOut}>Sign out</button>
    {:else}
        <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={handleSignIn}>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email Address
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" bind:value={email} type="text" placeholder="ion@example.com">
            </div>
            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input class="shadow appearance-none border {triedToLogIn && !password.length? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" bind:value={password} type="password" placeholder="******************">
            {#if triedToLogIn && !password.length}
                <p class="text-red-500 text-xs italic">Please enter your password.</p>
            {/if}
            </div>
            <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
            </a>
            </div>
        </form>
        </div>
    {/if}
</div>