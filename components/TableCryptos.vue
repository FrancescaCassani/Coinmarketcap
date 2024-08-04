<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>

    <table v-else class="min-w-full rounded-lg overflow-hidden">
      <thead class="bg-gray-800 text-white">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-widest" v-for="columnName in columnNames" :key="columnName.key">{{ columnName.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(crypto, index) in cryptos" :key="crypto.id" :class="{ 'bg-gray-50': index % 2 === 0, 'bg-white': index % 2 !== 0 }">
        <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">{{ crypto.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">{{ crypto.symbol }}</td>
        <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">{{ sanitizePrice(crypto.quote.USD.price) }}</td>
        <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">{{ sanitizeCirculatingSupply(crypto.circulating_supply) }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ formatterDate(crypto.last_updated) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {format} from 'date-fns';
import type { Crypto } from '~/types/types';

const loading = ref(true);
const cryptos = ref<Crypto[]>([]);

const columnNames = [
  { key: 'name', label: 'Name' },
  { key: 'symbol', label: 'Symbol' },
  { key: 'price', label: 'Price' },
  { key: 'circulatingSupply', label: 'Circulating Supply' },
  { key: 'lastUpdated', label: 'Last Updated' }
];

onMounted(async () => {
  await fetchCryptos();
});


// Fetch data
const fetchCryptos = async () => {
  try {
    const response = await fetch('/api/api');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Crypto[] = await response.json();
    cryptos.value = getCryptosOrderedByMarketCap(data);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Order data from market_cap in descending order
const getCryptosOrderedByMarketCap = (cryptos: Crypto[]): Crypto[] => {
  return cryptos.sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap);
};

// Sanitize price to show only the integer part
const sanitizePrice = (price: number) => `$${Math.floor(price)}`;

// Sanitize circulating supply to show only 3 decimal places and adding commas to separate thousands
const sanitizeCirculatingSupply = (circulatingSupply: number) => (circulatingSupply / 1000).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

// Format date
const formatterDate = (params: string) => format(new Date(params), "eeee dd MMMM, hh:mmaaa");
</script>