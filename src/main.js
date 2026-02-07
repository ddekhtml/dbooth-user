import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './page/Home.vue'
import Result from './page/Result.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaChevronLeft, FaChevronRight, FaDownload, BiDownload } from 'oh-vue-icons/icons'


addIcons(
  FaChevronLeft,
  FaChevronRight,
  FaDownload, 
  BiDownload
)

const routes = [
    {
        path :'/', 
        component : Home
    }, {
        path : '/result/:uuid', 
        component : Result,
    },
     {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
const router =  createRouter({
    history : createWebHistory(), 
    routes
})
createApp(App).use(router).component('v-icon', OhVueIcon).mount('#app')
