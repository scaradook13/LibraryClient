<template>
  <aside class="w-48 bg-gray-200 min-h-screen p-4">
    <nav class="space-y-2">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="$emit('change-menu', item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
          activeMenu === item.id
            ? 'bg-yellow-400 text-gray-800 font-semibold'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        ]"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { h } from 'vue';

defineProps({
  activeMenu: String
});

defineEmits(['change-menu']);

const HomeIcon = (props) => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: props.size || 24, height: props.size || 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, [
  h('path', { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
  h('polyline', { points: "9 22 9 12 15 12 15 22" })
]);

const BookIcon = (props) => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: props.size || 24, height: props.size || 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, [
  h('path', { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" })
]);

const ClockIcon = (props) => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: props.size || 24, height: props.size || 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, [
  h('circle', { cx: "12", cy: "12", r: "10" }),
  h('polyline', { points: "12 6 12 12 16 14" })
]);

const FileTextIcon = (props) => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: props.size || 24, height: props.size || 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, [
  h('path', { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }),
  h('polyline', { points: "14 2 14 8 20 8" }),
  h('line', { x1: "16", x2: "8", y1: "13", y2: "13" }),
  h('line', { x1: "16", x2: "8", y1: "17", y2: "17" }),
  h('line', { x1: "10", x2: "8", y1: "9", y2: "9" })
]);

const UserIcon = (props) => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: props.size || 24, height: props.size || 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, [
  h('path', { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
  h('circle', { cx: "12", cy: "7", r: "4" })
]);

const menuItems = [
  { id: 'dashboard', icon: HomeIcon, label: 'DashBoard' },
  { id: 'books', icon: BookIcon, label: 'Books' },
  { id: 'borrower', icon: UserIcon, label: 'Borrower' },
  { id: 'overdue', icon: ClockIcon, label: 'Overdue List' },
  { id: 'transactions', icon: FileTextIcon, label: 'Transactions' },
];
</script>