import { createRouter, createWebHistory } from "vue-router";
import LoginView from '@/views/Login.vue';
import DashboardView from '@/views/Dashboard.vue';
import ProductsView from '@/views/Products.vue';
import CartsView from '@/views/Carts.vue';
import UsersView from '@/views/Users.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
    },
    {
        path: '/products',
        name: 'Products',
        component: ProductsView,
    },
    {
        path: '/carts',
        name: 'Carts',
        component: CartsView,
    },
    {
        path: '/users',
        name: 'Users',
        component: UsersView,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;


