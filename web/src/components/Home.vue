<template>
  <div class="home">
    <Header></Header>
    <swiper class="my-swiper" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in bannerList" :key="item.id">
        <img :src="item.img_url" />
      </swiper-slide>
      <div class="swiper-pagination my-paginatino" slot="pagination"></div>
    </swiper>

    <div class="section">
      <div class="third-page">
        <div class="tit">
          <p class="text-center">市场活动</p>
          <span class="line"></span>
        </div>
        <div class="itemblock d-flex flex-wrap jc-between">
          <div class="items">
            <img class="w-100" src="../assets/images/g2.jpg" />
            <div class="itemMask text-white">
              <div class="item-tit">吉利博瑞，2成首付，5年0息</div>
              <div class="time">活动时间：12月1日- 12月31日</div>
              <div class="text">中国B级轿车新旗舰吉利博瑞，懂你所需，心有“0” 息，享2成首付、5年0息，或享至高15000元现金优惠，更有万元置换…</div>
              <div class="btn-primary">
                <router-link class="text-white" to="/">了解详情 &gt;</router-link>
              </div>
            </div>
          </div>
          <div class="items">
            <img class="w-100" src="../assets/images/g2.jpg" />
            <div class="itemMask text-white">
              <div class="item-tit">吉利博瑞，2成首付，5年0息</div>
              <div class="time">活动时间：12月1日- 12月31日</div>
              <div class="text">中国B级轿车新旗舰吉利博瑞，懂你所需，心有“0” 息，享2成首付、5年0息，或享至高15000元现金优惠，更有万元置换…</div>
              <div class="btn-primary">
                <router-link class="text-white" to="/">了解详情 &gt;</router-link>
              </div>
            </div>
          </div>
          <div class="items">
            <img class="w-100" src="../assets/images/g2.jpg" />
            <div class="itemMask text-white">
              <div class="item-tit">吉利博瑞，2成首付，5年0息</div>
              <div class="time">活动时间：12月1日- 12月31日</div>
              <div class="text">中国B级轿车新旗舰吉利博瑞，懂你所需，心有“0” 息，享2成首付、5年0息，或享至高15000元现金优惠，更有万元置换…</div>
              <div class="btn-primary">
                <router-link class="text-white" to="/">了解详情 &gt;</router-link>
              </div>
            </div>
          </div>
          <div class="items">
            <img class="w-100" src="../assets/images/g2.jpg" />
            <div class="itemMask text-white">
              <div class="item-tit">吉利博瑞，2成首付，5年0息</div>
              <div class="time">活动时间：12月1日- 12月31日</div>
              <div class="text">中国B级轿车新旗舰吉利博瑞，懂你所需，心有“0” 息，享2成首付、5年0息，或享至高15000元现金优惠，更有万元置换…</div>
              <div class="btn-primary">
                <router-link class="text-white" to="/">了解详情 &gt;</router-link>
              </div>
            </div>
          </div>
        </div>
        <router-link to="/" tag="div" class="btn-primary btn-more">+ 查看更多</router-link>
      </div>
    </div>

    <div class="section">
      <div class="section-wraper">
        <div class="second-page">
          <div class="tit">
            <p class="text-center">售后服务</p>
            <span class="line"></span>
          </div>
          <div class="shortcuts d-flex jc-around">
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/lsfc.png" />
              <span>服务活动</span>
            </router-link>
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/GAKT(1).png" />
              <span>关爱课堂</span>
            </router-link>
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/zlty.png" />
              <span>服务介绍</span>
            </router-link>
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/fwzcx.png" />
              <span>服务站查询</span>
            </router-link>
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/czjp.png" />
              <span>精品与零件</span>
            </router-link>
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/glink.png" />
              <span>G-link服务</span>
            </router-link>
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/cdfw.png" />
              <span>400-886-9888</span>
            </router-link>
            <router-link to="/" class="shortcuts-icon d-flex flex-column ai-center">
              <img src="../assets/images/gengduo.png" />
              <span>更多</span>
            </router-link>
          </div>
          <div class="news-blocks d-flex jc-between">
            <div class="news-block">
              <div class="news-img">
                <div class="img"></div>
              </div>
              <router-link to="/" class="arrow text-right" tag="div">
                <i class="iconfont icon-arrow-right"></i>
              </router-link>
              <div class="news-content">
                <router-link class="news-tit" tag="div" to="/">进入吉行天下</router-link>
                <p>在这里,您能够获得吉利车主的专享权益,与其他的车主交流互动并结识新朋友...</p>
              </div>
            </div>
            <div class="news-block">
              <div class="news-img">
                <div class="img"></div>
              </div>
              <router-link to="/" class="arrow text-right" tag="div">
                <i class="iconfont icon-arrow-right"></i>
              </router-link>
              <div class="news-content">
                <router-link class="news-tit" tag="div" to="/">加入我们</router-link>
                <div class="join-us d-flex jc-start">
                  <router-link class="join-shortcut" to="/" tag="div">
                    <img src="../assets/images/rlzy.png" />
                    <span>人力资源</span>
                  </router-link>
                  <div class="join-shortcut">
                    <img src="../assets/images/zsjm.png" alt />
                    <ul class="links">
                      <li>
                        <router-link to="/">吉利汽车招商加盟</router-link>
                      </li>
                      <li>
                        <router-link to="/">几何汽车招商加盟</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="news-block">
              <div class="news-img">
                <div class="img"></div>
              </div>
              <router-link to="/" class="arrow text-right" tag="div">
                <i class="iconfont icon-arrow-right"></i>
              </router-link>
              <div class="news-content">
                <router-link class="news-tit" tag="div" to="/">进入吉行天下</router-link>
                <router-link tag="p" class="links" to="/">
                  <em>·</em>吉利集团电子采购平台
                </router-link>
                <router-link tag="p" class="links" to="/">
                  <em>·</em>吉利汽车技术信息发布系统
                </router-link>
              </div>
            </div>
          </div>
          <router-link to="/" tag="div" class="btn-primary btn-more">+ 查看更多</router-link>
        </div>
      </div>
    </div>

    <div class="tool-box" :class="{open:isOpen}">
      <ul class="btns">
        <li class="item" @click="isOpen = !isOpen">
          <i class="iconfont icon-ios-shijian"></i>
          <span>预约</span>
        </li>
        <li class="item">
          <i class="iconfont icon-card"></i>
          <span>商城</span>
        </li>
        <li class="back" @click="isOpen = !isOpen" v-show="isOpen">
          <i class="iconfont icon-arrow-right"></i>
        </li>
      </ul>
    </div>
    <Predict :open="isOpen" @closed="closed"></Predict>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Head";
