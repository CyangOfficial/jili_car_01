<template>
  <div class="person-container">
    <Header></Header>
    <div class="personal-center">
      <div class="personal-center-left">
        <div class="personal-head">
          <div class="top">
            <div class="img">
              <img v-if="avatarSrc" :src="'http://localhost:3000/'+avatarSrc" />
              <div class="leval-block">G1</div>
            </div>
            <div class="name">{{username}}</div>
            <div class="medal-content">勋章中心</div>
          </div>
          <div class="focus_fans">
            <div class="left">
              <p class="num">0</p>
              <p class="text">关注</p>
            </div>
            <div class="line"></div>
            <div class="right">
              <p class="num">0</p>
              <p class="text">粉丝</p>
            </div>
          </div>
        </div>
        <div class="left-block personal-jibi">
          <div class="head">吉币</div>
          <div class="block-content jibi-content">
            <div class="money">
              <img
                data-v-36e2f6a1
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADhklEQVRYhb2XTWgcZRzGf+/Mu7Pd3TRJY62xX1ITTI0lloCktEWUUMhmvEjw0BY8WcFjTwoOWHBB7cWeFK8tQZAcu51e+kEP8WQJq9DYbBRbQg1paRryubsz42FmtpvJ7OZt3PaB9zDzPrzP8/7fr/9feJ5HPWRz+drPFsAE3gcOAweAtqDvCfA3MAHcAPLAom2ZdccOIRQMdAOfAyeBzKYj+lgCfga+sy2zuCUD2Vx+G3AOOAsYisJRlIALwFe2Za4qG8jm8l3AGH6om4EJ4KO4aGwwkM3l+4ErwCtNEg8xCwzblnm7roFsLt8NjAMvN1k8xBxwtDYSVQPZXD4F/Aq8/ZzEQxSAI7ZlrgBoNR3nXoA4QF+gBQQRCDbdHSARZXe2pxns28OhfR1sTxkIAQ1O7jrougDgs59uRbvKQK9tmUUZ/PgiTnxHS5IPBw7w3lu7aU1v9STGIhFofiKGvr68HXhAzCXz5Ug/R3o6kZr4X2qRGzXEEvCqBIbjxAGOHexEiKfi9x4ucvuvOTwPdAVTmhBo9XkZYFgCg/UYteIA43/+y6Wbd2l0fUexCXNQ4u9KJVQcFzcQb0sb/uwaKQjfweOltXqMPgl0qRrQNf/Uvrl3B5+e6CVl6A1PhK4LBIIzP96sR+mSQKuqgRDtaYOe3W0blmgLaJWbczZiuVRhbmGVlCGf7gcBrguG1EglJarWJLAA7FQhh2KTM/Pkxn4joWvVLeB5HmXHpe+1lzj97htkkkpzW5DAtKoBx/Xl1soOUw+exHJShqRUcVQNTEv8x2FAhX1wTztHezpxXA+prw+y50Gp4tC7r4NtCV1lOICCBK4BZ+J67z1cZP/Olur3O927OLS/A9cjdo09QGqCpLqBaxp+8rEU1/vD1T/4/Z9H1dCDH+JMUpKOaZmkfBbxZeCKPnV9tDR6a+p1oD/KmJ1f4f6jRYyEjiF1HM9jreyyUq6wWnY2bY7rUa64/DI+HWfgom2ZY+FO+Qb4mJgXcXJmnsmZCdVZqaIMfAtBQmJb5jTwfbNVGuBCmJZFM6LCCxAvUJMRVQ0EOdoIfuL4vDAHjNiWubzBQGCiCAzhp9DNxiwwFK0NtCgryNuP09zlKADHozVBrIHARBH/djyPX15tFaVgjIF6NeKzFKengLSi8AowCpy3LXOqEVHlxSjiX9VngQ9YX563B5x51pfnl1Esz/8DUr9EPSWG8JkAAAAASUVORK5CYII="
                alt
              />
              <span class="num">10</span>
            </div>
            <div class="sub-tit">查看更多</div>
          </div>
        </div>
        <div class="left-block">
          <div class="head">签到</div>
          <div class="block-content sign-in">
            <button>签到</button>
            <div class="text">
              连接签到
              <span>1</span>天
            </div>
            <div class="sub-tit">查看签到记录</div>
          </div>
        </div>
        <div class="left-block">
          <div class="head task">任务中心</div>
          <div class="block-content task-center">
            <ul class="tasks">
              <li>
                <span>新手任务</span>
                <button>领取任务</button>
              </li>
              <li>
                <span>每日任务</span>
                <button>领取任务</button>
              </li>
              <li>
                <span>成长任务</span>
                <button>领取任务</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="personal-center-right">
        <div class="personal-profile">
          <div class="tabs-headr">
            <div class="nav-list">
              <div class="line" :style="{transform: `translate(${moveX}px)`}"></div>
              <ul class="list">
                <li
                  @click="changeNav(index)"
                  :class="{current: navActive===index}"
                  v-for="(item,index) in navList"
                  :key="index"
                >{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="tabs-content">
            <div v-show="navActive === 0" class="tab-pane tab-pane-1">
              <BasicInfo @avatar="avatarFn"></BasicInfo>
            </div>
            <div v-show="navActive === 1" class="tab-pane">
              <ChangePassword @getid="getId" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Head";
import Footer from "./Footer";
import BasicInfo from "./BasicInfo"; //基本信息组件
import ChangePassword from "./ChangePassword"; //基本信息组件
export default {
  components: {
    Header,
    Footer,
    BasicInfo,
    ChangePassword
  },
  data() {
    return {
      navList: ["基本信息", "修改密码", "收货地址", "车主认证", "绑定设置"],
      navActive: 0,
      moveX: 0,
      avatarSrc: '',
      username: '',
      id: 0
    };
  },
  methods: {
    changeNav(i) {
      this.navActive = i;
      this.moveX = i * 107;
    },
    avatarFn(basic){
      this.avatarSrc = basic.avatar;
      this.username = basic.username;
    },
    getId(id){
      this.id = id;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_varibles.scss";
.person-container {
  background-color: #f3f3f3;
  padding-top: 50px;
  .personal-center {
    width: 1280px;
    margin: 0 auto;
    padding: 30px 0 50px 0;
    display: flex;
    justify-content: space-between;
    .personal-center-left {
      width: 250px;
      margin-right: 30px;
      .personal-head {
        background: linear-gradient(to bottom, #3187c8, #59a5d5);
        border-radius: 15px;
        padding-bottom: 40px;
        .top {
          padding: 30px 0 0 0;
          .img {
            width: 120px;
            height: 120px;
            border-radius: 60px;
            border: 5px solid #a0bcd2;
            background: #a0bcd2;
            cursor: pointer;
            position: relative;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
              border-radius: 60px;
            }
            .leval-block {
              width: 60px;
              line-height: 22px;
              position: absolute;
              bottom: -10px;
              left: 30px;
              border-radius: 14px;
              background: linear-gradient(-25deg, #09a5ff, #1cdef5);
              z-index: 5;
              color: #fff;
              text-align: center;
            }
          }
          .name {
            margin: 10px 0 12px 0;
            font-size: 1.25vw;
            color: #fff;
            text-align: center;
          }
          .medal-content {
            width: 105px;
            text-align: center;
            color: #fff;
            margin: 0 auto;
            line-height: 26px;
            border: 1px solid #fff;
            border-radius: 15px;
            font-size: 0.72916667vw;
          }
        }
        .focus_fans {
          display: flex;
          color: #fff;
          text-align: center;
          margin-top: 30px;
          .left {
            flex: 1;
          }
          .right {
            flex: 1;
          }
          .num {
            font-size: 26px;
            margin-bottom: 15px;
          }
          .line {
            width: 1px;
            background-color: #6cacd7;
            height: 48px;
            position: relative;
            top: 15px;
          }
        }
      }
      .left-block {
        margin-top: 22px;
        border-radius: 15px;
        .head {
          color: #fff;
          border-radius: 15px 15px 0 0;
          font-size: 18px;
          text-indent: 30px;
          line-height: 50px;
          background: #3086c8;
          &.task {
            background: #7ab5e1;
          }
        }
        .block-content {
          background: #e9eef4;
          text-align: center;
          border-radius: 0 0 15px 15px;
          .sub-tit {
            color: #a2a4a6;
            font-size: 12px;
            text-decoration: underline;
            margin-top: 20px;
          }
          &.jibi-content {
            padding: 35px 0 20px;
            .money {
              width: 193px;
              margin: 0 auto;
              border-bottom: 1px solid #c9ccd1;
              padding-bottom: 35px;
              .num {
                font-size: 24px;
                vertical-align: middle;
                margin-left: 10px;
              }
            }
          }
          &.sign-in {
            padding: 30px 0 20px;
            button {
              border: none;
              width: 115px;
              line-height: 35px;
              background: #66b2fd;
              color: #fff;
              border-radius: 10px;
              font-weight: bold;
            }
            .text {
              font-size: 18px;
              color: #a2a4a6;
              line-height: 50px;
              margin: 10px 0 10px;
              font-weight: 100;
              span {
                font-size: 32px;
                color: #3086c8;
              }
            }
          }
          &.task-center {
            padding: 40px 0 20px;
            .tasks {
              padding: 0 20px;
              li {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                span {
                  color: #4c4c4c;
                  font-size: 14px;
                }
                button {
                  line-height: 33px;
                  border-radius: 17px;
                  padding: 0 15px;
                  background: #409eff;
                  border: none;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .personal-center-right {
      flex: 1;
      .personal-profile {
        .tabs-headr {
          background: #5b8cb3;
          height: 60px;
          border-radius: 15px 15px 0 0;
          padding: 10px 50px 0;
          position: relative;
          .nav-list {
            .line {
              width: 72px;
              height: 3px;
              background: #fff;
              position: absolute;
              bottom: 0;
              box-shadow: 0 1px 5px #5b8cb3;
              transition: all 0.3s ease-in-out;
            }
            .list {
              display: flex;
              color: #fff;
              li {
                font-size: 18px;
                line-height: 50px;
                margin-right: 35px;
                cursor: pointer;
                &.current {
                  font-weight: bold;
                }
              }
            }
          }
        }
        .tabs-content {
          .tab-pane {
            padding: 35px 50px;
            border: 1px solid #dcdcdc;
            border-radius: 0 0 15px 15px;
          }
        }
      }
    }
  }
}
</style>