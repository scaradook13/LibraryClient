<template>
  <div class="max-w-6xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-4">OVERDUE LIST</h2>

      <div class="bg-gray-200 rounded-lg p-6 min-h-[300px] flex flex-col">
        <template v-if="overdueList.length">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-yellow-400 text-gray-900">
                <th class="py-2 px-4">Borrower Name</th>
                <th class="py-2 px-4">Book Borrowed</th>
                <th class="py-2 px-4">Contact</th>
                <th class="py-2 px-4">Borrow Date</th>
                <th class="py-2 px-4">Due Date</th>
                <th class="py-2 px-4">Days Overdue</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(borrower, index) in overdueList"
                :key="index"
                class="border-b hover:bg-yellow-50 transition"
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
        </template>

        <p v-else class="text-center text-gray-600 my-auto">
          No overdue books
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLibraryStore } from "@/stores/library";

const libraryStore = useLibraryStore();
const { overdueList } = storeToRefs(libraryStore);

</script>

<style scoped>
table th,
table td {
  border-bottom: 1px solid #ddd;
}
</style>
