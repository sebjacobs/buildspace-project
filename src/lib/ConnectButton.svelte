<script lang="ts">
  import { user } from './stores.ts';

  const connect = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.warn("Please install metamask browser plugin.")
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

    if(accounts[0]) {
      user.update(() => accounts[0]);
    }
    
  }
</script>

<button on:click={connect}>
  Connect
</button>
