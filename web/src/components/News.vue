<template>
  <div class="news-page">
    <Header></Header>
    <div class="content">
      <ul class="bread-crumb d-flex">
        <li>您的位置：</li>
        <li>
          <router-link to="/">首页 &gt;&nbsp;</router-link>
        </li>
        <li>
          <router-link to="/news">新闻列表</router-link>
        </li>
      </ul>
      <div class="titleName d-flex ai-center">
        <div class="flex-1 title">新闻列表</div>
        <div @click="cardList = 0" class="cardBlock" :class="{active: cardList===0}">
          <i class="iconfont icon-card card"></i>
          <span>卡片</span>
        </div>
        <div
          @click="cardList = 1"
          class="listBlock d-flex ai-center"
          :class="{active: cardList===1}"
        >
          <i class="iconfont icon-list list"></i>
          <span>列表</span>
        </div>
      </div>
      <div class="screen d-flex jc-between">
        <ul class="d-flex">
          <li @click="nowScreen=0;timeScreen=false;" :class="{active: nowScreen===0}">全部</li>
          <li @click="nowScreen=1;timeScreen=false;" :class="{active: nowScreen===1}">视频</li>
          <li class="timeScreen" @click="timeScreen = !timeScreen" :class="{active: timeScreen}">
            <div class="d-flex jc-between ai-center">
              <i class="iconfont icon-ios-shijian time-icon"></i>
              <span>{{time}}</span>
              <i class="iconfont icon-down_arrow arrow"></i>
            </div>
            <ul :style="{display: timeScreen ? 'block': 'none'}" class="submenus">
              <li @click="time = item" v-for="item in timeLists" :key="item.id">{{item}}</li>
            </ul>
          </li>
        </ul>
        <div class="search-box d-flex ai-center">
          <input v-model="keyWords" type="text" placeholder="请输入关键字快速筛选" />
          <i @click="search()" class="iconfont icon-chaxun"></i>
        </div>
      </div>
      <div class="news-list">
        <div v-show="cardList === 0" class="card-wraper">
          <ul class="card-list d-flex flex-wrap">
            <li v-for="item in newsList" :key="item.id">
              <router-link :to="`/news/${item.id}`" tag="div" class="img">
                <img class="w-100" :src="item.news_pic" />
              </router-link>
              <div class="info d-flex flex-column jc-between">
                <div class="text">
                  <h4>{{item.title | titleFilter}}</h4>
                  <p>{{item.description | descFilter}}</p>
                </div>
                <div class="d-flex jc-between">
                  <div class="left-time">{{item.create_time | moment("YYYY年MM月DD日")}}</div>
                  <div class="right d-flex ai-center">
                    <i class="iconfont icon-eye eye"></i>
                    <span>{{item.bowser_count}}</span>
                    <i
                      @click="favors(item.id)"
                      class="iconfont love"
                      :class="{'icon-love':!favorClass(item.id),'icon-love1': favorClass(item.id)}"
                    ></i>
                    <span>{{item.like_count}}</span>
                    <router-link to="/news">
                      <i class="iconfont icon-share share"></i>
                      <span>{{item.share_count}}</span>
                      <span></span>
                    </router-link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div
            v-if="isShow"
            @click="loadMore"
            style="margin: 10px auto 20px;"
            class="btn-primary"
          >+ 查看更多</div>
        </div>
        <div v-show="cardList === 1" class="lists-wraper">
          <ul class="lists">
            <li v-for="item in newsList" :key="item.id">
              <router-link tag="h4" :to="`/news/${item.id}`">{{item.title | titleFilter}}</router-link>
              <p>{{item.description | descFilter}}</p>
              <p class="d-flex">
                <span class="flex-1">{{item.create_time | moment("YYYY年MM月DD日")}}</span>
                <span class="d-flex">
                  <i class="iconfont icon-eye eye"></i>
                  <span>{{item.bowser_count}}</span>
                  <i
                    @click="favors(item.id)"
                    class="iconfont icon-love love"
                    :class="{'icon-love':!favorClass(item.id),'icon-love1': favorClass(item.id)}"
                  ></i>
                  <span>{{item.like_count}}</span>
                  <i class="iconfont icon-share share"></i>
                  <span>{{item.share_count}}</span>
                </span>
              </p>
            </li>
          </ul>
          <div
            v-if="isShow"
            @click="loadMore"
            style="margin: 20px 0 40px;"
            class="btn-primary"
          >+ 查看更多</div>
        </div>
      </div>
    </div>
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
      nowScreen: 0,
      timeScreen: false,
      timeLists: ["时间", "近一个月", "近三个月", "近六个月", "近一年", "更久"],
      time: "时间",
      cardList: 0, //卡片/列表切换
      page: 1, //新闻页数
      count: 0, //新闻数量
      newsList: [], //新闻列表
      maxPage: 0, //总页数
      keyWords: "", //搜索关键字
      isShow: true, //控制卡片列表的显示
      isFavors: false, //是否已经收藏
      localsFav: []
    };
  },
  methods: {
    async fetchNews() {
      let { data } = await this.$http.get(`/news/?page=${this.page}`);
      if (this.page > 1) {
        this.newsList = [...this.newsList, ...data.newsList];
      } else {
        this.count = data.count;
        this.newsList = data.newsList;
        this.maxPage = Math.ceil(this.count / 8);
      }
    },
    loadMore() {
      this.page++;
      if (this.page > this.maxPage) {
        //当前页大于总页数
        this.page = this.maxPage;
        this.isShow = false;
        console.log(this.page, this.maxPage);
        return;
      }

      this.fetchNews();
    },
    async search() {
      if (this.keyWords.trim() === "") {
        this.fetchNews();
        return;
      }
      let { data } = await this.$http.get(`/search/?wd=${this.keyWords}`);
      this.newsList = [...data.newsList];
      if (data.newsList.length === 0) {
        this.isShow = false;
      }
    },
    async getFavors(id) {
      //收藏新闻
      let { data } = await this.$http.get(`/getFavors?id=${id}`);
      let newsIndex = this.newsList.findIndex(item => item.id === data.data.id);
      this.newsList[newsIndex].like_count = data.data.like_count;
    },
    async delFavors(id) {
      //取消收藏
      let { data } = await this.$http.get(`/delFavors?id=${id}`);
      let newsIndex = this.newsList.findIndex(item => item.id === data.data.id);
      this.newsList[newsIndex].like_count = data.data.like_count;
    },
    listenDom(ev) {
      if (ev.target.parentNode.classList[0] !== "d-flex") {
        this.timeScreen = false;
      }
    },
    favorClass(id) { // 判断收藏class
      if (!this.localsFav) return false;
      let isExis = this.localsFav.find(item => item.newsId === id);
      if (!isExis) {
        return false;
      } else {
        return isExis.status;
      }
    },
    favorsHandel(id) { //收藏数据处理
      if (!this.localsFav) {
        this.localsFav.push({ status: true, newsId: id });
      }
      for (let i = 0; i < this.localsFav.length; i++) {
        if (this.localsFav[i].newsId === id) {
          if (this.isFavors) {
            this.localsFav[i].status = true;
          } else {
            this.localsFav[i].status = false;
          }
          break;
        }
      }
      let isExis = this.localsFav.find(item => item.newsId === id);
      if (!isExis) {
        this.localsFav.push({ status: true, newsId: id });
      }
      localStorage.setItem("favors", JSON.stringify(this.localsFav));
      this.localsFav = JSON.parse(localStorage.favors);
      Bus.$emit('isFavor',this.favorClass());
    },
    favors(id) {
      //点击收藏/取消收藏
      this.isFavors = !this.isFavors;
      let isExis = this.localsFav.find(item => item.newsId === id);
      this.favorsHandel(id);
      this.isFavors = isExis && isExis.status;
      if (!isExis) {
        this.getFavors(id);
        this.isFavors = true;
      }
      if (isExis) {
        if (this.isFavors && isExis.status) {
          this.getFavors(id);
        } else {
          this.delFavors(id);
        }
      }
    }
  },
  created() {
    console.log("执行生命周期");
    this.fetchNews();
    this.localsFav = JSON.parse(localStorage.favors || "[]");
    Bus.$emit('isFavor',this.favorClass());
  }
};
</script>

