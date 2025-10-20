<template>
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-3 gap-6 mb-6">
      <div class="bg-white border-2 border-gray-800 rounded-lg p-8 text-center shadow-md">
        <h3 class="text-xl font-bold text-gray-800">Total Available Books</h3>
        <p class="text-3xl font-bold text-gray-600 mt-2">{{ totalBooks }}</p>
      </div>
      <div class="bg-white border-2 border-gray-800 rounded-lg p-8 text-center shadow-md">
        <h3 class="text-xl font-bold text-gray-800">Borrowed Books</h3>
        <p class="text-3xl font-bold text-gray-600 mt-2">{{ totalBorrowers }}</p>
      </div>
      <div class="bg-white border-2 border-gray-800 rounded-lg p-8 text-center shadow-md">
        <h3 class="text-xl font-bold text-gray-800">Overdue Books</h3>
        <p class="text-3xl font-bold text-gray-600 mt-2">{{ overdue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLibraryStore } from '@/stores/library';
import { storeToRefs } from 'pinia';
const libraryStore = useLibraryStore();
const { totalBooks, totalBorrowers, overdue } = storeToRefs(libraryStore);
</script>