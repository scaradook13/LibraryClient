<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 shadow-md">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-gray-800 rounded-full p-2 w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 tracking-wide">SCHOLAR SHELF</h1>
        </div>
      </div>
    </header>
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar :active-menu="activeMenu" @change-menu="activeMenu = $event" />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <Dashboard 
          v-if="activeMenu === 'dashboard'" 
          :stats="stats" 
          @open-modal="openModal"
        />
        <Books 
          v-if="activeMenu === 'books'" 
          :books="books" 
          @open-modal="openModal"
        />
        <Overdue 
          v-if="activeMenu === 'overdue'" 
          :overdue-list="overdueList"
        />
        <Transactions 
          v-if="activeMenu === 'transactions'" 
          :transactions="transactions"
        />
        <Borrower v-if="activeMenu === 'borrower'" />
      </main>
    </div>

    <!-- Modal -->
    <Modal 
      :is-open="showModal !== null" 
      :modal-type="showModal" 
      @close="showModal = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Dashboard from '../components/Dashboard.vue';
import Books from '../components/Books.vue';
import Overdue from '../components/Overdue.vue';
import Transactions from '../components/Transactions.vue';
import Borrower from '../components/Borrower.vue';
import Modal from '../components/Modal.vue';
import { useBookStore } from '../stores/bookStore';


const { books, transactions, overdueList, stats } = useBookStore();

const activeMenu = ref('dashboard');
const searchQuery = ref('');
const showModal = ref(null);

const menuLabels = {
  dashboard: 'DashBoard',
  books: 'Books',
  overdue: 'Overdue List',
  transactions: 'Transactions',
  borrower: 'Borrower'
};

const currentPageLabel = computed(() => menuLabels[activeMenu.value] || 'DashBoard');

const openModal = (modalType) => {
  showModal.value = modalType;
};
</script>