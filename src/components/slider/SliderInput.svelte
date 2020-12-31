<script lang="ts">
  export let min: number;
  export let max: number;
  export let incomingValue: number = 10.3;
  $: stateValue = incomingValue.toFixed(1).padStart(5, '0');
</script>

<style>
  input {
    border: none;
    padding: 0.05em;
    background: none;
    margin: none;
    margin-top: -0.8em;
    text-align: center;
    font-family: Nunito, 'sans-serif';
    font-weight: 700;
    width: 4.5rem;
    font-size: 1.5rem;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
  }
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<input
  type="number"
  bind:value={stateValue}
  inputmode="numeric"
  pattern="[0-9]*\.[0-9]"
  {min}
  {max}
  step="0.1"
  on:change />
