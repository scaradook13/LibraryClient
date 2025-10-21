import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import { useLibraryStore } from "@/stores/library";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
  ],
});

let dataInitialized = false;

router.beforeEach(async (to, from, next) => {
  const libraryStore = useLibraryStore();

  if (!dataInitialized) {
    
    await Promise.all([
      libraryStore.fetchCategories(),
      libraryStore.fetchBooks(),
      libraryStore.fetchBorrower(),
      libraryStore.fetchTransaction(),
    ]);

    libraryStore.calculateTotalBooks();
    dataInitialized = true;
  }

  next();
});

export default router;

