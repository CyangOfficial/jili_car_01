<template>
  <div class="club-page">
    <Header></Header>
    <div class="content">
      <div class="club-nav d-flex jc-between">
        <div class="nav-item">
          <router-link tag="div" to="/club">
            <span>首页</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/club">
            <span>圈子</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/club">
            <span>活动</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/club">
            <span>友聚惠</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/club">
            <span>吉行驿站</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/club">
            <span>吉币商城</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Head";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "../assets/scss/varibles.scss";
.club-page {
  margin-top: 50px;
  background: map-get($colors, "gray-3");
  .content {
    width: 100%;
    padding: 0 10%;
    .club-nav {
      padding: 40px 0;
      .nav-item {
        width: 13.5%;
        height: 74px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        background: url("../assets/images/下载.png") no-repeat;
        border-radius: 10px;
        background-size: cover;
        position: relative;
        cursor: pointer;
        &:nth-child(2) {
          background: url("../assets/images/下载.jpg") no-repeat;
        }
        &:nth-child(3) {
          background: url("../assets/images/pic-3.jpg") no-repeat;
        }
        &:nth-child(4) {
          background: url("../assets/images/pic-4.jpg") no-repeat;
        }
        &:nth-child(5) {
          background: url("../assets/images/下载.jpg") no-repeat;
        }
        &:nth-child(6) {
          background: url("../assets/images/下载.jpg") no-repeat;
        }
        span {
          position: absolute;
          text-align: center;
          line-height: 74px;
          left: 0;
          right: 0;
          z-index: 1;
        }
        &:hover {
          &:after {
            display: block;
          }
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgba(47, 103, 157, 0.78);
          border-radius: 10px;
          display: none;
        }
      }
    }
  }
}
</style>