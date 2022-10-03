import { createWebHistory, createRouter } from 'vue-router';
import UserList from '@/components/UserList.vue';
import UserInfo from '@/components/UserInfo.vue';
import Login from '@/components/Login.vue';

import store from '../store/index.js';
import swal from 'sweetalert';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/info',
    name: 'UserInfo',
    component: UserInfo,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next('/login');
  } else if (
    to.meta.requiresAdmin &&
    store.getters.isLoggedIn &&
    !store.getters.isAdmin
  ) {
    swal('Sorry, you do not have admin rights!');
    next('/info');
  } else {
    next();
  }
});

export default router;