import Footer from "./Footer";
import Predict from "./Predict";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Predict
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        speed: 1000,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      isOpen: false,
      bannerList: []
    };
  },
  methods: {
    async fetchBanner() {
      let { data } = await this.$http.get("/banner");
      this.bannerList = data;
    },
    closed(){
      this.isOpen = !this.isOpen;
    }
  },
  created() {
    this.fetchBanner();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/varibles.scss";
.home {
  margin-top: 50px;
  .tool-box {
    position: fixed;
    z-index: 15;
    right: 15px;
    top: 35%;
    transition: all .3s;
    &.open {
      right: 46%;
      li {
        background: rgba(61, 97, 119, 0.4);
      }
    }
    .btns {
      li {
        background: rgba(0, 0 ,0 , 0.4);
        color: #fff;
        border-radius: 4px;
        width: 48px;
        height: 48px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .item {
        padding-top: 5px;
        text-align: center;
        span {
          display: block;
          margin-top: 3px;
        }
      }
      .back {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 25px;
        }
      }
    }
  }
  .my-swiper {
    img {
      height: calc(100vh - 50px);
      width: 100%;
      // width: 100%;
    }
    .my-paginatino {
      .swiper-pagination-bullet {
        opacity: 1;
        width: 10px;
        height: 10px;
        border: 1px solid #fff;
        background: transparent;
        cursor: pointer;
        &.swiper-pagination-bullet-active {
          background: #fff;
        }
      }
    }
  }
  .section {
    .tit {
      font-size: 16px;
      font-weight: bold;
      padding: 24px 0;
      line-height: 2em;
      .line {
        display: block;
        margin: 5px auto 0;
        width: 24px;
        height: 2px;
        background: map-get($colors, "primary");
      }
    }
    .btn-more {
      margin: 24px auto 48px;
    }
    .third-page {
      .itemblock {
        padding: 0 8px;
        font-size: 0;
        .items {
          position: relative;
          width: 49.7%;
          margin-bottom: 8px;
          font-size: 14px;
          overflow: hidden;
          &:hover {
            img {
              animation-name: zoom; /*调用zoom动画*/
              animation-duration: 2.5s; /*move动画从0%到100%的用时，单位为s*/
              animation-timing-function: ease; /*表示动画播放方式 ease（速度由快到慢）linear（恒定速度）ease-in(加速变化*/
            }
            .itemMask {
              display: block;
            }
          }
          .itemMask {
            transition: all 0.5s;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            padding: 0 40px;
            display: none;
            .item-tit {
              font-size: 22px;
              font-weight: bold;
              margin-top: 20%;
            }
            .time {
              font-size: 16px;
            }
            .text {
              margin-top: 20px;
            }
          }
        }
      }
    }
    .section-wraper {
      width: 1186px;
      margin: 0 auto;
      .second-page {
        .shortcuts {
          margin-bottom: 36px;
          .shortcuts-icon {
            width: 150px;
            img {
              width: 48px;
              height: 48px;
            }
            span {
              font-size: 12px;
              margin-top: 12px;
            }
          }
        }
        .news-blocks {
          .news-block {
            width: 380px;
            box-shadow: 2px 2px 2px #ccc, -2px -2px 2px #ccc;
            &:nth-child(2) {
              .news-img {
                .img {
                  background-image: url("../assets/images/jrw-pc.png");
                }
              }
            }
            &:nth-child(3) {
              .news-img {
                .img {
                  background-image: url("../assets/images/xxgk-pc.png");
                }
              }
            }
            .news-img {
              overflow: hidden;
              &:hover {
                .img {
                  transform: scale(1.2);
                }
              }
              .img {
                transform: scale(1);
                transition: 1s ease;
                height: 150px;
                background-image: url("../assets/images/cysq-pc.png");
                background-position: 0 center;
                background-size: 100%;
              }
            }
            .arrow {
              padding-right: 12px;
              color: #44a7dd;
              i {
                font-size: 18px;
                cursor: pointer;
              }
            }
            .news-content {
              margin-top: -10px;
              padding: 0 12px 24px;
              .news-tit {
                cursor: pointer;
                font-size: 13px;
                font-weight: bold;
                line-height: 3em;
              }
              p {
                font-size: 12px;
                line-height: 14px;
                cursor: pointer;
                em {
                  font-size: 22px;
                  vertical-align: middle;
                }
              }
              .join-us {
                font-size: 12px;
                .join-shortcut {
                  &:nth-child(1) {
                    margin-right: 100px;
                    position: relative;
                    &:after {
                      position: absolute;
                      left: 160px;
                      content: "";
                      height: 31px;
                      width: 1px;
                      background: map-get($colors, "gray");
                    }
                  }

                  img {
                    width: 36px;
                    display: inline-block;
                    vertical-align: middle;
                  }
                  span {
                    vertical-align: middle;
                    width: 24px;
                    margin-left: 10px;
                    display: inline-block;
                  }
                  .links {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 10px;
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
