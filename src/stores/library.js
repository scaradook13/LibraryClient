import { ref, computed } from 'vue'
import LibraryService from '@/api/LibraryService'
import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('library', () => {
  const categories = ref([])
  const books = ref([])
  const totalBooks = ref(0)

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


  return { 
    newBook,
    newCategory,
    fetchCategories,
    categories,
    fetchBooks,
    books,
    calculateTotalBooks,
    totalBooks
   }
})
