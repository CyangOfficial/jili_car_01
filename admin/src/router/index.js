import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// 懒加载的方式，我们就不需要再用import去引入组件了，直接如下即可。懒加载的好处是当你访问到这个页面的时候才会去加载相关资源，这样的话能提高页面的访问速度。
// component: resolve => require(['./page/linkParamsQuestion.vue'], resolve)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homePage'
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            meta: { title: "后台登录" },
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: "自述文件" },
            children: [
                {
                    path: "/homePage",
                    component: resolve => require(['../components/page/homePage'], resolve),
                    meta: { title: "系统首页" }
                },
                {
                    path: "/cars",
                    component: resolve => require(['../components/page/cars'], resolve),
                    meta: { title: "汽车列表" }
                },
                {
                    path: "/cars/edit/:id",
                    component: resolve => require(['../components/page/carEdit'], resolve),
                    meta: { title: "汽车编辑" }
                },
                {
                    path: "/addCar",
                    component: resolve => require(['../components/page/addCar'], resolve),
                    meta: { title: "添加车辆" }
                },
                {
                    path: "/news",
                    component: resolve => require(['../components/page/news'], resolve),
                    meta: { title: "新闻列表" }
                },
                {
                    path: "/news/newsEdit/:id",
                    component: resolve => require(['../components/page/newsEdit'], resolve),
                    props: true,
                    meta: { title: "新闻编辑" }
                },
                {
                    path: "/news/newsEdit",
                    component: resolve => require(['../components/page/newsEdit'], resolve),
                    props: true,
                    meta: { title: "发布新闻" }
                },
                {
                    path: "/predict",
                    component: resolve => require(['../components/page/predict'], resolve),
                    meta: { title: "用户预约" }
                },
                {
                    path: "/users",
                    component: resolve => require(['../components/page/users'], resolve),
                    meta: { title: "用户管理" }
                },
                {
                    path: "/forms",
                    component: resolve => require(['../components/page/form'], resolve),
                    meta: { title: "基本表单" }
                },
                {
                    path: "/editor",
                    component: resolve => require(['../components/page/editor'], resolve),
                    meta: { title: "富文本编辑器" }
                },
                {
                    path: "/markdown",
                    component: resolve => require(['../components/page/markdown'], resolve),
                    meta: { title: "markdown编辑器" }
                },
                {
                    path: "/upload",
                    component: resolve => require(['../components/page/upload'], resolve),
                    meta: { title: "图片上传" }
                },
                {
                    path: "/icon",
                    component: resolve => require(['../components/page/icon'], resolve),
                    meta: { title: "自定义图标" }
                },
                {
                    path: "/charts",
                    component: resolve => require(['../components/page/charts'], resolve),
                    meta: { title: "charts图表" }
                },
                {
                    path: "/drags",
                    component: resolve => require(['../components/page/dragList'], resolve),
                    meta: { title: "拖拽组件" }
                },
                {
                    path: "/dialog",
                    component: resolve => require(['../components/page/dialog'], resolve),
                    meta: { title: "拖拽弹窗" }
                },
                {
                    path: "/i18n",
                    component: resolve => require(['../components/page/i18n'], resolve),
                    meta: { title: "国际化功能" }
                }
            ]
        }
    ]
})