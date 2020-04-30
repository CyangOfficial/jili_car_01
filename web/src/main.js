// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/scss/style.scss'
import './assets/iconfonts/iconfont.css'

//element-ui 按需引入
import { Form, FormItem, Input, RadioGroup, Radio, DatePicker, Option, Select, Button, Upload, Message, Checkbox } from 'element-ui'
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Radio.name, Radio);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Button.name, Button);
Vue.component(Upload.name, Upload);
Vue.component(Message.name, Message);
Vue.component(Checkbox.name, Checkbox);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
Vue.prototype.$message = Message;


// Vue.prototype.$EventBus = new Vue();

//swiper轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

//currency货币过滤
import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter, {
  symbol: '￥',
  thousandsSeparator: '.',
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

//时间格式化
Vue.use(require('vue-moment'));

//字符长度过滤
Vue.filter('titleFilter', function (val) {
  if (!val) return '...'
  if (val.length > 25) {
    return val.substring(0, 25) + '...';
  } else {
    return val;
  }
});

Vue.filter('descFilter', function (val) {
  if (!val) return '...'
  if (val.length > 40) {
    return val.substring(0, 40) + '...';
  } else {
    return val;
  }
});

//axios
import http from "./http"
Vue.prototype.$http = http;
// const axios = require('axios');
// Vue.prototype.$http = axios.create({
//   baseURL: 'http://localhost:3000/web/api'
// });


//自定义滚动条
import GeminiScrollbar from 'vue-gemini-scrollbar'
Vue.use(GeminiScrollbar)

//给每个实例混入这个方法
Vue.mixin({
  computed: {
    uploadUrl() {
      return 'http://localhost:3000/web/api/avatar'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// router.afterEach((to, from) => { /*在跳转之后执行*/
//   window.scrollTo(0,0);
// });
