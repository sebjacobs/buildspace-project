<script lang="ts">
  import { ethers } from 'ethers';

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

    const transaction = await contract.wave();

    console.log("Mining...", transaction.hash);

    await transaction.wait();

    console.log("Mined...", transaction.hash);

    wavesCount = await contract.getTotalWaves();

    console.log("Number of waves: ", wavesCount.toNumber());
  }

</script>

<button on:click={wave}>Wave</button>