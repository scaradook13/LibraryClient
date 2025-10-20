<template>
  <div class="max-w-6xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Borrower Management</h2>
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-4 py-2 rounded-lg"
          @click="openAddBorrowerModal"
        >
          + Add Borrower
        </button>
      </div>

      <!-- Borrower Table -->
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead class="bg-yellow-400 text-gray-900 font-bold">
            <tr>
              <th class="px-4 py-2 text-left">Borrower Name</th>
              <th class="px-4 py-2 text-left">Book Borrowed</th>
              <th class="px-4 py-2 text-left">Date Borrowed</th>
              <th class="px-4 py-2 text-left">Due Date</th>
              <th class="px-4 py-2 text-left">Contact</th>
              <th class="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="borrower in borrowers"
              :key="borrower._id"
              class="border-b hover:bg-gray-50"
            >
              <td class="px-4 py-2">{{ borrower.borrowerName }}</td>
              <td class="px-4 py-2">{{ borrower.bookBorrowed }}</td>
              <td class="px-4 py-2">{{ borrower.date }}</td>
              <td class="px-4 py-2">{{ borrower.dueDate }}</td>
              <td class="px-4 py-2">{{ borrower.contact }}</td>
              <td class="px-4 py-2 text-center space-x-2">
                <button
                  class="text-blue-600 hover:text-blue-800"
                  @click="openEditBorrowerModal(borrower)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                </button>
                <button
                  class="text-red-600 hover:text-red-800"
                  @click="openDeleteModal(borrower)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </td>
            </tr>
            <tr v-if="borrowers.length === 0">
              <td colspan="6" class="text-center py-4 text-gray-500">
                No borrowers found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ADD/EDIT MODAL -->
    <div
      v-if="showModal"
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
          {{ editMode ? "Edit Borrower" : "Add Borrower" }}
        </h2>

        <form @submit.prevent="saveBorrower" class="space-y-1">
          <p>Borrower Name:</p>
          <input
            v-model="form.borrowerName"
            type="text"
            placeholder="Borrower Name"
            class="w-full border p-2 rounded"
            required
          />
          <p>Select Category:</p>
          <select v-model="form.category" name="" id="" class="w-full border p-2 rounded" required>
            <option v-for="cat in categories" :key="cat._id" :value="cat.category">
                {{ cat.category }}
            </option>
          </select>
          <p>Select Book:</p>
          <select v-model="form.bookBorrowed" name="" id="" class="w-full border p-2 rounded" required>
            <option disabled value="">Select Book</option>
            <option v-for="(book, idx) in filteredBooks" :key="idx" :value="book.bookTitle"
            :disabled="book.quantity === 0">{{ book.bookTitle }}</option>
          </select>
          <p>Input Date</p>
          <input
            v-model="form.date"
            type="date"
            class="w-full border p-2 rounded"
            required
          />
          <p>Input DueDate</p>
          <input
            v-model="form.dueDate"
            type="date"
            class="w-full border p-2 rounded"
            required
          />
          <p>Input Contact:</p>
          <input
            v-model="form.contact"
            type="text"
            placeholder="Contact Number"
            class="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 rounded-lg mt-2"
          >
            {{ editMode ? "Save Changes" : "Add Borrower" }}
          </button>
        </form>
      </div>
    </div>

    <!-- DELETE CONFIRMATION MODAL -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
        <button
          class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          @click="closeDeleteModal"
        >
          ✖
        </button>
        <h2 class="text-xl font-bold mb-4 text-center text-red-600">
          Delete Borrower
        </h2>
        <p class="text-center mb-4">
          Are you sure you want to delete
          <strong>{{ borrowerToDelete.borrowerName }}</strong>?
        </p>
        <div class="flex justify-end gap-2">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete(borrowerToDelete)"
            class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useLibraryStore } from "@/stores/library";
const libraryStore = useLibraryStore();
const { borrowers,categories,books } = storeToRefs(libraryStore);

const selectedCategory = ref(libraryStore.categories[0]?.category);


const showModal = ref(false);
const showDeleteModal = ref(false);
const editMode = ref(false);
const borrowerToDelete = ref({});
const form = ref({
  borrowerName: "",
  category: "",
  bookBorrowed: "",
  date: "",
  dueDate: "",
  contact: "",
});

const resetForm = () => ({
  borrowerName: "",
  category: selectedCategory.value || "",
  bookBorrowed: "",
  date: "",
  dueDate: "",
  contact: "",
});

const openAddBorrowerModal = () => {
  editMode.value = false;
  resetForm();
  showModal.value = true;
};

const openEditBorrowerModal = (borrower) => {
  editMode.value = true;
  form.value = { ...borrower };
  showModal.value = true;
};

const saveBorrower = async () => {
  try {
    if (editMode.value) {
      await libraryStore.updateBorrower(form.value);
    } else {
      await libraryStore.newBorrower(form.value);
    }
    closeModal();
  } catch (error) {
    console.error("Failed to save borrower:", error);
  }
};


const openDeleteModal = (borrower) => {
  borrowerToDelete.value = borrower;
  showDeleteModal.value = true;
};

const confirmDelete = (payload) => {
  console.log("Deleting Borrower:", payload);
  libraryStore.deleteBorrower(payload);
  closeDeleteModal();
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const filteredBooks = computed(() => 
  books.value.filter(b => b.subject === form.value.category)
);
</script>
