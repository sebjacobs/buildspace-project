<script lang="ts">
  import { ethers } from 'ethers';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let waveText;
  export let contractAddress;
  export let contractABI;

  const wave = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.warn("Please install metamask browser plugin.")
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
            
    let wavesCount = await contract.getTotalWaves();

    console.log("Number of waves: ", wavesCount.toNumber());

    const transaction = await contract.wave(waveText);

    console.log("Mining...", transaction.hash);

    await transaction.wait();

    console.log("Mined...", transaction.hash);

    wavesCount = await contract.getTotalWaves();

    console.log("Number of waves: ", wavesCount.toNumber());

    dispatch('wavePosted', { message: waveText });
  }

</script>

<button on:click={wave}>Wave</button>