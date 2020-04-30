import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home')
    },
    {
      path: '/club',
      name: "Club",
      component: () => import('@/components/Club')
    },
    {
      path: '/news',
      name: "News",
      component: () => import('@/components/News')
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: () => import('@/components/NewsDetail'),
    },
    {
      path: '/shop',
      name: "Shop",
      component: () => import('@/components/Shop')
    },
    {
      path: '/order/:id',
      name: "ShopOrder",
      component: () => import('@/components/ShopOrder')
    },
    {
      path: '/registerorsginIn/:setpId',
      name: "Login",
      component: () => import('@/components/Login'),
      props: true //如果 props 被设置为 true，route.params 将会被设置为组件属性
    },
    {
      path: '/personalProfile',
      name: 'person',
      component: () => import('@/components/personalProfile'),
      meta: { requiresAuth: true } // requiresAuth 表示这个页面需要认证 token才能进入 
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.meta.requiresAuth && !localStorage.token){
    return next('/registerorsginIn/login');
  }
  next();
});

export default router;
