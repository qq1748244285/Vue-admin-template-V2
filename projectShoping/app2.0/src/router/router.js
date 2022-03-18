
//引入必要组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Details from '@/pages/Details'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            showFooter: true
        }, 
    },
    {
        path: '/center',
        component: center,
        meta: {
            showFooter: true
        },
        children: [
            {
                path: '/center',
                redirect: '/center/myorder' //如果访问center 重定向到myorder
            },
            {
                path: 'myorder',
                component: myOrder,
            },
            {
                path: 'grouporder',
                component: groupOrder,
            },
        ]
    },
    {
        path: '/pay/:orderId?',
        component: Pay,
        meta: {
            showFooter: true
        },
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }
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
        },
        name: 'login'
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
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: {
            showFooter: true,
            title: '添加购物车'
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        name: 'ShopCart',
        meta: {
            showFooter: true,
            title: '购物车'
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/trade',
        component: Trade,
        name: 'Trade',
        //只有在shopcart购物车页才可以跳到这个页面来
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next();
            } else {
                next(false);
            }
        }
    }
]

