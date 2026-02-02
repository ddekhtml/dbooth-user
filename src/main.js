import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './page/Home.vue'
import Result from './page/Result.vue'

const routes = [
    {
        path :'/', 
        component : Home
    }, {
        path : '/result/:uuid', 
        component : Result,
        async beforeEnter(to, from, next) {
        const { uuid } = to.params
        try {
            const res = await fetch(`https://api.example.com/result/${uuid}`)
            if (!res.ok) throw new Error('Data not found')
            const data = await res.json()
            if (data) {
            next() 
            } else {
            next('/') 
            }
        } catch (err) {
            next('/') 
        }
        }
    }
]
const router =  createRouter({
    history : createWebHistory(), 
    routes
})
createApp(App).use(router).mount('#app')
