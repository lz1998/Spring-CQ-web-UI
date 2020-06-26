import Vue from 'vue'
import VueRouter from 'vue-router'
import menuItems from './menuItems'
import cookies from 'js-cookie'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/status'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/layout',
        name: 'layout',
        redirect: '/status',
        component: () => import('@/views/layout/layout.vue'),
        children:menuItems
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 路由守卫
router.beforeEach((to, from, next)=>{
    // 如果不是登陆，并且没有cookie，跳转到登陆界面
    // 如果cookie已过期，会在@/utils/request，收到 “请先登陆” 时处理
    if(to.fullPath != '/login' && !cookies.get("token")){
        next("/login")
    }else{
        next()
    }
})

export default router
