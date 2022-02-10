<script>
  import { alphabet } from './crypto.js';

  export let quote = '';

  /** @type {(quote: string) => { letter: string, freq: number }[]}*/
  const getFrequencies = quote => {
    const lettersToCount = new Set(alphabet);
    /** @type {Map<string, number>} */
    const frequencies = new Map([...alphabet].map(l => [l, 0]));

    for (const c of quote) {
      if (!lettersToCount.has(c)) continue;
      frequencies.set(c, (frequencies.get(c) ?? 0) + 1);
    }

    return [...frequencies.entries()]
      .map(([letter, freq]) => ({ letter, freq }))
      .sort((a, b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0));
  };

  $: frequencies = getFrequencies(quote);
</script>

<div class="frequencies">
  {#each frequencies as freq}
    <div class="letter-count">
      <div class="letter">{freq.letter}</div>
      <div class="frequency">{freq.freq}</div>
    </div>
  {/each}
  </div>

<style>
  .frequencies {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 2rem;
  }
</style>