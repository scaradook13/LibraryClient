import { ref, computed, watch } from 'vue'
import LibraryService from '@/api/LibraryService'
import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('library', () => {
  const categories = ref([])
  const books = ref([])
  const totalBooks = ref(0)
  const borrowers = ref([])
  const totalBorrowers = ref(0)
  const overdue = ref(0);
  const transactions = ref([])

  const newBook = async (payload) => {
    try {
      const response = await LibraryService.newBook(payload);
      await fetchBooks();
      await calculateTotalBooks();
      console.log(response);
    } catch (error) {
      console.log(err.response?.data);
    }
  };

  const newCategory = async (payload) => {
    try {
      const response = await LibraryService.addCategory(payload);
      await fetchCategories();
      console.log(response);
    } catch (error) {
      console.log(err.response?.data);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await LibraryService.getAllCategory();
      categories.value = data;
      
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchBooks = async () => {
    try {
      const data = await LibraryService.getAllBook();
      books.value = data;
      
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  
  const calculateTotalBooks = () => {
    totalBooks.value = books.value.reduce((sum, book) => sum + book.quantity, 0);
  };

  const updateBook = async (payload) => {
    try {
      const response = await LibraryService.updateBook(payload);
      await fetchBooks();
      await calculateTotalBooks();
      console.log(response);
    } catch (error) {
      console.log(err.response?.data);
    }
  };

  const deleteBook = async (payload) => {
    try {
      const response = await LibraryService.deleteBook(payload);
      await fetchBooks();
      await calculateTotalBooks();
      console.log(response);
    } catch (error) {
    }
  };

  const deleteCategory = async (payload) => {
    try {
      const response = await LibraryService.deleteCategory(payload);
      await fetchCategories();
      console.log(response);
    } catch (error) {
    }
  };

  const updateCategory = async (payload) => {
    try {
      const response = await LibraryService.updateCategory(payload);
      await fetchCategories();
      console.log(response);
    } catch (error) {
      console.log(err.response?.data);
    }
  };

  const fetchBorrower = async () => {
  try {
    const data = await LibraryService.getAllBorrower();
    borrowers.value = data;

    totalBorrowers.value = data.filter(b => b.bookBorrowed && b.bookBorrowed !== "—").length;
  } catch (error) {
    console.error("Error fetching borrowers:", error);
  }
};


  const newBorrower = async (payload) => {
    try {
      const response = await LibraryService.addBorrower(payload);
      await fetchBorrower();
      await fetchBooks();
      await calculateTotalBooks();
      await fetchTransaction();
      console.log(response);
    } catch (error) {
    }
  };

  const deleteBorrower = async (payload) => {
    try {
      const response = await LibraryService.deleteBorrower(payload);
      await fetchBorrower();
      await fetchBooks();
      await calculateTotalBooks();
      console.log(response);
    } catch (error) {
    }
  };

  const updateBorrower = async (payload) => {
    try {
      const response = await LibraryService.updateBorrower(payload);
      await fetchBorrower();
      await fetchBooks();
      await calculateTotalBooks();
      await fetchTransaction();
      console.log(response);
    } catch (error) {
      console.log(err.response?.data);
    }
  };

  const overdueList = computed(() => {
  const today = new Date();
  return borrowers.value.filter(b => {
    const due = new Date(b.dueDate);
    return due < today;
  });
});

  watch(overdueList, (newVal) => {
    overdue.value = newVal.length;
  }, { immediate: true });

  const getDaysOverdue = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diff = today - due;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `${days} day(s)` : "0";
  };

  const fetchTransaction = async () => {
    try {
      const data = await LibraryService.getAllTransaction();
      transactions.value = data;

    } catch (error) {
    }
  };

  const returnBorrower = async (payload) => {
    try {
      const response = await LibraryService.returnBorrower(payload);
      await fetchBorrower();
      await fetchBooks();
      await calculateTotalBooks();
      await fetchTransaction();
      console.log(response);
    } catch (error) {
      console.log(err.response?.data);
    }
  };


  return { 
    newBook,
    newCategory,
    fetchCategories,
    categories,
    fetchBooks,
    books,
    calculateTotalBooks,
    totalBooks,
    updateBook,
    deleteBook,
    deleteCategory,
    updateCategory,
    fetchBorrower,
    borrowers,
    newBorrower,
    deleteBorrower,
    updateBorrower,
    totalBorrowers,
    overdue,
    overdueList,
    getDaysOverdue,
    transactions,
    fetchTransaction,
    returnBorrower
   }
})
