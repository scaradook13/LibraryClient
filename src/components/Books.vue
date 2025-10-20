<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <div class="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 class="text-2xl font-bold text-gray-800 text-center sm:text-left">
          BOOKS CATEGORY
        </h1>
        <button
          @click="toggleEditMode"
          class="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold border-2 border-gray-800 transition"
          :class="isEditMode
            ? 'bg-gray-400 text-white'
            : 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'"
        >
          {{ isEditMode ? 'Cancel Edit' : 'Edit Category' }}
        </button>
      </div>

      <!-- Category Buttons -->
      <div class="flex flex-wrap gap-3 mb-6 overflow-x-auto pb-2">
        <div
          v-for="cat in categories"
          :key="cat._id"
          class="relative flex items-center"
        >
          <button
            @click="!isEditMode && (selectedCategory = cat.category)"
            :class="[
              'px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm sm:text-base whitespace-nowrap shadow-sm',
              selectedCategory === cat.category && !isEditMode
                ? 'bg-yellow-400 text-gray-800 border border-yellow-500'
                : 'bg-white border border-gray-400 text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ cat.category }}
            <div v-if="isEditMode" class="flex gap-1 items-center">
              <button
                @click.stop="openEditModal(cat)"
                class="text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <SquarePen class="w-4 h-4" />
              </button>
              <button
                @click.stop="openDeleteModal(cat)"
                class="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </button>
        </div>
      </div>

      <!-- Add Buttons + Search -->
      <div class="flex flex-col sm:flex-row sm:justify-between gap-3 mb-6">
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            class="px-4 py-2 border-2 border-gray-800 rounded-lg font-semibold hover:bg-yellow-100 flex items-center justify-center gap-2 transition"
            @click="openModal('category')"
          >
            <Plus class="w-4 h-4" /> Add Category
          </button>
          <button
            class="px-4 py-2 border-2 border-gray-800 rounded-lg font-semibold hover:bg-yellow-100 flex items-center justify-center gap-2 transition"
            @click="openModal('book')"
          >
            <BookOpen class="w-4 h-4" /> Add Book
          </button>
        </div>

        <div class="relative w-full sm:w-64">
          <Search class="w-5 h-5 absolute left-3 top-2.5 text-gray-500" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search books..."
            class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <!-- Books Section -->
      <div v-if="selectedCategory" class="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
        <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
            {{ selectedCategory }}
          </h3>
        </div>

        <!-- Desktop Table -->
        <div class="hidden md:block rounded-lg overflow-auto max-h-[600px] border border-gray-200">
          <table class="w-full text-sm border-collapse">
            <thead class="bg-yellow-400 text-gray-900 sticky top-0 shadow-sm">
              <tr>
                <th class="px-4 py-3 text-left font-bold uppercase">Title</th>
                <th class="px-4 py-3 text-left font-bold uppercase">Year</th>
                <th class="px-4 py-3 text-left font-bold uppercase">Author</th>
                <th class="px-4 py-3 text-left font-bold uppercase">Qty</th>
                <th class="px-4 py-3 text-center font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(book, idx) in filteredBooks"
                :key="idx"
                class="border-b border-gray-200 hover:bg-yellow-50 transition"
              >
                <td class="px-4 py-3 font-medium text-gray-800">{{ book.bookTitle }}</td>
                <td class="px-4 py-3 text-gray-700">{{ book.year }}</td>
                <td class="px-4 py-3 text-gray-700">{{ book.author }}</td>
                <td class="px-4 py-3 font-semibold text-gray-900 text-center">{{ book.quantity }}</td>
                <td class="px-4 py-3 text-center">
                  <div class="flex justify-center gap-3">
                    <button
                      @click="openActionModal('edit', book)"
                      class="p-2 rounded-md hover:bg-blue-100 transition"
                      title="Edit"
                    >
                      <SquarePen class="text-blue-600 w-4 h-4" />
                    </button>
                    <button
                      @click="openActionModal('delete', book)"
                      class="p-2 rounded-md hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 class="text-red-600 w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden space-y-3 max-h-[600px] overflow-auto">
          <div
            v-for="(book, idx) in filteredBooks"
            :key="idx"
            class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-base font-semibold text-gray-800">{{ book.bookTitle }}</h4>
              <span class="text-sm text-gray-600">Qty: {{ book.quantity }}</span>
            </div>
            <p class="text-sm text-gray-700"><strong>Author:</strong> {{ book.author }}</p>
            <p class="text-sm text-gray-700"><strong>Year:</strong> {{ book.year }}</p>
            <div class="flex justify-end gap-3 mt-3">
              <button
                @click="openActionModal('edit', book)"
                class="p-2 rounded-md hover:bg-blue-100 transition"
                title="Edit"
              >
                <SquarePen class="text-blue-600 w-4 h-4" />
              </button>
              <button
                @click="openActionModal('delete', book)"
                class="p-2 rounded-md hover:bg-red-100 transition"
                title="Delete"
              >
                <Trash2 class="text-red-600 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- ADD MODALS -->
