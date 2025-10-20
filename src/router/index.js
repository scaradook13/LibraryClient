import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { useLibraryStore } from '@/stores/library';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const libraryStore = useLibraryStore();
  await libraryStore.fetchCategories();
  await libraryStore.fetchBooks();
  await libraryStore.calculateTotalBooks();
  await libraryStore.fetchBorrower();
  await libraryStore.fetchTransaction();
    next();
});
export default router
