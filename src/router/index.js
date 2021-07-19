import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Produk from '../views/Produk.vue'
import ProdukDetail from '../views/ProdukDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import PesananSukses from '../views/PesananSukses.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path : '/produk',
    name : 'Produk',
    component : Produk
  },
  {
    path : '/produk/:id',
    name : 'ProdukDetail',
    component : ProdukDetail
  },
  {
    path : '/keranjang',
    name : 'Keranjang',
    component : Keranjang
  },
  {
    path : '/pesanan-sukses',
    name : 'PesananSukses',
    component : PesananSukses
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
