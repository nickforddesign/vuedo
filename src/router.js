import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import { getLocalStorage } from '@/utils';

Vue.use(Router);

const auth = (router, to, from, next) => {
  if (!getLocalStorage('token')) {
    return router.push({ name: 'login' });
  }
  return next();
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register')
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('./views/Todos'),
      beforeEnter: (to, from, next) => auth(router, to, from, next)
    }
  ]
});

export default router;
