
//引入必要组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Details from '@/pages/Details'

export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        props: true,
        meta: {
            showFooter: true
        },
        name: 'search'
    },
    {
        path: '/login',
        component: Login,
        meta: {
            showFooter: false
        }
    },
    {
        path: '/Register',
        component: Register,
        meta: {
            showFooter: false
        }
    },
    {
        path: '/details/:skuid',
        component: Details,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]