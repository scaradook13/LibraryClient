<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <!-- Summary Boxes -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
      <div class="bg-white border-2 border-gray-800 rounded-lg p-6 sm:p-8 text-center shadow-md">
        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Total Available Books</h3>
        <p class="text-2xl sm:text-3xl font-bold text-gray-600 mt-2">{{ totalBooks }}</p>
      </div>

      <div class="bg-white border-2 border-gray-800 rounded-lg p-6 sm:p-8 text-center shadow-md">
        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Borrowed Books</h3>
        <p class="text-2xl sm:text-3xl font-bold text-gray-600 mt-2">{{ totalBorrowers }}</p>
      </div>

      <div class="bg-white border-2 border-gray-800 rounded-lg p-6 sm:p-8 text-center shadow-md">
        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Overdue Books</h3>
        <p class="text-2xl sm:text-3xl font-bold text-gray-600 mt-2">{{ overdue }}</p>
      </div>
    </div>

    <!-- Transaction Table -->
    <div class="bg-white border-2 border-gray-800 rounded-lg shadow-md overflow-hidden">
      <div class="flex flex-col sm:flex-row items-center sm:justify-between p-4 sm:p-6 border-b">
        <h3
        class="text-xl sm:text-2xl font-bold text-gray-800 p-4 sm:p-6 text-center sm:text-left"
      >
        Recent Transactions
        </h3>
        <!-- Search Bar -->
        <div class="relative w-full sm:w-64">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search transactions..."
            class="w-full pl-10 pr-3 py-2 border-2 border-gray-800 rounded-lg font-semibold text-sm sm:text-base"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-xs sm:text-sm text-left">
          <thead class="bg-yellow-400 text-gray-900 uppercase font-bold">
            <tr>
              <th class="px-3 sm:px-6 py-3">Borrower</th>
              <th class="px-3 sm:px-6 py-3">Book Title</th>
              <th class="px-3 sm:px-6 py-3">Date Borrowed</th>
              <th class="px-3 sm:px-6 py-3">Due Date</th>
              <th class="px-3 sm:px-6 py-3">Date Returned</th>
              <th class="px-3 sm:px-6 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(transaction, index) in filteredTransactionList"
              :key="index"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
                {{ transaction.borrowerName }}
              </td>
              <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
                {{ transaction.bookTitle }}
              </td>
              <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
                {{ formatDate(transaction.dateBorrowed) }}
              </td>
              <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
                {{ formatDate(transaction.dueDate) }}
              </td>
              <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
                {{ transaction.dateReturned ? formatDate(transaction.dateReturned) : '—' }}
              </td>
              <td class="px-3 sm:px-6 py-3 text-center">
                <span
                  class="px-3 py-1 rounded-full text-white text-[11px] sm:text-xs font-semibold"
                  :class="{
                    'bg-yellow-500': transaction.status === 'Borrowed',
                    'bg-green-600': transaction.status === 'Returned',
                    'bg-red-600': transaction.status === 'Overdue'
                  }"
                >
                  {{ transaction.status }}
                </span>
              </td>
            </tr>

            <tr v-if="transactions.length === 0">
              <td colspan="6" class="text-center py-6 text-gray-500 text-sm sm:text-base">
                No transactions found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLibraryStore } from "@/stores/library";
import { storeToRefs } from "pinia";

const libraryStore = useLibraryStore();
const { totalBooks, totalBorrowers, overdue, transactions } = storeToRefs(libraryStore);

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


const searchQuery = ref("");

const filteredTransactionList = computed(() => {
  if (!searchQuery.value.trim()) return transactions.value;
  const query = searchQuery.value.toLowerCase();

  return transactions.value.filter((b) => {
    const dateBorrowed = b.dateBorrowed?.toLowerCase() || '';
    const dueDate = b.dueDate?.toLowerCase() || '';
    const dateReturned = b.dateReturned?.toLowerCase() || '';

    return (
      b.status.toLowerCase().includes(query) ||
      b.borrowerName.toLowerCase().includes(query) ||
      b.bookTitle.toLowerCase().includes(query) ||
      dateBorrowed.includes(query) ||
      dueDate.includes(query) ||
      dateReturned.includes(query)
    );
  });
});

</script>

<style scoped>
table th,
table td {
  border-bottom: 1px solid #ddd;
}
</style>
