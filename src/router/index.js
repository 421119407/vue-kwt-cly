import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Sale from '../pages/sale/index'
import Stock from '../pages/stock/index'
import Ktree from '../components/ktree/index'

Vue.use(VueRouter)

export const mapMenu = [
  {
    path: '/',
    name: 'home',
    component: Home,
    noMenu: true
  },
  {
    path: '/ktree',
    name: 'ktree',
    component: Ktree,
    noMenu: true
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: Sale,
    noMenu: true
  },
  {
    path: '/dashboard',
    name: '首页',
    meta: { title: '首页', icon: '' },
    component: null
  },
  {
    path: '/sale',
    name: 'sale',
    component: Home,
    meta: { title: '销售管理', icon: '' },
    children: [
      {
        path: '/sale/offer',
        name: 'offer',
        component: Sale,
        meta: { title: '销售报价单', icon: '' }
      },
      {
        path: '/sale/indent',
        name: 'indent',
        component: Stock,
        meta: { title: '销售订货单', icon: '' }
      }
    ]
  },
  {
    path: '/stock',
    name: '库存管理',
    component: Home,
    meta: { title: '库存管理', icon: '' },
    children: [{
      path: '/stock/outStock',
      name: '出库管理',
      meta: { title: '出库管理', icon: '' },
      component: null
    },
    {
      path: '/stock/putStock',
      name: '入库管理',
      meta: { title: '入库管理', icon: '' },
      component: null
    },
    {
      path: '/stock/endMonthHandle',
      name: '月末处理',
      meta: { title: '月末处理', icon: '' },
      component: null
    }
    ]
  }
]

const router = new VueRouter({
  routes: mapMenu
})

export default router
