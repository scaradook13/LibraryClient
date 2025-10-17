<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <!-- Add Book Modal -->
    <div v-if="modalType === 'addBook'" class="bg-gray-200 rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">ADD NEW BOOK</h2>
        <button @click="$emit('close')">
          <XIcon :size="24" />
        </button>
      </div>
      <form @submit.prevent class="space-y-4">
        <div>
          <label class="block font-bold mb-1">Book Title:</label>
          <input type="text" placeholder="Enter Book Title" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Author:</label>
          <input type="text" placeholder="Enter Author" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Category/ Subject:</label>
          <select class="w-full p-2 rounded bg-white">
            <option>Select Category/ Subject</option>
            <option>Science</option>
            <option>English</option>
            <option>Filipino</option>
            <option>Mathematics</option>
          </select>
        </div>
        <div>
          <label class="block font-bold mb-1">Year Published:</label>
          <input type="text" placeholder="Enter Year" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Quantity/Available Copies:</label>
          <input type="text" placeholder="Enter Quantity" class="w-full p-2 rounded" />
        </div>
        <div class="flex gap-2 justify-end">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-400 rounded font-semibold">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-yellow-400 rounded font-semibold">Save</button>
        </div>
      </form>
    </div>

    <!-- Remove Book Modal -->
    <div v-if="modalType === 'removeBook'" class="bg-gray-200 rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">REMOVE BOOK</h2>
        <button @click="$emit('close')">
          <XIcon :size="24" />
        </button>
      </div>
      <form @submit.prevent class="space-y-4">
        <div>
          <label class="block font-bold mb-1">Book Title:</label>
          <input type="text" placeholder="Enter Book Title" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Author:</label>
          <input type="text" placeholder="Enter Author" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Year Published:</label>
          <input type="text" placeholder="Enter Year" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Quantity:</label>
          <input type="text" placeholder="Enter Quantity" class="w-full p-2 rounded" />
        </div>
        <p class="text-center font-semibold">Are you sure you want to remove this Book?</p>
        <div class="flex gap-2 justify-end">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-400 rounded font-semibold">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded font-semibold">Remove</button>
        </div>
      </form>
    </div>

    <!-- Borrow Book Modal -->
    <div v-if="modalType === 'borrowBook'" class="bg-gray-200 rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">BORROW BOOK</h2>
        <button @click="$emit('close')">
          <XIcon :size="24" />
        </button>
      </div>
      <form @submit.prevent class="space-y-4">
        <div>
          <label class="block font-bold mb-1">Book Title:</label>
          <input type="text" placeholder="Enter Book Title" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Author:</label>
          <input type="text" placeholder="Enter Author" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Student ID Number of the Borrower:</label>
          <input type="text" placeholder="Enter Student ID" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Contact Number:</label>
          <input type="text" placeholder="Enter Contact Number" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Borrow Date:</label>
          <input type="text" placeholder="mm/dd/yyyy" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Return Due Date:</label>
          <input type="text" placeholder="mm/dd/yyyy" class="w-full p-2 rounded" />
        </div>
        <div class="flex gap-2 justify-end">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-400 rounded font-semibold">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded font-semibold">Borrow</button>
        </div>
      </form>
    </div>

    <!-- Return Book Modal -->
    <div v-if="modalType === 'returnBook'" class="bg-gray-200 rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">RETURN BOOK</h2>
        <button @click="$emit('close')">
          <XIcon :size="24" />
        </button>
      </div>
      <form @submit.prevent class="space-y-4">
        <div>
          <label class="block font-bold mb-1">Book Title:</label>
          <input type="text" placeholder="Enter Book Title" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Author:</label>
          <input type="text" placeholder="Enter Author" class="w-full p-2 rounded" />
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block font-bold mb-1">Name of Borrower:</label>
            <input type="text" placeholder="Enter Name" class="w-full p-2 rounded" />
          </div>
          <div class="w-32">
            <label class="block font-bold mb-1">Status:</label>
            <div class="bg-white p-2 rounded text-center font-bold text-red-600">Over due</div>
          </div>
        </div>
        <div>
          <label class="block font-bold mb-1">Borrow Date:</label>
          <input type="text" placeholder="mm/dd/yyyy" class="w-full p-2 rounded" />
        </div>
        <div>
          <label class="block font-bold mb-1">Return Date:</label>
          <input type="text" placeholder="mm/dd/yyyy" class="w-full p-2 rounded" />
        </div>
        <div class="flex gap-2 justify-end">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-400 rounded font-semibold">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded font-semibold">Return</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue';

defineProps({
  isOpen: Boolean,
  modalType: String
});

defineEmits(['close']);

const XIcon = (props) => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: props.size || 24, height: props.size || 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, [
  h('path', { d: "M18 6 6 18" }),
  h('path', { d: "m6 6 12 12" })
]);
</script>