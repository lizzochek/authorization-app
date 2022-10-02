import { createWebHistory, createRouter } from 'vue-router';
import UserList from '@/components/UserList.vue';
import UserInfo from '@/components/UserInfo.vue';
import Login from '@/components/Login.vue';

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
  },
  {
    path: '/info',
    name: 'UserInfo',
    component: UserInfo,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
