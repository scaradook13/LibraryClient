<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 md:px-6 py-3 md:py-4 shadow-md flex justify-between items-center"
    >
      <div class="flex items-center gap-3">
        <img src="../assets/logo.png" class="w-14 h-14 md:w-20 md:h-20" alt="Logo" />
        <h1
          class="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide whitespace-nowrap"
        >
          SCHOLAR SHELF
        </h1>
      </div>

      <!-- Mobile menu button -->
      <button
        class="md:hidden bg-yellow-300 p-2 rounded-lg shadow-sm hover:bg-yellow-200 transition"
        @click="toggleSidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6 text-gray-800"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </header>

    <!-- Content Area -->
    <div class="flex flex-1 relative">
      <!-- Sidebar -->
      <transition name="slide-fade">
        <Sidebar
          v-if="isSidebarVisible"
          :active-menu="activeMenu"
          @change-menu="changeMenu"
          class="fixed md:static top-0 left-0 h-full z-40 bg-white md:bg-transparent shadow-md md:shadow-none w-64 md:w-auto"
        />
      </transition>

      <!-- Backdrop for mobile sidebar -->
      <div
        v-if="isSidebarVisible && isMobile"
        class="fixed inset-0 bg-opacity-30 z-30"
        @click="closeSidebar"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 overflow-auto">
        <Dashboard v-if="activeMenu === 'dashboard'" />
        <Books v-if="activeMenu === 'books'" />
        <Overdue v-if="activeMenu === 'overdue'" :overdue-list="overdueList" />
        <Borrower v-if="activeMenu === 'borrower'" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Dashboard from "../components/Dashboard.vue";
import Books from "../components/Books.vue";
import Overdue from "../components/Overdue.vue";
import Borrower from "../components/Borrower.vue";

const activeMenu = ref("dashboard");
const isSidebarVisible = ref(true);
const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) isSidebarVisible.value = false;
  else isSidebarVisible.value = true;
};

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
  if (isMobile.value) isSidebarVisible.value = false;
};

const changeMenu = (menu) => {
  activeMenu.value = menu;
  closeSidebar();
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* Smooth transition for sidebar */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
