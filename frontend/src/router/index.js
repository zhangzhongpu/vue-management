import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import domeRouter from './dome'
import baseRouter from './base'

Vue.use(VueRouter)

const routes = [
  ...baseRouter,
  ...domeRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
