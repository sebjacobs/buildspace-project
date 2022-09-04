<script lang="ts">
  import checkUserStatus from './lib/checkUserStatus.ts'

  import ConnectButton from './lib/ConnectButton.svelte'
  import { user } from './lib/stores.ts'

  import { onMount } from 'svelte';

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