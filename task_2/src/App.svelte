<script lang="ts">
  import { onMount } from "svelte";
  const url =
    "https://v6.exchangerate-api.com/v6/afe8afa68f36396a84acd3ef/latest/";
  $: fetchData(currency, amount, toCurrency);
  let currency: string = "USD";
  let toCurrency: string = "EUR";
  let amount: number = 0;
  let data: any;
  let newData: number = 0;
  let isError = false;
  let count = 0;
  $: console.log(count);

  async function fetchData(curr: string, amount: number, to: string) {
    isError = false;
    try {
      const response = await fetch(`${url}${curr}`);
      data = await response.json();
      newData = data.conversion_rates[to] * amount;
      count++;
      return data;
    } catch (error) {
      console.error("Fetch Error:", error);
      isError = true;
    }
  }
</script>

{#if isError}
  <h1>Oops, something went wrong</h1>
{:else}
  <main>
    <h1>Currency Converter</h1>
    <form class="currency-form">
      <!-- amount -->
      <div class="wrapper">
        <label for="init-amount">Amount to change</label>
        <input
          bind:value={amount}
          type="number"
          id="init-amount"
          name="init-amount"
          min="0"
          class="init-amount"
          placeholder="enter desired amount"
        />
      </div>
      <!-- convert from -->
      <div class="currency-container">
        <div class="wrapper">
          <h4>Choose your currency</h4>

          <select bind:value={currency}>
            {#if data}
              {#each Object.keys(data.conversion_rates) as rate}
                <option value={rate}>{rate}</option>
              {/each}
            {/if}
          </select>
          <!-- {console.log(data.conversion_rates["AFN"])} -->
        </div>

        <!-- convert to -->
        <div class="wrapper">
          <h4>Choose your currency</h4>
          <select bind:value={toCurrency}>
            {#if data}
              {#each Object.keys(data.conversion_rates) as rate}
                <option value={rate}>{rate}</option>
              {/each}
            {/if}
          </select>
        </div>
      </div>
    </form>

    <h2 class="result">
      {amount === null || undefined ? 0 : amount}{currency} = {newData.toFixed(
        2
      )}{toCurrency}
    </h2>
  </main>
{/if}

<style>
  main {
    background-color: rgb(212, 216, 227);
    min-height: 50vh;
    display: grid;
    align-items: center;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 12px rgb(3, 6, 59);
  }
  .currency-container {
    display: flex;
    align-items: center;
    gap: 5rem;
  }
  select,
  .init-amount {
    /* background-color: rgb(193, 231, 207); */
    width: 8rem;
    height: 2rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 600;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    padding: 0.5rem 0.7rem;
    text-transform: capitalize;
  }
  .init-amount {
    width: 15rem;
  }
</style>
