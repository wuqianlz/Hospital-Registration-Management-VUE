import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RigthView from '../views/RigthView.vue'
import QuitView from '../views/QuitView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path:'/rigth',
    name:'rigth',
    component: RigthView
  },
  {
    path:"/quit",
    name:"quit",
    component: QuitView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
