<script lang="ts">
  import checkUserStatus from './lib/checkUserStatus.ts'

  import ConnectButton from './lib/ConnectButton.svelte'

  import WaveButton from './lib/WaveButton.svelte'
  
  import { user, waves } from './lib/stores.ts'

  import { onMount } from 'svelte';

  import abi from "./lib/WavePortal.json";

  import { ethers } from 'ethers';

  let newWaveText;

  const contractAddress = "0x20f6bF1B787eE562014b30dC1A11279BFf90477D";

  const contractABI = abi.abi;

  onMount(checkUserStatus);

  const onWavePosted = (event) => {
    const { message } = event.detail;
    newWaveText = "";

    waves.update(() => [...$waves, { message }]);
  }

  const loadWaves = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.warn("Please install metamask browser plugin.")
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    const _waves = await wavePortalContract.getWaves();

    console.log(_waves);

    waves.update(() => 
      _waves.map((wave) => ({ message: wave.message }))
    );
  } 

  user.subscribe(async () => {
    if(!user) return;

    loadWaves();
  })

  $: console.log($user);

</script>

<main>
  <h1>Welcome</h1>

  <p class="intro">
    I like 🐶
  </p>

  {#each $waves as wave}
    <card>
      {wave.message}
    </card>
  {/each}

  {#if $user}
    {$user}
    <textarea bind:value={newWaveText} />
    <WaveButton on:wavePosted={onWavePosted} waveText={newWaveText} contractAddress={contractAddress} contractABI={contractABI} />
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