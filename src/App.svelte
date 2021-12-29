<script>
  import { onMount } from 'svelte';
  import { cursor } from './store.js';
  import { Difficulty } from './stats.js';
  import { newAristocrat } from './crypto.js';
  import AristocratSolver from './AristocratSolver.svelte';

  let problem = null;
  let difficulty = Difficulty.MEDIUM;

  const newProblem = () => {
    problem = newAristocrat(difficulty);
  };

  onMount(newProblem);
</script>

<main>
  {#if problem}
    <AristocratSolver {...problem} />
  {/if}
</main>

<style>
</style>
