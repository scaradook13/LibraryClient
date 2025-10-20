<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
          Overdue List
        </h2>

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
            placeholder="Search borrower or book..."
            class="w-full pl-10 pr-3 py-2 border-2 border-gray-800 rounded-lg font-semibold text-sm sm:text-base"
          />
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-gray-200 rounded-lg p-4 sm:p-6 min-h-[300px] flex flex-col">
        <template v-if="filteredOverdueList.length">
          <div class="overflow-x-auto rounded-lg border border-gray-300">
            <table class="min-w-full border-collapse text-left text-sm sm:text-base">
              <thead class="bg-yellow-400 text-gray-900 font-bold">
                <tr>
                  <th class="py-2 px-4">Borrower Name</th>
                  <th class="py-2 px-4">Book Borrowed</th>
                  <th class="py-2 px-4">Contact</th>
                  <th class="py-2 px-4">Borrow Date</th>
                  <th class="py-2 px-4">Due Date</th>
                  <th class="py-2 px-4 text-center">Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(borrower, index) in filteredOverdueList"
                  :key="index"
                  class="border-b hover:bg-yellow-50 transition-colors"
                >
                  <td class="py-2 px-4">{{ borrower.borrowerName }}</td>
                  <td class="py-2 px-4">{{ borrower.bookBorrowed }}</td>
                  <td class="py-2 px-4">{{ borrower.contact }}</td>
                  <td class="py-2 px-4">{{ borrower.date }}</td>
                  <td class="py-2 px-4 text-red-500 font-semibold">
                    {{ borrower.dueDate }}
                  </td>
                  <td class="py-2 px-4 text-center font-bold text-red-600">
                    {{ libraryStore.getDaysOverdue(borrower.dueDate) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <p v-else class="text-center text-gray-600 my-auto">No overdue books found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLibraryStore } from "@/stores/library";

const libraryStore = useLibraryStore();
const { overdueList } = storeToRefs(libraryStore);

const searchQuery = ref("");

const filteredOverdueList = computed(() => {
  if (!searchQuery.value.trim()) return overdueList.value;
  const query = searchQuery.value.toLowerCase();
  return overdueList.value.filter(
    (b) =>
      b.borrowerName.toLowerCase().includes(query) ||
      b.bookBorrowed.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
table th,
table td {
  border-bottom: 1px solid #ddd;
}
</style>
