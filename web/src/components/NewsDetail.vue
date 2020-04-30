<template>
  <div class="content-page">
    <Header></Header>
    <div class="content">
      <ul class="bread-crumb d-flex">
        <li>您的位置：</li>
        <li>
          <router-link to="/">首页 &gt;&nbsp;</router-link>
        </li>
        <li>
          <router-link to="/news">新闻列表 &gt;&nbsp;</router-link>
        </li>
        <li>{{model.title}}</li>
      </ul>
      <H3>{{model.title}}</H3>
    </div>
    <div class="banner d-flex flex-column ai-center">
      <h1>{{model.title}}</h1>
      <p>{{model.create_time | moment('YYYY-MM-DD')}}</p>
      <div class="favories d-flex">
        <div class="item love">
          <i 
          class="iconfont"
          :class="{'icon-love':!changeClass,'icon-love1': changeClass}"
          ></i>
          <span>{{model.like_count}}</span>
        </div>
        <div class="item share">
          <i class="iconfont icon-share"></i>
          <span>{{model.share_count}}</span>
        </div>
      </div>
    </div>
    <div class="content" v-html="model.content"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Head";
import Bus from '../module/Bus';
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      model: {},
      newsId: -1,
      favor: ''
    };
  },
  methods: {
    async fetchNews(){
      let {data} = await this.$http.get(`/newsContent/?id=${this.newsId}`);
      this.model = data;
      if(this.model !== ''){
        this.addBowser();
      }
    },
    async addBowser(){//浏览量
      this.$http.get(`/addBowser/?id=${this.newsId}`);
    },
    changeClass(val){
      console.log(val)
      return val;
    }
  },
  created(){
    this.newsId = this.$route.params.id;
    this.fetchNews();
    Bus.$on('isFavor',this.changeClass);
  }
};
</script>

<style lang="scss">
@import "../assets/scss/varibles.scss";
.content-page {
  margin-top: 50px;
  .banner {
    background: url("../assets/images/act-bj.jpg") no-repeat;
    background-size: 100%;
    height: 360px;
    color: #fff;
    h1 {
      font-weight: normal;
      margin-top: 90px;
    }
    p {
      font-size: 18px;
      margin: 0 0 20px;
    }
    .favories {
      .item {
        width: 70px;
        line-height: 24px;
        height: 24px;
        border: 1px solid #fff;
        margin: 0 10px;
        text-align: center;
        i {
          font-size: 12px;
        }
        &.love {
          i {
            color: red;
          }
        }
      }
    }
  }
  .content {
    width: 86%;
    margin: auto;
    .bread-crumb {
      margin: 70px 0 10px;
      font-size: 12px;
      color: map-get($colors, "gray-2");
      a {
        color: map-get($colors, "gray-2");
      }
    }
  }
}
</style>