<template>
  <div class="max-w-6xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- Category Buttons -->
       <h1 class="text-2xl font-bold mb-4">BOOKS CATEGORY</h1>
      <div class="flex gap-4 mb-6 overflow-auto pb-2">
        <button
    v-for="cat in categories"
        :key="cat._id"
        @click="selectedCategory = cat.category"
        :class="[
        'px-6 py-2 rounded-lg font-semibold transition-colors',
        selectedCategory === cat.category
      ? 'bg-yellow-400 text-gray-800'
      : 'bg-white border-2 border-gray-800 text-gray-800 hover:bg-gray-50'
         ]"
        >
        {{ cat.category }}
        </button>
      </div>

      <!-- Add Buttons -->
      <div class="flex gap-6 w-[40%]">
        <button
          class="mb-6 px-4 py-2 border-2 border-gray-800 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2"
          @click="openModal('category')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add New Category
        </button>

        <button
          class="mb-6 px-4 py-2 border-2 border-gray-800 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2"
          @click="openModal('book')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add New Book
        </button>
      </div>

      <!-- Category Display -->
      <div v-if="selectedCategory" class="bg-yellow-400 rounded-lg p-4">
        <h3 class="text-2xl font-bold mb-4">{{ selectedCategory }}</h3>
        <div class="bg-white rounded-lg overflow-auto max-h-[650px]">
          <table class="w-full">
            <thead class="bg-yellow-400 sticky top-0">
              <tr>
                <th class="text-left p-3 font-bold">TITLE</th>
                <th class="text-left p-3 font-bold">YEAR</th>
                <th class="text-left p-3 font-bold">AUTHOR</th>
                <th class="text-left p-3 font-bold">QTY</th>
                <th class="text-left p-3 font-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(book, idx) in books.filter(b => b.subject === selectedCategory)"
                :key="idx"
                :class="idx % 2 === 0 ? 'bg-yellow-400' : 'bg-yellow-300'"
              >
                <td class="p-3 font-semibold">{{ book.bookTitle }}</td>
                <td class="p-3 font-semibold">{{ book.year }}</td>
                <td class="p-3 font-semibold">{{ book.author }}</td>
                <td class="p-3 font-semibold">{{ book.quantity }}</td>
                <td class="p-3 font-semibold flex gap-3 items-center">
                  <button @click="openActionModal('edit', book)">
                    <SquarePen class="text-blue-600 w-4 h-4" />
                  </button>
                  <button @click="openActionModal('delete', book)">
                    <Trash2 class="text-red-600 w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- ADD MODAL -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50"
  >
    <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
      <button
        class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        @click="closeModal"
      >
        ✖
      </button>

      <h2 class="text-xl font-bold mb-4 text-center">
        {{ modalType === 'book' ? 'Add New Book' : 'Add New Category' }}
      </h2>

      <form class="space-y-4" @submit.prevent="addButton">
  <div v-if="modalType === 'book'">
    <input v-model="newBook.bookTitle" type="text" placeholder="Book Title" class="w-full border p-2 rounded mb-2" />
    <input v-model="newBook.author" type="text" placeholder="Author" class="w-full border p-2 rounded mb-2" />
    <select v-model="newBook.subject" class="w-full border p-2 rounded mb-2">
      <option disabled selected>Select Category</option>
      <option v-for="cat in libraryStore.categories" :key="cat._id" :value="cat.category">
        {{ cat.category }}
      </option>
    </select>
    <input v-model="newBook.year" type="text" placeholder="Year" class="w-full border p-2 rounded mb-2" />
    <input v-model="newBook.quantity" type="number" min="1" placeholder="Quantity" class="w-full border p-2 rounded mb-2" />
  </div>

  <div v-else>
    <input v-model="newCategory.category" type="text" placeholder="Category Name" class="w-full border p-2 rounded" />
  </div>

  <button
    type="submit"
    class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 rounded-lg"
  >
    Save
  </button>
</form>
    </div>
  </div>

  <!-- ACTION MODAL -->
  <div
    v-if="isActionModalOpen"
    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50"
  >
    <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
      <button
        class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        @click="closeActionModal"
      >
        ✖
      </button>

      <h2 class="text-xl font-bold mb-4 text-center">
        {{ actionType === 'edit' ? 'Edit Book Details' : 'Delete Book?' }}
      </h2>

      <div v-if="actionType === 'edit'" class="space-y-3">
        <input v-model="selectedBook.title" type="text" class="w-full border p-2 rounded" />
        <input v-model="selectedBook.author" type="text" class="w-full border p-2 rounded" />
        <input v-model="selectedBook.year" type="text" class="w-full border p-2 rounded" />
        <input v-model="selectedBook.qty" type="number" class="w-full border p-2 rounded" />
        <button
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          Update
        </button>
      </div>

      <div v-else class="text-center">
        <p class="mb-4 text-gray-700">
          Are you sure you want to delete <span class="font-bold">{{ selectedBook.title }}</span>?
        </p>
        <div class="flex justify-center gap-4">
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
            @click="closeActionModal"
          >
            Cancel
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, } from "vue";
import { storeToRefs } from 'pinia';
import { Trash2, SquarePen } from "lucide-vue-next";
import { useLibraryStore } from "@/stores/library";
const libraryStore = useLibraryStore();
const { categories, books } = storeToRefs(libraryStore);

const selectedCategory = ref(libraryStore.categories[0]?.category);

// Add modals
const isModalOpen = ref(false);
const modalType = ref("");

// Action modals
const isActionModalOpen = ref(false);
const actionType = ref("");
const selectedBook = ref({});

function openModal(type) {
  modalType.value = type;
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
}

// ACTION MODALS
function openActionModal(type, book) {
  actionType.value = type;
  selectedBook.value = { ...book }; // copy book data
  isActionModalOpen.value = true;
}

function closeActionModal() {
  isActionModalOpen.value = false;
}

const newBook = ref({
  bookTitle: '',
  author: '',
  subject: 'Select Category',
  year: '',
  quantity: ''
});

const newCategory = ref({
    category: ''
});

function addButton() {
  if (modalType.value === 'book') {
    libraryStore.newBook(newBook.value);
    newBook.value = {
      bookTitle: '',
      author: '',
      subject: '',
      year: '',
      quantity: ''
    };
  } 
  else if (modalType.value === 'category') {
    libraryStore.newCategory(newCategory.value);
    newCategory.value = {
      category: ''
    };
  }
  closeModal();
}
</script>
