<template>
  <div class="shop-page">
    <Header class="news-header" :class="{leave: scrollTop !== 0}"></Header>
    <div :class="{topFixed: scrollTop !== 0}" class="top-bar d-flex jc-between ai-center">
      <router-link to="/shop" tag="div" class="img">
        <img class="w-100" src="../assets/images/ds-logo.7e72b8e.png" />
      </router-link>
      <div class="search-box">
        <div class="input d-flex">
          <input type="text" placeholder="请输入车型" />
          <div class="select-down" @click="toggle = !toggle" :class="{active: toggle}">
            <span>{{carsCategory}}</span>
            <i class="iconfont icon-down_arrow arrow"></i>
            <div class="sub-list">
              <span @click="carsCategory = item" v-for="(item,i) in cateList" :key="i">{{item}}</span>
            </div>
          </div>
          <div class="search-btn">
            <i class="iconfont icon-search1"></i>
          </div>
        </div>
      </div>
      <div class="hot-line">
        <img class="w-100" src="../assets/images/hot_line.png" />
      </div>
    </div>
    <div class="banner-box">
      <swiper class="my-swiper" ref="mySwiper">
        <swiper-slide>
          <img class="w-100" src="../assets/images/96697842-c9ed-42a2-a188-fb661c71d1dd.jpg" alt />
        </swiper-slide>
      </swiper>
    </div>
    <div class="cars-wraper">
      <div class="content">
        <div class="cars-list d-flex jc-between flex-wrap">
          <div class="item" v-for="item in 6" :key="item">
            <router-link to="/order/123" tag="div" class="item-img">
              <img class="w-100" src="../assets/images/7e9cb5c4-89b6-4e51-88a8-6f05b3dceaf1.jpg" />
            </router-link>
            <div class="item-info">
              <div class="d-flex jc-between">
                <div class="car-text">全新远景</div>
                <div class="car-price">
                  ￥59,900
                  <span>起</span>
                </div>
              </div>
              <div class="text-tit">全新远景</div>
              <div class="car-actions d-flex jc-between ai-center">
                <div class="favoies">
                  <i class="iconfont icon-love"></i>
                </div>
                <router-link tag="div" to="/order/:id" class="car-buy">立即购买</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="hot-cars">
          <div class="title text-center">热卖车型</div>
          <div class="pics d-flex jc-between">
            <div class="pic-left">
              <router-link class="img" tag="div" to="/order/123">
                <img class="w-100" src="../assets/images/f3478a05-7af7-4d53-80c7-e7af4530c91f.jpg" />
              </router-link>
              <div class="car-info d-flex jc-between ai-center">
                <div class="d-left">
                  <p>吉利博瑞</p>
                  <p>
                    ￥136,800
                    <span>起</span>
                  </p>
                </div>
                <div class="d-right">已订购：5297台</div>
              </div>
            </div>
            <div class="pic-right d-flex flex-wrap jc-end">
              <div class="item">
                <router-link class="img" tag="div" to="/order/123">
                  <img
                    class="w-100"
                    src="../assets/images/36581192-66dd-4dfc-ba98-a4634c01d210.jpg"
                  />
                </router-link>
                <div class="car-info d-flex jc-between ai-center">
                  <div class="d-left">
                    <p>吉利博瑞</p>
                    <p>
                      ￥136,800
                      <span>起</span>
                    </p>
                  </div>
                  <div class="d-right">已订购：5297台</div>
                </div>
              </div>
              <div class="item">
                <router-link class="img" tag="div" to="/order/123">
                  <img
                    class="w-100"
                    src="../assets/images/3af24f8c-056b-40e6-a8d9-66fcfc0e56e7.jpg"
                  />
                </router-link>
                <div class="car-info d-flex jc-between ai-center">
                  <div class="d-left">
                    <p>吉利博瑞</p>
                    <p>
                      ￥136,800
                      <span>起</span>
                    </p>
                  </div>
                  <div class="d-right">已订购：5297台</div>
                </div>
              </div>
              <div class="item">
                <router-link class="img" tag="div" to="/order/123">
                  <img
                    class="w-100"
                    src="../assets/images/2c7053a0-7af3-4357-8d9e-f4a2d598fa3d.jpg"
                  />
                </router-link>
                <div class="car-info d-flex jc-between ai-center">
                  <div class="d-left">
                    <p>吉利博瑞</p>
                    <p>
                      ￥136,800
                      <span>起</span>
                    </p>
                  </div>
                  <div class="d-right">已订购：5297台</div>
                </div>
              </div>
              <div class="item">
                <router-link class="img" tag="div" to="/order/123">
                  <img
                    class="w-100"
                    src="../assets/images/05210191-8a72-4e0b-b31e-a85c131ba2a9.jpg"
                  />
                </router-link>
                <div class="car-info d-flex jc-between ai-center">
                  <div class="d-left">
                    <p>吉利博瑞</p>
                    <p>
                      ￥136,800
                      <span>起</span>
                    </p>
                  </div>
                  <div class="d-right">已订购：5297台</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-banner">
        <img class="w-100" src="../assets/images/30469a10-8ff1-4ee3-ac16-37321522f352.jpg" />
      </div>
      <div class="content">
        <div class="tips">
          <ul class="d-flex jc-between">
            <li class="d-flex">
              <img src="../assets/images/tips-1.png" />
              <div>
                <p>价格透明</p>
                <p>全国统一价，公开透明，您可以放心无忧，底价购车</p>
              </div>
            </li>
            <li class="d-flex">
              <img src="../assets/images/tips-2.png" />
              <div>
                <p>品牌保证</p>
                <p>吉利直营官方商城，赋予您100%的购车保障</p>
              </div>
            </li>
            <li class="d-flex">
              <img src="../assets/images/tips-3.png" />
              <div>
                <p>全国联保</p>
                <p>全国授权网点为您提供尊崇的售后服务以及国家规定的“三包服务”</p>
              </div>
            </li>
            <li class="d-flex">
              <img src="../assets/images/tips-4.png" />
              <div>
                <p>专人接待</p>
                <p>线上线下1对1专人导购服务，尊享网购VIP礼遇</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Head";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      toggle: false,
      carsCategory: "选择车型",
      cateList: ["全部", "整车"],
      scrollTop: 0,
      scrollWatch: true
    };
  },
  methods: {
    listenScroll() {}
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
  beforeRouteLeave (to, from, next) {
    document.documentElement.scrollTop = 0;
    next();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/varibles.scss";
.news-header {
  z-index: 100 !important;
  transition: all 0.5s 0.3s;
}
.leave {
  top: -50px !important;
}

.shop-page {
  margin-top: 110px;
  .top-bar {
    padding: 10px 20px;
    background: #f8f8f8;
    border: 1px solid #ccc;
    box-shadow: 0 3px 4px #ccc;
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 10;
    width: 100vw;
    transition: all 0.5s 0.1s;
    &.topFixed {
      top: 0;
    }
    .img {
      width: 160px;
    }
    .search-box {
      .input {
        border: 1px solid #ccc;
        input {
          border: none;
          text-indent: 10px;
          width: 350px;
          padding-right: 10px;
        }
        .select-down {
          width: 100px;
          background: #eee;
          color: #ccc;
          line-height: 34px;
          height: 34px;
          padding: 0 5px;
          position: relative;
          user-select: none;
          cursor: pointer;
          & > span {
            position: absolute;
            left: 15px;
            top: 2px;
          }
          &.active {
            .sub-list {
              opacity: 1;
              height: 66px;
            }
          }
          .sub-list {
            position: absolute;
            left: 0;
            top: 45px;
            width: 100%;
            background: #fff;
            border-radius: 4px;
            opacity: 0;
            height: 0;
            transition: 0.2s;
            span {
              display: block;
              text-indent: 20px;
              color: map-get($colors, "gray-2");
              &:hover {
                background: #f5f7fa;
              }
            }
          }
          i {
            font-size: 12px;
            margin-left: 10px;
            color: #888;
            position: absolute;
            right: 10px;
            top: 0;
          }
        }
        .search-btn {
          background: map-get($colors, "primary");
          width: 35px;
          text-align: center;
          line-height: 34px;
          i {
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
    .hot-line {
      border-right: 1px solid #ccc;
      padding-right: 20px;
      width: 200px;
    }
  }
  .cars-wraper {
    .content {
      width: 1250px;
      margin: 0 auto;
      .cars-list {
        border-bottom: 1px solid map-get($colors, "gray");
        margin: 50px 0 0;
        .item {
          width: 32%;
          margin-bottom: 20px;
          .item-img {
            cursor: pointer;
            &:hover {
              box-shadow: 0 0 8px 2px #348cd6, 0 0 8px 2px #348cd6;
            }
          }
          .item-info {
            padding: 10px 5px 5px;
            .car-text {
              font-size: 18px;
              font-weight: 700;
            }
            .car-price {
              font-size: 20px;
              color: #286594;
              font-weight: 700;
              span {
                font-weight: normal;
                font-size: 12px;
              }
            }
            .text-tit {
              padding: 0 0 10px;
            }
            .car-actions {
              .car-buy {
                font-size: 12px;
                color: #fff;
                border: 20px;
                cursor: pointer;
                // background-color: #2584c8;
                background-image: linear-gradient(
                  rgba(37, 132, 200, 0.7) 0%,
                  #2584c8 50%,
                  rgba(37, 132, 200, 0.7) 100%
                );
                padding: 5px 20px;
                border-radius: 30px;
              }
            }
          }
        }
      }
      .hot-cars {
        .title {
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 2px;
          margin: 10px 0;
        }
        .pics {
          .pic-left {
            width: 536px;
            height: 420px;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            &:hover {
              .car-info {
                bottom: 0;
                transition: all 0.5s 0.4s;
              }
            }
            .car-info {
              width: 100%;
              background: rgba(0, 0, 0, 0.5);
              position: absolute;
              left: 0;
              bottom: -65px;
              color: #fff;
              padding: 10px 20px;
              .d-left {
                font-size: 17px;
                font-family: "microsoft yahei";
                span {
                  font-size: 14px;
                }
              }
              .d-right {
                font-size: 12px;
                color: map-get($colors, "gray");
              }
            }
          }
          .pic-right {
            width: 694px;
            .item {
              position: relative;
              overflow: hidden;
              margin-bottom: 20px;
              margin-right: 20px;
              cursor: pointer;
              &:hover {
                .car-info {
                  bottom: 0;
                  transition: all 0.5s 0.4s;
                }
              }
              &:nth-child(3) {
                margin-bottom: 0;
              }
              &:nth-child(4) {
                margin-bottom: 0;
              }
              .img {
                width: 326px;
              }
              .car-info {
                width: 100%;
                background: rgba(0, 0, 0, 0.5);
                position: absolute;
                left: 0;
                bottom: -52px;
                color: #fff;
                padding: 5px 10px;
                .d-left {
                  font-size: 16px;
                  font-family: "microsoft yahei";
                  span {
                    font-size: 14px;
                  }
                }
                .d-right {
                  font-size: 12px;
                  color: map-get($colors, "gray");
                }
              }
            }
          }
        }
      }
      .tips {
        padding: 20px 0;
        ul {
          li {
            width: 278px;
            img {
              max-width: 86px;
              max-height: 60px;
              margin-right: 20px;
            }
            p {
              &:nth-child(1) {
                font-weight: bold;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
    .bottom-banner {
      margin: 20px 0;
    }
  }
}
</style>