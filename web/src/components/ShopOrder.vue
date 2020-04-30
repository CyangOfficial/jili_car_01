<template>
  <div class="shopOrder-page">
    <Header></Header>
    <div class="top-car d-flex">
      <div class="car-left">
        <div
          v-if="model.baseInfo.length>0"
          class="car-title text-center"
        >{{model.baseInfo[0].car_name}}</div>
        <div v-if="model.colorList.length>0" class="car-img">
          <img class="w-100" :src="model.colorList[nowColor].img_url || ''" />
        </div>
      </div>
      <div class="car-right">
        <div class="carChoseItem">
          <ul>
            <li @click="choseItem = 0" :class="{active: choseItem === 0}">
              <img src="../assets/images/cl1.png" class="blue" />
              <img src="../assets/images/cl1-white.png" class="white" />
            </li>
            <li @click="changeModel(1)" :class="{active: choseItem === 1}">
              <img src="../assets/images/cl2.png" class="blue" />
              <img src="../assets/images/cl2-white.png" class="white" />
            </li>
            <li @click="choseItem = 2" :class="{active: choseItem === 2}">
              <img src="../assets/images/cl3.png" class="blue" />
              <img src="../assets/images/cl3-white.png" class="white" />
            </li>
            <li @click="choseItem = 3" :class="{active: choseItem === 3}">
              <img src="../assets/images/cl4.png" class="blue" />
              <img src="../assets/images/cl4-white.png" class="white" />
            </li>
            <li @click="favories = !favories" class="favories" :class="{active: favories}">
              <img src="../assets/images/cl5.png" class="blue" />
              <img src="../assets/images/cl5-red.png" class="white" />
            </li>
          </ul>
        </div>
        <div v-show="choseItem === 0" class="color-block d-flex">
          <div class="car-choose">
            <div class="colors">
              <div class="tit">选择颜色</div>
              <GeminiScrollbar class="my-scroll-bar">
                <ul v-if="model.colorList.length>0" class="colorChoose">
                  <li
                    @click="choseColor(i,item.id)"
                    v-for="(item,i) in model.colorList"
                    :key="item.id"
                  >
                    <div :class="{active: nowColor == i}" class="img-box">
                      <img :src="item.sm_url" />
                      <img src="../assets/images/chooseBlock.png" />
                    </div>
                    <p class="text-center">{{item.color_name}}</p>
                  </li>
                </ul>
              </GeminiScrollbar>
            </div>
          </div>
          <div class="car-pl flex-1">
            <div class="tit text-center">请选择排量</div>
            <GeminiScrollbar class="volume-scroll-bar">
              <ul v-if="model.volumeList.length>0">
                <li
                  @click="choseVol(i,item.id)"
                  :class="{active: nowVol == i}"
                  v-for="(item,i) in model.volumeList"
                  :key="item.id"
                >{{item.name}}</li>
              </ul>
            </GeminiScrollbar>
          </div>
        </div>
        <div class="model-block" v-show="choseItem === 1">
          <p>请选择型号</p>
          <ul v-if="model.modelList.length>0">
            <li
              :class="{active: nowModel===i}"
              @click="choseModel(i,item.id)"
              v-for="(item,i) in model.modelList"
              :key="item.id"
            >{{item.model_name}}</li>
          </ul>
        </div>
        <div class="trim-block" v-show="choseItem === 2">
          <p>请选择内饰</p>
          <div v-if="model.inner.length>0" class="choose-color d-flex jc-center">
            <div
              @click="choseInner(i)"
              :class="{active: nowInner === i}"
              class="d-flex"
              v-for="(item,i) in model.inner"
              :key="item.id"
            >
              <p>
                <img class="choose" :src="item.sm_url" />
                <img class="bg" src="../assets/images/chooseBlock.png" />
              </p>
              <p>{{item.col_name}}</p>
            </div>
          </div>
          <div v-if="model.inner.length>0" class="trim-pic">
            <div class="img">
              <img :src="model.inner[nowInner].img_url || ''" />
            </div>
            <div class="text">
              <p>{{model.inner[nowInner].title}}</p>
              <p>{{model.inner[nowInner].desc}}</p>
            </div>
          </div>
        </div>
        <div class="bottom-block">
          <div class="car-info d-flex jc-center">
            <div class="color">
              <span>颜色：</span>
              <img
                class="w-100"
                v-if="model.colorList.length>0"
                :src="model.colorList[nowColor].sm_url"
              />
            </div>
            <div>
              <span>排量：</span>
              <span v-if="model.volumeList.length>0">{{model.volumeList[nowVol].name}}</span>
            </div>
            <div>
              <span>型号：</span>
              <span v-if="model.modelList.length>0">{{model.modelList[nowModel].model_name}}</span>
            </div>
            <div>
              <span>内饰</span>
              <span v-if="model.inner.length>0">{{model.inner[nowInner].title}}</span>
            </div>
          </div>
          <div v-if="model.baseInfo.length>0" class="value-block d-flex jc-between ai-center">
            <div class="value-left">
              <span>
                销量 :
                <strong>{{model.baseInfo[0].sale}}</strong>
              </span>
              <span>
                库存:
                <strong>{{model.baseInfo[0].stock}}</strong>
              </span>
            </div>
            <div class="value-right">
              <span>
                指导价:
                <em>{{model.baseInfo[0].offical_price | currency}}</em>
              </span>
            </div>
          </div>
          <div class="value-block2 d-flex">
            <div class="flex-1">
              <p>实际预付订金</p>
              <p>￥9.9</p>
            </div>
            <div class="flex-1 next-btn">
              <span>定制下一项</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-img">
      <img src="../assets/images/c916a9f8-bda0-410b-8508-b2b63fcc544d.jpg" />
      <img src="../assets/images/63580e86-3736-4117-a302-b50e0532316c.jpg" />
      <img src="../assets/images/5e89b198-f4cc-446d-82ed-47fde4a6cfc7.jpg" />
      <img src="../assets/images/6b7842f1-8009-4a25-89a7-99e128185f30.jpg" />
      <img src="../assets/images/7faa7d6f-6917-4793-9931-8ce174149cf3.jpg" />
      <img src="../assets/images/7e505001-3334-4048-8d2e-15104646734b.jpg" />
      <img src="../assets/images/5f084baf-cc34-4a5b-8182-fc9badee5701.jpg" />
      <img src="../assets/images/34987920-80a8-4102-aad0-b8375d2a632c.jpg" />
      <img src="../assets/images/ff162eeb-a276-4d04-bacd-88212dd4b877.jpg" />
    </div>
    <div class="order-nav">
      <img src="../assets/images/run.png" />
      <div class="nav-text">
        <ul>
          <li @click="navLink(0)" :class="{active: nav === 0}">
            <img src="../assets/images/lun.png" />
            <span>定制车型</span>
          </li>
          <li @click="navLink(1)" :class="{active: nav === 1}">
            <img src="../assets/images/lun.png" />
            <span>车型亮点</span>
          </li>
          <li @click="navLink(2)" :class="{active: nav === 2}">
            <img src="../assets/images/lun.png" />
            <span>产品配置</span>
          </li>
          <li @click="predict" :class="{active: nav === 3}">
            <img src="../assets/images/lun.png" />
            <span>预约试驾</span>
          </li>
        </ul>
      </div>
    </div>
    <Predict :open="isOpen" @closed="closed"></Predict>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Head";
