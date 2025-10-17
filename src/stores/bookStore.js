import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useBookStore = defineStore('book', () => {

  const transactions = ref([]);
  const overdueList = ref([]);


  return {
    transactions,
    overdueList,
  };
});