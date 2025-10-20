<template>
  <div class="max-w-6xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
    <!-- Header with Edit Mode Toggle -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">BOOKS CATEGORY</h1>
      <button
        @click="toggleEditMode"
        class="px-3 py-2 rounded font-semibold transition-colors"
        :class="isEditMode ? 'bg-gray-400 text-white' : 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'"
      >
        {{ isEditMode ? "Cancel Edit" : "Edit Category" }}
      </button>
    </div>

    <!-- Category Buttons -->
    <div class="flex gap-4 mb-6 overflow-auto pb-2">
      <div
        v-for="cat in categories"
        :key="cat._id"
        class="relative flex items-center"
      >
        <button
          @click="!isEditMode && (selectedCategory = cat.category)"
          :class="[
            'px-6 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2',
            selectedCategory === cat.category && !isEditMode
              ? 'bg-yellow-400 text-gray-800'
              : 'bg-white border-2 border-gray-800 text-gray-800 hover:bg-gray-50'
          ]"
        >
          {{ cat.category }}
          <!-- Edit/Delete icons when edit mode is active -->
        <div
          v-if="isEditMode"
          class="flex gap-1 "
        >
          <button
            @click="openEditModal(cat)"
            class="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
          </button>
          <button
            @click="openDeleteModal(cat)"
            class="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
        </button>
      </div>
    </div>

      <!-- Add Buttons -->
      <div class="flex w-full justify-between">
        <div class="flex gap-6">
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
        <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search books..."
              class="mb-6 px-4 py-2 pl-9 border-2 border-gray-800 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
              />
            </svg>
        </div>
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
                v-for="(book, idx) in filteredBooks"
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
    :disabled="isDisabled"
    @click="handleClick"
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
        <input v-model="selectedBook._id" hidden type="number" />
        <input v-model="selectedBook.bookTitle" type="text" class="w-full border p-2 rounded" />
        <input v-model="selectedBook.author" type="text" class="w-full border p-2 rounded" />
        <select v-model="selectedBook.subject" class="w-full border p-2 rounded mb-2">
        <option disabled selected>Select Category</option>
        <option v-for="cat in libraryStore.categories" :key="cat._id" :value="cat.category">
        {{ cat.category }}
        </option>
        </select>
        <input v-model="selectedBook.year" type="text" class="w-full border p-2 rounded" />
        <input v-model="selectedBook.quantity" type="number" class="w-full border p-2 rounded" />
        <button
            @click="updateBookHandler"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          Update
        </button>
      </div>

      <div v-else class="text-center">
        <p class="mb-4 text-gray-700">
          Are you sure you want to delete <span class="font-bold">{{ selectedBook.bookTitle }}</span>?
        </p>
        <div class="flex justify-center gap-4">
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
            @click="closeActionModal"
          >
            Cancel
          </button>
          <button
            @click="deleteBookHandler(selectedBook)"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- EDIT CATEGORY MODAL -->
<div
  v-if="showEditModal"
  class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
    <!-- Close Button -->
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeEditModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-4 text-center">Edit Category</h2>

    <form @submit.prevent="confirmEdit(selectedForEdit)" class="space-y-4">
      <input
        v-model="editCategoryName"
        type="text"
        placeholder="Category Name"
        class="w-full border p-2 rounded mb-2"
      />

      <button
        type="submit"
        class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 rounded-lg"
      >
        Save Changes
      </button>
    </form>
  </div>
</div>

<!-- DELETE CATEGORY MODAL -->
<div
  v-if="showDeleteModal"
  class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
    <!-- Close Button -->
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeDeleteModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-4 text-center text-red-600">
      Delete Category
    </h2>

    <p class="text-center mb-4">
      Are you sure you want to delete
      <strong class="text-gray-900">"{{ selectedForDelete.category }}"</strong>?
    </p>

    <div class="flex justify-end gap-2 mt-4">
      <button
        @click="closeDeleteModal"
        class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
      >
        Cancel
      </button>
      <button
        @click="confirmDelete(selectedForDelete)"
        class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
      >
        Delete
      </button>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref,computed } from "vue";
import { storeToRefs } from 'pinia';
import { Trash2, SquarePen } from "lucide-vue-next";
import { useLibraryStore } from "@/stores/library";
const libraryStore = useLibraryStore();
const { categories, books } = storeToRefs(libraryStore);

const selectedCategory = ref(libraryStore.categories[0]?.category);

const isModalOpen = ref(false);
const modalType = ref("");

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
  quantity: 1
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
      quantity: 1
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

function updateBookHandler() {
  libraryStore.updateBook(selectedBook.value);
  closeActionModal();
}

function deleteBookHandler(payload) {
  libraryStore.deleteBook(payload);
  closeActionModal();
}

const isEditMode = ref(false);
const isDisabled = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editCategoryName = ref("");
const selectedForEdit = ref(null);
const selectedForDelete = ref(null);

// Toggle edit mode
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};

// --- Edit Category ---
const openEditModal = (cat) => {
  selectedForEdit.value = cat;
  editCategoryName.value = cat.category;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editCategoryName.value = "";
};

const confirmEdit = (payload) => {
  const updatedCategory = {
    ...payload,
    category: editCategoryName.value
  };
  libraryStore.updateCategory(updatedCategory);
  closeEditModal();
};

// --- Delete Category ---
const openDeleteModal = (cat) => {
  selectedForDelete.value = cat;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const confirmDelete = (payload) => {
  libraryStore.deleteCategory(payload);
  closeDeleteModal();
};

const searchQuery = ref("");

const filteredBooks = computed(() => {
  return books.value.filter(
    (book) =>
      book.subject === selectedCategory.value &&
      book.bookTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleClick = async () => {
  if (isDisabled.value) return;
  isDisabled.value = true;

  await addButton();

  // Re-enable after 3 seconds
  setTimeout(() => {
    isDisabled.value = false;
  }, 3000);
};

</script>
