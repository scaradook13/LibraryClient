<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 class="text-xl sm:text-2xl font-bold text-center sm:text-left">Borrower Management</h2>

        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
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

          <!-- Add Borrower Button -->
          <button
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
            @click="openModal('add')"
          >
            + Add Borrower
          </button>
        </div>
      </div>

      <!-- Table Wrapper -->
      <div class="overflow-x-auto border border-gray-200 rounded-lg">
        <table class="min-w-full text-sm">
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
              v-for="borrower in filteredBorrowers"
              :key="borrower._id"
              class="border-b hover:bg-yellow-50 transition-colors"
            >
              <td class="px-4 py-2">{{ borrower.borrowerName }}</td>
              <td class="px-4 py-2">{{ borrower.bookBorrowed }}</td>
              <td class="px-4 py-2">{{ borrower.date }}</td>
              <td class="px-4 py-2">{{ borrower.dueDate }}</td>
              <td class="px-4 py-2">{{ borrower.contact }}</td>
              <td class="px-4 py-2 text-center space-x-4">
                <button
                  class="text-blue-600 hover:text-blue-800"
                  @click="openModal('edit', borrower)"
                  title="Edit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-square-pen"
                  >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path
                      d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                    />
                  </svg>
                </button>

                <button
                  @click="openModal('return', borrower)"
                  class="text-green-600 hover:text-green-800"
                  title="Return"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-corner-down-left"
                  >
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                    <path d="m9 10-5 5 5 5" />
                  </svg>
                </button>

                <button
                  class="text-red-600 hover:text-red-800"
                  @click="openModal('delete', borrower)"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-trash2"
                  >
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </td>
            </tr>

            <tr v-if="filteredBorrowers.length === 0">
              <td colspan="6" class="text-center py-4 text-gray-500">
                No borrowers found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ADD / EDIT MODAL -->
    <div
      v-if="showModal === 'add' || showModal === 'edit'"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[400px] relative">
        <button class="absolute top-3 right-3 text-gray-600 hover:text-gray-800" @click="closeModal">✖</button>
        <h2 class="text-xl font-bold mb-4 text-center">
          {{ showModal === 'edit' ? 'Edit Borrower' : 'Add Borrower' }}
        </h2>

        <form @submit.prevent="saveBorrower" class="space-y-2">
          <input v-model="form.borrowerName" type="text" placeholder="Borrower Name" class="w-full border p-2 rounded" required />
          <select v-model="form.category" class="w-full border p-2 rounded" required>
            <option disabled value="">Select Category</option>
            <option v-for="cat in categories" :key="cat._id" :value="cat.category">{{ cat.category }}</option>
          </select>
          <select v-model="form.bookBorrowed" class="w-full border p-2 rounded" required>
            <option disabled value="">Select Book</option>
            <option
              v-for="book in filteredBooks"
              :key="book._id"
              :value="book.bookTitle"
              :disabled="book.quantity === 0"
            >
              {{ book.bookTitle }}
            </option>
          </select>
          <input v-model="form.date" type="date" class="w-full border p-2 rounded" required />
          <input v-model="form.dueDate" type="date" class="w-full border p-2 rounded" required />
          <input v-model="form.contact" type="text" placeholder="Contact Number" class="w-full border p-2 rounded" required />

          <button
            type="submit"
            class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 rounded-lg mt-2"
          >
            {{ showModal === 'edit' ? 'Save Changes' : 'Add Borrower' }}
          </button>
        </form>
      </div>
    </div>

    <!-- DELETE CONFIRMATION MODAL -->
    <div
      v-if="showModal === 'delete'"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[400px] relative">
        <button class="absolute top-3 right-3 text-gray-600 hover:text-gray-800" @click="closeModal">✖</button>
        <h2 class="text-xl font-bold mb-4 text-center text-red-600">Delete Borrower</h2>
        <p class="text-center mb-4">
          Are you sure you want to delete <strong>{{ borrowerToDelete?.borrowerName }}</strong>?
        </p>
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- RETURN CONFIRMATION MODAL -->
    <div
      v-if="showModal === 'return'"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[400px] relative">
        <button class="absolute top-3 right-3 text-gray-600 hover:text-gray-800" @click="closeModal">✖</button>
        <h2 class="text-xl font-bold mb-4 text-center text-blue-600">Return Book</h2>
        <p class="text-center mb-4">
          Are you sure you want to mark
          <strong>{{ borrowerToReturn?.borrowerName }}</strong>’s book
          <strong>"{{ borrowerToReturn?.bookBorrowed }}"</strong> as returned?
        </p>
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button>
          <button
            @click="confirmReturn"
            class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Confirm Return
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLibraryStore } from "@/stores/library";

const libraryStore = useLibraryStore();
const { borrowers, categories, books } = storeToRefs(libraryStore);

// Search and modal controls
const searchQuery = ref("");
const showModal = ref(null); // 'add', 'edit', 'delete', 'return'
const borrowerToDelete = ref(null);
const borrowerToReturn = ref(null);
const editMode = ref(false);
const isDisabled = ref(false);

// Borrower form
const form = ref({
  borrowerName: "",
  category: "",
  bookBorrowed: "",
  date: "",
  dueDate: "",
  contact: "",
});

// Reset form
const resetForm = () => {
  form.value = {
    borrowerName: "",
    category: "",
    bookBorrowed: "",
    date: "",
    dueDate: "",
    contact: "",
  };
};

// ---- MODAL CONTROLS ----
const openModal = (type, borrower = null) => {
  if (type === "add") {
    editMode.value = false;
    resetForm();
  } else if (type === "edit" && borrower) {
    editMode.value = true;
    form.value = { ...borrower };
  } else if (type === "delete" && borrower) {
    borrowerToDelete.value = borrower;
  } else if (type === "return" && borrower) {
    borrowerToReturn.value = borrower;
  }
  showModal.value = type;
};

const closeModal = () => {
  showModal.value = null;
  borrowerToDelete.value = null;
  borrowerToReturn.value = null;
  resetForm();
};

// ---- SAVE / UPDATE ----
const saveBorrower = async () => {
  if (editMode.value) {
    await libraryStore.updateBorrower(form.value);
  } else {
    await libraryStore.newBorrower(form.value);
  }
  closeModal();
};

// ---- DELETE ----
const confirmDelete = async () => {
  if (!borrowerToDelete.value) return;
  await libraryStore.deleteBorrower(borrowerToDelete.value);
  closeModal();
};

// ---- RETURN ----
const confirmReturn = async () => {
  if (!borrowerToReturn.value) return;
  await libraryStore.returnBorrower(borrowerToReturn.value);
  closeModal();
};

// ---- FILTERS ----
const filteredBooks = computed(() =>
  books.value.filter((b) => b.subject === form.value.category)
);

const filteredBorrowers = computed(() => {
  if (!searchQuery.value.trim()) return borrowers.value;
  const query = searchQuery.value.toLowerCase();
  return borrowers.value.filter(
    (b) =>
      b.borrowerName.toLowerCase().includes(query) ||
      b.bookBorrowed.toLowerCase().includes(query)
  );
});
</script>
