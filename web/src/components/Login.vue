<template>
  <div class="login-page">
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
      <div class="box d-flex flex-column ai-center">
        <div class="head-text">
          <span :class="{active: active === 1}" @click="active = 1">注册</span>
          <span class="line"></span>
          <span :class="{active: active === 0}" @click="active = 0">登录</span>
        </div>
        <div v-show="active === 0" class="login">
          <div class="el-input">
            <input v-model="loginInfo.username" type="text" placeholder="请输入账号" />
          </div>
          <div class="el-input">
            <input v-model="loginInfo.password" type="password" placeholder="请输入密码" />
          </div>
          <div class="btn">
            <button @click="login">登录</button>
          </div>
        </div>
        <div v-show="active === 1" class="register">
          <div class="el-input">
            <input v-model="regInfo.username" type="text" placeholder="请输入账号" />
          </div>
          <div class="el-input">
            <input v-model="regInfo.password" type="password" placeholder="请输入密码" />
          </div>
          <div class="el-input">
            <input v-model="regInfo.repassword" type="password" placeholder="请再次输入密码" />
          </div>
          <div class="btn">
            <button @click="register">注册</button>
          </div>
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
  props: {
    setpId: { required: true }
  },
  components: {
    Header,
    Footer
  },
  data() {
    return {
      active: 0,
      regInfo: {
        username: "",
        password: "",
        repassword: ""
      },
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async register() {
      let res = await this.$http.post("/register", {
        username: this.regInfo.username,
        password: this.regInfo.password
      });
      if (res.data.state === 0) {
        this.$message.error("该用户名已存在");
      } else if (res.data.state === 1) {
        this.$message.success("注册成功");
      }
    },
    async login() {
      let res = await this.$http.post("/login", this.loginInfo);
      localStorage.token = res.data.token;
      this.$router.push({
        path: '/personalProfile',
        params: {
          id: res.data.userId
        }
      });
      this.$message.success('登录成功');
    },
    changeLogin() {
      if (this.$route.params.setpId === "login") {
        this.active = 0;
      } else if (this.$route.params.setpId === "register") {
        this.active = 1;
      }
    }
  },
  created() {
    this.changeLogin();
  },
  beforeRouteUpdate(to, from, next) {
    this.changeLogin();
    next();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_varibles.scss";
.login-page {
  margin-top: 50px;
  .content {
    height: calc(100vh - 50px);
    background: #f3f3f3;
    border-top: 1px solid #f3f3f3;
    .box {
      width: 356px;
      margin: 0 auto;
      .head-text {
        margin: 60px 0 30px;
        span {
          font-size: 22px;
          color: #7a7a7a;
          display: inline-block;
          margin: 0 5px;
          cursor: pointer;
          &.active {
            color: #0299ea;
          }
          &.line {
            width: 2px;
            height: 15px;
            background: #cdcdcd;
          }
        }
      }
      .login {
        width: 100%;
      }
      .register {
        width: 100%;
      }
      .btn {
        line-height: 50px;
        height: 50px;
        background: #0299ea;
        border-radius: 4px;

        button {
          display: block;
          border: none;
          background: transparent;
          width: 100%;
          height: 100%;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .club-nav {
      width: 80%;
      margin: 0 auto;
      padding: 20px 0;
      .nav-item {
        width: 13.5%;
        height: 64px;
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