<script lang="ts">
  import ConnectButton from './lib/ConnectButton.svelte'
  import { user } from './lib/stores.ts'

  import { onMount } from 'svelte';

  let userValue

  onMount(async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.warn("Please install metamask browser plugin.")
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts[0]) {
      user.update(() => accounts[0]);
    }
  });

  user.subscribe((value) => {
    userValue = value
  })

</script>

<main>
  <h1>Welcome</h1>

  <p class="intro">
    I like 🐶
  </p>

  <div class="card">
    {#if userValue}
      {userValue}
    {:else}
      <ConnectButton />
    {/if}
  </div>

</main>

<style>
  .intro {
    color: #888;
  }
</style>