<!-- Add Category Modal -->
<div
  v-if="isModalOpen && modalType === 'category'"
  class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-4 text-center">Add New Category</h2>
    <form @submit.prevent="addButton" class="space-y-3">
      <div>
        <label class="block text-sm font-semibold mb-1">Category Name</label>
        <input
          v-model="newCategory.category"
          type="text"
          placeholder="Enter category name"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-lg transition"
      >
        Add Category
      </button>
    </form>
  </div>
</div>

<!-- Add Book Modal -->
<div
  v-if="isModalOpen && modalType === 'book'"
  class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-4 text-center">Add New Book</h2>
    <form @submit.prevent="addButton" class="space-y-3">
      <div>
        <label class="block text-sm font-semibold mb-1">Book Title</label>
        <input
          v-model="newBook.bookTitle"
          type="text"
          placeholder="Enter book title"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Author</label>
        <input
          v-model="newBook.author"
          type="text"
          placeholder="Enter author"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Category</label>
        <select
          v-model="newBook.subject"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        >
          <option disabled value="Select Category">Select Category</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat.category">
            {{ cat.category }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Year</label>
        <input
          v-model="newBook.year"
          type="text"
          placeholder="Enter year"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Quantity</label>
        <input
          v-model="newBook.quantity"
          type="number"
          min="1"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-lg transition"
      >
        Add Book
      </button>
    </form>
  </div>
</div>

<!-- Edit Category Modal -->
<div
  v-if="showEditModal"
  class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeEditModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-4 text-center">Edit Category</h2>

    <form @submit.prevent="confirmEdit(selectedForEdit)" class="space-y-3">
      <div>
        <label class="block text-sm font-semibold mb-1">Category Name</label>
        <input
          v-model="editCategoryName"
          type="text"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          @click="closeEditModal"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Delete Category Modal -->
<div
  v-if="showDeleteModal"
  class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[380px] relative text-center">
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeDeleteModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-3 text-red-600">Delete Category</h2>
    <p class="text-gray-700 mb-6">
      Are you sure you want to delete
      <span class="font-semibold text-black">"{{ selectedForDelete?.category }}"</span>?
      This action cannot be undone.
    </p>

    <div class="flex justify-center space-x-3">
      <button
        @click="closeDeleteModal"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
      >
        Cancel
      </button>
      <button
        @click="confirmDelete(selectedForDelete)"
        class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        Delete
      </button>
    </div>
  </div>
</div>

<!-- Edit Book Modal -->
<div
  v-if="isActionModalOpen && actionType === 'edit'"
  class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[420px] relative">
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeActionModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-4 text-center">Edit Book</h2>

    <form @submit.prevent="updateBookHandler" class="space-y-3">
      <div>
        <label class="block text-sm font-semibold mb-1">Book Title</label>
        <input
          v-model="selectedBook.bookTitle"
          type="text"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Author</label>
        <input
          v-model="selectedBook.author"
          type="text"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Category</label>
        <select
          v-model="selectedBook.subject"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        >
          <option disabled value="">Select Category</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat.category">
            {{ cat.category }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Year</label>
        <input
          v-model="selectedBook.year"
          type="text"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Quantity</label>
        <input
          v-model="selectedBook.quantity"
          type="number"
          min="1"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          @click="closeActionModal"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Delete Book Modal -->
<div
  v-if="isActionModalOpen && actionType === 'delete'"
  class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[380px] relative text-center">
    <button
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      @click="closeActionModal"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-3 text-red-600">Delete Book</h2>
    <p class="text-gray-700 mb-6">
      Are you sure you want to delete
      <span class="font-semibold text-black">"{{ selectedBook.bookTitle }}"</span>?
      This action cannot be undone.
    </p>

    <div class="flex justify-center space-x-3">
      <button
        @click="closeActionModal"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
      >
        Cancel
      </button>
      <button
        @click="deleteBookHandler(selectedBook)"
        class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        Delete
      </button>
    </div>
  </div>
</div>

</template>


<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { SquarePen, Trash2, Plus, BookOpen, Search } from "lucide-vue-next";
import { useLibraryStore } from "@/stores/library";

const libraryStore = useLibraryStore();
const { categories, books } = storeToRefs(libraryStore);

const selectedCategory = ref(libraryStore.categories[0]?.category || "");

// ------------------ BOOK & CATEGORY MODALS ------------------ //
const isModalOpen = ref(false);
const modalType = ref("");

const openModal = (type) => {
  modalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// ------------------ ACTION MODALS (EDIT/DELETE BOOK) ------------------ //
const isActionModalOpen = ref(false);
const actionType = ref("");
const selectedBook = ref({});

const openActionModal = (type, book) => {
  actionType.value = type;
  selectedBook.value = { ...book };
  isActionModalOpen.value = true;
};

const closeActionModal = () => {
  isActionModalOpen.value = false;
};

// ------------------ ADD BOOK / CATEGORY ------------------ //
const newBook = ref({
  bookTitle: "",
  author: "",
  subject: "Select Category",
  year: "",
  quantity: 1,
});

const newCategory = ref({
  category: "",
});

const addButton = () => {
  if (modalType.value === "book") {
    libraryStore.newBook(newBook.value);
    newBook.value = {
      bookTitle: "",
      author: "",
      subject: "Select Category",
      year: "",
      quantity: 1,
    };
  } else if (modalType.value === "category") {
    libraryStore.newCategory(newCategory.value);
    newCategory.value = { category: "" };
  }
  closeModal();
};

// ------------------ UPDATE & DELETE BOOK ------------------ //
const updateBookHandler = () => {
  libraryStore.updateBook(selectedBook.value);
  closeActionModal();
};

const deleteBookHandler = (payload) => {
  libraryStore.deleteBook(payload);
  closeActionModal();
};

// ------------------ CATEGORY EDIT & DELETE ------------------ //
const isEditMode = ref(false);
const toggleEditMode = () => (isEditMode.value = !isEditMode.value);

const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editCategoryName = ref("");
const selectedForEdit = ref(null);
const selectedForDelete = ref(null);

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
  const updatedCategory = { ...payload, category: editCategoryName.value };
  libraryStore.updateCategory(updatedCategory);
  closeEditModal();
};

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

// ------------------ SEARCH FILTER ------------------ //
const searchQuery = ref("");
const filteredBooks = computed(() => {
  return books.value.filter(
    (book) =>
      book.subject === selectedCategory.value &&
      book.bookTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// ------------------ DISABLE ADD BUTTON TEMPORARILY ------------------ //
const isDisabled = ref(false);
const handleClick = async () => {
  if (isDisabled.value) return;
  isDisabled.value = true;
  await addButton();
  setTimeout(() => (isDisabled.value = false), 3000);
};
</script>

