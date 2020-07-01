import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/homeBannerSetting',
          name: 'homeBannerSetting',
          component: () => import(/* webpackChunkName: "about" */ './views/HomeBannerSetting.vue')
        },
        {
          path: '/workshopBannerSetting',
          name: 'workshopBannerSetting',
          component: () => import(/* webpackChunkName: "about" */ './views/WorkshopBannerSetting.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login/Index.vue')
    },
    
  ]
})
