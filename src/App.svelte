<script>
  import { onMount } from 'svelte';
  import { cursor } from './store.js';
  import { Difficulty } from './stats.js';
  import { newAristocrat } from './crypto.js';
  import AristocratSolver from './AristocratSolver.svelte';

  let problem = null;
  let solved = false;
  let difficulty = Difficulty.MEDIUM;

  const newProblem = () => {
    problem = newAristocrat(difficulty);
  };

  onMount(newProblem);
</script>

<svelte:head>
  <title>Garbosters</title>
</svelte:head>

<main>
  {#if solved}
    <p class="solved-msg">Congratulations you solved the problem!</p>
  {/if}
  {#if problem}
    <AristocratSolver {...problem} bind:allWordsSolved={solved} />
  {/if}
  <button class="new-problem" on:click={newProblem}>
    New Problem
  </button>
</main>

<style>
  .solved-msg {
    color: green;
  }
</style>
