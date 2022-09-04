<script lang="ts">
  import checkUserStatus from './lib/checkUserStatus.ts'

  import ConnectButton from './lib/ConnectButton.svelte'

  import WaveButton from './lib/WaveButton.svelte'
  
  import { user } from './lib/stores.ts'

  import { onMount } from 'svelte';

  import abi from "./lib/WavePortal.json";

  const contractAddress = "0x3648667314A5162f9D3CC08feac379A737B0Cf4D";

  const contractABI = abi.abi;

  let userValue

  onMount(checkUserStatus);

  user.subscribe((value) => {
    userValue = value
  })
</script>

<main>
  <h1>Welcome</h1>

  <p class="intro">
    I like 🐶
  </p>

  {#if userValue}
    {userValue}
    <WaveButton contractAddress={contractAddress} contractABI={contractABI} />
  {:else}
    <ConnectButton />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
  .intro {
    color: #888;
  }
</style>