<style lang="scss">
@import "../assets/scss/varibles.scss";
.news-page {
  margin-top: 50px;
  .content {
    width: 86%;
    margin: auto;
    .bread-crumb {
      font-size: 12px;
      color: map-get($colors, "gray-2");
      a {
        color: map-get($colors, "gray-2");
      }
    }
    .titleName {
      font-size: 12px;
      margin: 10px 0;
      .title {
        font-size: 18px;
      }
      .cardBlock {
        margin-right: 5px;
        line-height: 14px;
        padding-right: 5px;
        border-right: 1px solid map-get($colors, "gray");
        cursor: pointer;
      }
      .listBlock {
        cursor: pointer;
      }
      i {
        margin: 0 2px;
        &.card {
          font-size: 12px;
        }
        &.list {
          font-size: 16px;
        }
      }
      .active {
        color: map-get($colors, "primary");
      }
    }
    .screen {
      ul {
        li {
          padding: 0 6px;
          text-align: center;
          height: 21px;
          line-height: 21px;
          font-size: 12px;
          user-select: none;
          cursor: pointer;
          i {
            &.time-icon {
              color: map-get($colors, "primary-2");
            }
          }
          &.active {
            background: map-get($colors, "primary-2");
            color: #fff;
            i {
              &.arrow {
                transform: rotate(180deg);
              }
              color: #fff !important;
            }
          }
          &.timeScreen {
            margin-left: 20px;
            position: relative;
            span {
              margin: 0 4px;
            }
            .submenus {
              color: #fff;
              width: 100%;
              position: absolute;
              z-index: 10;
              left: 0;
              top: 20px;
              background: rgba(73, 166, 255, 0.8);
              li {
                line-height: 24px;
                &:hover {
                  background: map-get($colors, "gray");
                }
              }
            }
          }
        }
      }
      .search-box {
        border: 1px solid map-get($colors, "gray");
        position: relative;
        padding-right: 5px;
        height: 25px;
        input {
          border: none;
          width: 200px;
          padding-left: 5px;
          margin-right: 5px;
          &::placeholder {
            font-size: 10px;
          }
        }
        i {
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    .news-list {
      padding: 0 20px;
      margin-top: 20px;
      .card-wraper {
        .card-list {
          li {
            border: 1px solid map-get($colors, "gray");
            width: 23%;
            margin: 0 10px 20px;
            .img {
              font-size: 0;
              cursor: pointer;
              overflow: hidden;
              &:hover {
                img {
                  animation: zoom ease 2s;
                }
              }
            }
            .info {
              box-shadow: 4px 4px 14px 4px #ccc, -4px -4px 14px 4px #ccc;
              padding: 20px 5px;
              min-height: 156px;
              h4 {
                margin: 0;
                font-size: 16px;
              }
              p {
                font-size: 12px;
                margin: 10px 0 20px;
              }
              .left-time {
                font-size: 12px;
              }
              .right {
                font-size: 12px;
                i {
                  font-size: 12px;
                  margin: 0 4px;
                  color: map-get($colors, "primary");
                  &.love {
                    color: red;
                  }
                }
              }
            }
          }
        }
      }
      .lists-wraper {
        width: 915px;
        .lists {
          li {
            padding-bottom: 6px;
            margin-bottom: 10px;
            border-bottom: 1px solid map-get($colors, "gray");
            h4 {
              margin: 0 0 10px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
            }
            p {
              font-size: 12px;
              margin: 8px 0;
              & > span {
                font-size: 12px;
                span {
                  margin-right: 10px;
                }
                i {
                  font-size: 12px;
                  margin: 0 5px;
                  &.eye {
                    color: map-get($colors, "primary");
                  }
                  &.love {
                    color: red;
                    cursor: pointer;
                  }
                  &.share {
                    color: map-get($colors, "primary");
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>