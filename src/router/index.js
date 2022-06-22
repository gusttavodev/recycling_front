
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
import EditCategory from '../views/Admin/Category/Edit.vue';

import IndexProduct from '../views/Admin/Product/Index.vue';
import CreateProduct from '../views/Admin/Product/Create.vue';
import EditProduct from '../views/Admin/Product/Edit.vue';

import IndexDiscard from '../views/Admin/Discard/Index.vue';
import CreateDiscard from '../views/Admin/Discard/Create.vue';


const category = [
    { path: 'category', name: 'category.index', component: IndexCategory },
    { path: 'category/create', name: 'category.create', component: CreateCategory },
    { path: 'category/:id/edit', name: 'category.edit', component: EditCategory, props: true }
]

const product = [
    { path: 'product', name: 'product.index', component: IndexProduct },
    { path: 'product/create', name: 'product.create', component: CreateProduct },
    { path: 'product/:id/edit', name: 'product.edit', component: EditProduct, props: true }
]

const discard = [
    { path: 'discard', name: 'discard.index', component: IndexDiscard },
    { path: 'discard/create', name: 'discard.create', component: CreateDiscard }
]

const routes = [
    {
        path: '/', component: LayoutDefault,
        beforeEnter: Guard.redirectIfNotAuthenticated,
        children: [
            { path: '', name: 'index', component: Home },
            ...product,
            ...category,
            ...discard
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