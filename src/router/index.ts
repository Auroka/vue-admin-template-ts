/*
 * @Description:
 * @Author: lxd
 * @Date: 2020-09-16 16:56:27
 * @LastEditTime: 2020-09-18 13:58:43
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/index.vue'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/errorpage/404.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'icon-homepage_fill'
        }
      }
    ]
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Layout,
    redirect: '/menu/menu-2',
    meta: {
      title: '菜单',
      icon: 'icon-homepage_fill'
    },
    children: [
      {
        path: 'menu-1',
        component: () => import('@/views/menu/menu-1.vue'),
        redirect: '/menu/menu-1/menu-1-1',
        meta: {
          title: '菜单-1'
        },
        alwaysShow: true,
        children: [
          {
            path: 'menu-1-1',
            component: () => import('@/views/menu/menu-1-1.vue'),
            meta: {
              title: '菜单-1-1'
            }
          },
          {
            path: 'menu-1-2',
            component: () => import('@/views/menu/menu-1-2.vue'),
            meta: {
              title: '菜单-1-2'
            }
          }
        ]
      },
      {
        path: 'menu-2',
        component: () => import('@/views/menu/menu-2.vue'),
        meta: {
          title: '菜单-2'
        }
      }
    ]
  }
]

// 异步加载的路由
export const asyncRoutes = []

export const lastRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes
})

export default router
