<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Il valore di Bitcoin è ${{ bitcoinPrice }}</h1>
    <p class="text-gray-500 mb-4">La cryptovaluta con maggior Market Cap dopo Bitcoin è {{ topCrypto.name }} con valore ${{ topCrypto.price }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Crypto, CryptoFrontend } from '~/types/types';

// Fetch data from the API defined in api.js
const { data } = await useFetch("/api/api");

// Retrieve Bitcoin data
const bitcoin = data.value?.find((crypto: Crypto) => crypto.symbol === 'BTC');

// Retrieve Bitcoin price
const bitcoinPrice = bitcoin
    ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(bitcoin.quote.USD.price)
    : 'N/A';

// Retrieve all cryptocurrencies except Bitcoin
const nonBitcoinCryptos = data.value?.filter((crypto: Crypto) => crypto.symbol !== 'BTC');

// Find the maximum market_cap value
const maxMarketCap = Math.max(...nonBitcoinCryptos.map((crypto: Crypto) => crypto.quote.USD.market_cap));

// Find the cryptocurrency with the maximum market_cap value
const topCryptoData = nonBitcoinCryptos.find((crypto: Crypto) => crypto.quote.USD.market_cap === maxMarketCap);

// Create a FrontEnd object with the name and price of the cryptocurrency with the maximum market_cap value
const topCrypto = ref<CryptoFrontend>({
  name: topCryptoData?.name || 'N/A',
  price: new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(topCryptoData?.quote.USD.price) || 'N/A'
});

</script>
