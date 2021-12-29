<script>
  import { createEventDispatcher } from 'svelte';
  import { allWordsPotentiallySolved, cursor } from './store.js';

  export let cipherword = '';
  export let plainword = '';
  export let startIdx = 0;

  let wordEl = null;

  const dispatch = createEventDispatcher();

  const onKeyDown = i => e => {
    const hasTextContent = e.key.length == 1;
    if (hasTextContent) {
      const newChars = [...userwordchars];
      newChars[i] = e.key.toUpperCase();
      userwordchars = newChars;
    }
    if (hasTextContent || e.key == 'ArrowRight') {
      setTimeout(() => dispatch('cursor-forward'), 10);
    }
    if (e.key == 'ArrowLeft' || e.key == 'Backspace') {
      setTimeout(() => dispatch('cursor-backward'), 10);
    }
  };

  const onFocus = i => () => {
    cursor.set(startIdx + i);
  };

  $: userwordchars = Array(cipherword.length).fill('');
  $: userword = userwordchars.join('');

  $: if (userword == plainword) {
    allWordsPotentiallySolved.set(true);
  }
  $: if (userword != plainword && $allWordsPotentiallySolved) {
    allWordsPotentiallySolved.set(false);
  }

  $: if (startIdx <= $cursor && $cursor < startIdx + cipherword.length && wordEl) {
    wordEl.querySelectorAll('.cipher-input')[$cursor - startIdx].focus();
  }
</script>

<div class="word" bind:this={wordEl}>
  {#each cipherword as cipherchar, i}
    <div class="char">
      <span class="cipher-char">{cipherchar}</span>
      <input
        class="cipher-input"
        value={userwordchars[i].toUpperCase()}
        size="1"
        maxlength="1"
        on:keydown={onKeyDown(i)}
        on:focus={onFocus(i)}
      />
    </div>
  {/each}
</div>

<style>
  .word {
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    padding-bottom: 1rem;
  }

  .char {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 0;
    margin: 0;
    width: 1rem;
  }
</style>
