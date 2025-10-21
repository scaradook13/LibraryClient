import { ref, computed, watch } from "vue";
import LibraryService from "@/api/LibraryService";
import { defineStore } from "pinia";

export const useLibraryStore = defineStore("library", () => {

  const categories = ref([]);
  const books = ref([]);
  const totalBooks = ref(0);
  const borrowers = ref([]);
  const totalBorrowers = ref(0);
  const overdue = ref(0);
  const transactions = ref([]);


  const calculateTotalBooks = () => {
    totalBooks.value = books.value.reduce((sum, b) => sum + b.quantity, 0);
  };

  const refreshAll = async () => {
    // Run multiple data fetches in parallel for speed
    await Promise.all([fetchBooks(), fetchBorrower(), fetchTransaction()]);
    calculateTotalBooks();
  };


  const fetchCategories = async () => {
    const data = await LibraryService.getAllCategory();
    categories.value = data;
  };

  const newCategory = async (payload) => {
    await LibraryService.addCategory(payload);
    await fetchCategories();
  };

  const updateCategory = async (payload) => {
    await LibraryService.updateCategory(payload);
    await fetchCategories();
  };

  const deleteCategory = async (payload) => {
    await LibraryService.deleteCategory(payload);
    await fetchCategories();
  };


  const fetchBooks = async () => {
    const data = await LibraryService.getAllBook();
    books.value = data;
  };

  const newBook = async (payload) => {
    await LibraryService.newBook(payload);
    await refreshAll();
  };

  const updateBook = async (payload) => {
    await LibraryService.updateBook(payload);
    await refreshAll();
  };

  const deleteBook = async (payload) => {
    await LibraryService.deleteBook(payload);
    await refreshAll();
  };


  const fetchBorrower = async () => {
    const data = await LibraryService.getAllBorrower();
    borrowers.value = data;
    totalBorrowers.value = data.filter(
      (b) => b.bookBorrowed && b.bookBorrowed !== "—"
    ).length;
  };

  const newBorrower = async (payload) => {
    await LibraryService.addBorrower(payload);
    await refreshAll();
  };

  const updateBorrower = async (payload) => {
    await LibraryService.updateBorrower(payload);
    await refreshAll();
  };

  const deleteBorrower = async (payload) => {
    await LibraryService.deleteBorrower(payload);
    await refreshAll();
  };

  const returnBorrower = async (payload) => {
    await LibraryService.returnBorrower(payload);
    await refreshAll();
  };


  const overdueList = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return borrowers.value.filter((b) => {
      const dueDate = new Date(b.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  });

  watch(
    overdueList,
    (newVal) => {
      overdue.value = newVal.length;
    },
    { immediate: true }
  );

  const getDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diff = today - due;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? `${days} day(s)` : "0";
  };



  const fetchTransaction = async () => {
    const data = await LibraryService.getAllTransaction();
    transactions.value = data;
  };


  return {
    // state
    categories,
    books,
    totalBooks,
    borrowers,
    totalBorrowers,
    overdue,
    overdueList,
    transactions,

    // methods
    fetchCategories,
    newCategory,
    updateCategory,
    deleteCategory,

    fetchBooks,
    newBook,
    updateBook,
    deleteBook,

    fetchBorrower,
    newBorrower,
    updateBorrower,
    deleteBorrower,
    returnBorrower,

    fetchTransaction,
    getDaysOverdue,
    calculateTotalBooks,
  };
});