import Predict from "./Predict";
export default {
  components: {
    Header,
    Footer,
    Predict
  },
  data() {
    return {
      colors: [],
      choseItem: 0,
      nowModel: 0, //型号
      favories: false,
      nav: 0,
      navScroll: [0, 623, 16708],
      sctollTop: 0,
      carId: -1, //汽车ID
      model: {
        colorList: [],
        volumeList: [],
        modelList: [],
        baseInfo: [],
        inner: []
      }, //数据列表
      nowColor: 0, //当前选择车的颜色下标
      nowVol: 0, //当前选择的排量下标
      nowInner: 0, //当前选择的内饰下标
      volId: -1, //当前选择的排量ID
      prevVolId: -1, //判断当前点击ID和上次的ID
      modelId: -1, //当前选择的型号ID
      colorId: -1,
      isOpen: false
    };
  },
  methods: {
    navLink(n) {
      //左侧的公路导航
      this.nav = n;
      document.documentElement.scrollTop = this.navScroll[n];
    },
    predict() {
      this.isOpen = true;
      this.nav = 3;
    },
    closed() {
      this.isOpen = false;
    },
    async fetchCarInfo() {
      //获取车辆的基本信息
      this.carId = this.$route.params.id;
      let { data } = await this.$http.get(`/order/?id=${this.carId}`);
      if (data === "") return; //如果没有找到车辆则返回一个空
      console.log(data);
      this.model = Object.assign({}, this.model, data);
      if (data.volumeList.length > 0) {
        this.volId = data.volumeList[0].id;
        this.fetchModel(); //获取型号
      }
      if (data.colorList.length > 0) {
        this.colorId = data.colorList[0].id; //获取汽车颜色ID
      }
      console.log(this.model);
    },
    async fetchModel() {
      //获取汽车型号数据
      //isVolId:判断当前点击ID和上次的ID,防止重复发送请求
      if (this.prevVolId !== this.volId || this.prevVolId === -1) {
        let { data } = await this.$http.get(`/model/?id=${this.volId}`);
        if (data.length !== 0) {
          this.model = Object.assign({}, this.model, { modelList: data });
          this.prevVolId = this.volId;
          this.modelId = data[0].id; //型号ID赋值
        }
        // console.log(this.model);
      }
    },
    async fetchPrice() {
      //获取汽车价格
      let { data } = await this.$http.get(
        `/price/?carId=${this.carId}&volId=${this.volId}&modelId=${this.modelId}`
      );
      this.model = Object.assign({}, this.model, { price: data });
    },
    async fetchStock() {
      //获取库存
      let { data } = await this.$http.get(
        `/stock/?carId=${this.carId}&volId=${this.volId}&modelId=${this.modelId}&colorId=${this.colorId}`
      );
      this.model = Object.assign({}, this.model, data[0]);
    },
    changeModel(n) {
      //切换到汽车型号选项卡
      this.choseItem = n;
    },
    choseColor(n, id) {
      //选择颜色
      this.nowColor = n;
      this.colorId = id;
      this.fetchStock(); //切换颜色获取库存
      // console.log(this.model.colorList[this.nowColor].color_name);
    },
    choseVol(n, id) {
      //选择排量
      this.nowVol = n;
      this.volId = id;
      this.nowModel = 0; //选择的型号下标为0
      this.fetchModel(); //切换排量获取汽车型号
    },
    choseModel(n, id) {
      //选择型号
      this.nowModel = n;
      this.modelId = id; //型号ID赋值
      this.fetchStock(); //切换型号获取库存
      this.fetchPrice(); //获取价格
    },
    choseInner(n) {
      //选择内饰
      this.nowInner = n;
    }
  },
  created() {
    this.fetchCarInfo(); //初始化汽车信息列表
    window.addEventListener("scroll", () => {
      this.sctollTop = document.documentElement.scrollTop;
      if (this.sctollTop < 365) {
        this.nav = 0;
      } else if (this.sctollTop < 16340) {
        this.nav = 1;
      } else {
        this.nav = 2;
      }
    });
  },
  watch: {
    $route() {
      this.carId = this.$route.params.id;
      this.fetchCarInfo();
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_varibles.scss";
.shopOrder-page {
  margin-top: 50px;
  .top-car {
    height: calc(100vh - 50px);
    .car-left {
      width: 67%;
      background: #e4e5e5;
      .car-title {
        font-size: 28px;
        font-weight: bold;
        margin-top: 20px;
      }
      .car-img {
        width: 75%;
        margin: 0 0 0 150px;
      }
    }
    .car-right {
      width: 33%;
      position: relative;
      .carChoseItem {
        position: absolute;
        left: -50px;
        top: 10px;
        ul {
          li {
            width: 45px;
            background: #fff;
            border-radius: 4px;
            text-align: center;
            padding: 6px 0;
            margin-bottom: 10px;
            cursor: pointer;
            &.active {
              background: #5585b6;
              img {
                &.blue {
                  display: none;
                }
                &.white {
                  display: inline-block;
                }
              }
            }
            &.favories {
              background: #fff;
            }
            img {
              &.white {
                display: none;
              }
            }
          }
        }
      }
      .color-block {
        .car-choose {
          border-right: 1px solid #ccc;
          width: 17%;
          .colors {
            .tit {
              width: 30px;
              font-size: 12px;
              font-weight: 600;
              margin: 0 auto 20px;
            }
            .my-scroll-bar {
              height: 418px;
              .colorChoose {
                li {
                  cursor: pointer;
                  margin-bottom: 2px;
                  .img-box {
                    margin: 0 auto;
                    width: 40px;
                    height: 40px;
                    position: relative;
                    &:hover {
                      img {
                        &:nth-child(2) {
                          display: block;
                        }
                      }
                    }
                    &.active {
                      img {
                        &:nth-child(2) {
                          display: block;
                        }
                      }
                    }
                    img {
                      position: absolute;
                      width: 100%;
                      left: 0;
                      top: 0;
                      &:nth-child(2) {
                        display: none;
                      }
                    }
                  }
                  p {
                    color: #3f3f3f;
                    font-size: 13px;
                    line-height: 28px;
                  }
                }
              }
            }
          }
        }
        .car-pl {
          padding: 0 20px;
          overflow: hidden;
          .volume-scroll-bar {
            height: 410px;
            .thumb {
              display: none;
            }
            ul {
              li {
                border-radius: 3px;
                line-height: 95px;
                height: 95px;
                background: #efefef;
                margin-bottom: 10px;
                text-align: center;
                font-weight: bold;
                cursor: pointer;
                &:hover {
                  background: #ddd;
                }
                &.active {
                  background: #5585b6;
                  color: #fff;
                }
              }
            }
          }
          .tit {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 20px;
          }
        }
      }
      .model-block {
        padding: 0 50px;
        p {
          font-size: 17px;
          font-weight: bold;
          text-align: center;
          margin: 10px 0;
        }
        ul {
          li {
            line-height: 33px;
            background: #efefef;
            border-radius: 2px;
            margin-bottom: 8px;
            text-align: center;
            cursor: pointer;
            &:hover {
              background: #ddd;
            }
            &.active {
              background: #457ab0;
              color: #fff;
            }
          }
        }
      }
      .trim-block {
        padding: 0 10px;
        & > p {
          font-size: 17px;
          font-weight: bold;
          text-align: center;
          margin: 10px 0;
        }
        .choose-color {
          & > div {
            position: relative;
            margin: 10px 20px;
            cursor: pointer;
            &.active {
              img {
                &:nth-child(2) {
                  display: block;
                }
              }
            }
            p {
              width: 31px;
              height: 31px;
              line-height: 31px;
              text-align: center;
              &:nth-child(2) {
                width: auto;
                padding-left: 5px;
                font-size: 10px;
              }
              img {
                width: 31px;
                position: absolute;
                left: 0;
                top: 0;
                &:nth-child(2) {
                  display: none;
                }
              }
            }
          }
        }
        .trim-pic {
          position: relative;
          .img {
            img {
              width: 100%;
            }
          }
          .text {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.5);
            p {
              font-size: 10px;
              color: #fff;
              &:nth-child(1) {
                font-weight: bold;
                line-height: 22px;
              }
            }
          }
        }
      }
      .bottom-block {
        box-shadow: 0 -4px 10px 5px rgba(239, 239, 239, 0.8);
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        background: #fff;
        width: 100%;
        .car-info {
          padding: 8px 0;
          border-bottom: 1px solid #ccc;
          font-size: 12px;
          & > div {
            margin-right: 10px;
          }
          .color {
            span {
              vertical-align: middle;
            }
            img {
              width: 12px;
            }
          }
        }
        .value-block {
          padding: 5px 10px 5px 20px;
          .value-left {
            span {
              strong {
                font-style: italic;
                font-size: 16px;
              }
            }
          }
          .value-right {
            span {
              em {
                margin-left: 10px;
                color: #4069a5;
                font-size: 22px;
                font-weight: bold;
                font-style: normal;
                vertical-align: middle;
              }
            }
          }
        }
        .value-block2 {
          color: #fff;
          div {
            background: #457ab0;
            line-height: 32px;
            p {
              text-indent: 20px;
              &:nth-child(2) {
                font-size: 18px;
                font-weight: bold;
              }
            }
            &.next-btn {
              text-align: center;
              background: #135086;
              span {
                display: block;
                margin-top: 18px;
              }
            }
          }
        }
      }
    }
  }
  .bottom-img {
    width: 70%;
    margin: 20px auto;
    img {
      width: 100%;
    }
  }
  .order-nav {
    position: fixed;
    left: 20px;
    top: 100px;
    .nav-text {
      position: absolute;
      left: 0;
      top: 0;
      ul {
        padding: 60px 0 0;
        width: 200px;
        li {
          margin-bottom: 30px;
          cursor: pointer;
          &.active {
            img {
              opacity: 1;
            }
          }
          img {
            width: 32px;
            opacity: 0;
          }
          span {
            color: map-get($colors, "gray-2");
            padding-left: 15px;
          }
          &:nth-child(1) {
            padding-left: 60px;
          }
          &:nth-child(2) {
            padding-left: 40px;
          }
          &:nth-child(3) {
            padding-left: 10px;
          }
          &:nth-child(4) {
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>