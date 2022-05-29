
import { createRouter, createWebHistory } from 'vue-router';

import Guard from '../service/middleware';

import LayoutAuth from '../layouts/Auth.vue';
import LayoutDefault from '../layouts/Admin.vue';

import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';

import Home from '../views/Admin/Home.vue';
import Product from '../views/Admin/Product/Index.vue';

import IndexCategory from '../views/Admin/Category/Index.vue';
import CreateCategory from '../views/Admin/Category/Create.vue';


const category = [
    { path: 'category', name: 'category.index', component: IndexCategory },
    { path: 'category/create', name: 'category.create', component: CreateCategory }
]

const routes = [
    {
        path: '/', component: LayoutDefault,
        beforeEnter: Guard.redirectIfNotAuthenticated,
        children: [
            { path: '', name: 'index', component: Home },
            { path: 'product', name: 'product', component: Product },
            ...category
        ],
    },
    {
        path: '/login', component: LayoutAuth,
        beforeEnter: Guard.redirectIfAuthenticated,
        children: [
            { path: '', name: 'login', component: Login },
        ],
    },
    {
        path: '/register', component: LayoutAuth,
        children: [
            { path: '', name: 'register', component: Register },
        ],
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;