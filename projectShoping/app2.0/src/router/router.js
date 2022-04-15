
//引入必要组件 
export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            showFooter: true
        },
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
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
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder'),
            },
        ]
    },
    {
        path: '/pay/:orderId?',
        component: () => import('@/pages/Pay'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            showFooter: true
        }
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        props: true,
        meta: {
            showFooter: true
        },
        name: 'search'
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            showFooter: false
        },
        name: 'login'
    },
    {
        path: '/Register',
        component: () => import('@/pages/Register'),
        meta: {
            showFooter: false
        }
    },
    {
        path: '/details/:skuid',
        component: () => import('@/pages/Details'),
        meta: {
            showFooter: true
        }
    },
    {
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        name: 'addcartsuccess',
        meta: {
            showFooter: true,
            title: '添加购物车'
        }
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
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
        component: () => import('@/pages/Trade'),
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

