<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 shadow-md">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="../assets/logo.png" class="w-20 h-20" alt="">
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
        />
        <Books 
          v-if="activeMenu === 'books'" 
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Dashboard from '../components/Dashboard.vue';
import Books from '../components/Books.vue';
import Overdue from '../components/Overdue.vue';
import Transactions from '../components/Transactions.vue';
import Borrower from '../components/Borrower.vue';
import { useBookStore } from '../stores/bookStore';

const {  transactions, overdueList  } = useBookStore();

const activeMenu = ref('dashboard');
</script>