import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification' 
import 'vue-toastification/dist/index.css' 

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  position: "top-center",
  timeout: 3000,
  pauseOnHover: true,
  hideProgressBar: true,
  closeButton: "button",
})

app.mount('#app')
