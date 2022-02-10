<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { splitText, SPLIT } from './crypto.js';
  import FrequencyCounter from './FrequencyCounter.svelte';
  import Word from './Word.svelte';
  import { allWordsPotentiallySolved, cursor } from './store.js';

  export let plaintext = '';
  export let ciphertext = '';
  export let author = '';
  export let allWordsSolved = false;

  onMount(() => {
    allWordsPotentiallySolved.set(false);
    cursor.set(-1);
  });

  const dispatch = createEventDispatcher();

  const isValidCursorPosition = pos => splits.some(
    s => s.type == SPLIT.WORD && s.index <= pos && pos < s.index + s.content.length
  );

  const moveCursorForward = () => {
    let newCursor = $cursor + 1;
    for (;!isValidCursorPosition(newCursor) && newCursor < plaintext.length * 2; ++newCursor);
    if (isValidCursorPosition(newCursor)) {
      cursor.set(newCursor);
    }
  };

  const moveCursorBackward = () => {
    let newCursor = $cursor - 1;
    for (;!isValidCursorPosition(newCursor) && 0 <= newCursor; --newCursor);
    if (isValidCursorPosition(newCursor)) {
      cursor.set(newCursor);
    }
  };

  $: splits = splitText(ciphertext);
  $: plainSplits = splitText(plaintext);
  $: if ($allWordsPotentiallySolved) {
    setTimeout(() => {
      if ($allWordsPotentiallySolved) {
        allWordsSolved = true;
        dispatch('solved');
      }
    }, 10);
  }
  $: if (!$allWordsPotentiallySolved) {
    allWordsSolved = false;
  }
</script>

<p>Solve the following aristocrat by {author ?? 'unknown'}.</p>

<p>Frequencies:</p>
<FrequencyCounter quote={ciphertext} />

<div class="aristocrat">
  {#each splits as split, i}
    {#if split.type == SPLIT.WORD}
      <Word
        cipherword={split.content}
        plainword={plainSplits[i].content}
        startIdx={split.index}
        on:cursor-forward={moveCursorForward}
        on:cursor-backward={moveCursorBackward}
      />
    {:else}
      <div class="non-word">{split.content}</div>
    {/if}
  {/each}
</div>

<style>
  .aristocrat {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .non-word {
    margin-right: 2rem;
  }
</style>
