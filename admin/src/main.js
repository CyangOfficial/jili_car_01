// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueMoment from 'vue-moment'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import './components/common/dragDirectives'

Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
});
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueMoment);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})