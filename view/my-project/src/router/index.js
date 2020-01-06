import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import New from '../views/New.vue'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect:'/index'
},{
    path:'/index',
    component:Index,
    redirect:'/index/login',
    children:[
        {
            path:'/index/login',
            component:Login
        },
        {
            path:'/index/new',
            component:New
        }
    ]
},{
    path:'/home',
    component:Home
}


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router