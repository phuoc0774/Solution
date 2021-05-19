import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ImportSoTramBST from '../components/ImportSoTramBTS/ImportSoTramBTS.vue'
import UserIndex from '../components/Users/UserIndex.vue'
import UserCreateOrUpdate from '../components/Users/UserCreateOrUpdate.vue'
import UserCreate from '../components/Users/UserCreate.vue'
import UserUpdate from '../components/Users/UserUpdate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Users',
    name: 'Users',
    component: UserIndex
  },
  {
    path: '/ImportSoTram',
    name: 'ImportSoTram',
    component: ImportSoTramBST
  },
  {
    path: '/users/create',
    name: 'userscreate',
    component: UserCreate
  },
  {
    path: '/users/edit/:id',
    name: 'usersedit',
    component: UserUpdate,
    // component: UserCreateOrUpdate
  },
  {
    path: '/users/editprofile',
    name: 'userseditprofile',
    component: UserUpdate,
    // component: UserCreateOrUpdate
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
