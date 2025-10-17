<template>
  <div class="max-w-6xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-4">OVERDUE LIST</h2>
      <div class="bg-gray-200 rounded-lg p-6 min-h-96">
        <div v-if="overdueList.length === 0" class="text-center text-gray-500 py-12">
          No overdue books
        </div>
        <table v-else class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-400">
              <th class="text-left p-3 font-bold">Book</th>
              <th class="text-left p-3 font-bold">Borrower</th>
              <th class="text-left p-3 font-bold">Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in overdueList" :key="idx">
              <td class="p-3">{{ item.book }}</td>
              <td class="p-3">{{ item.borrower }}</td>
              <td class="p-3">{{ item.dueDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  overdueList: Array
});
</script>