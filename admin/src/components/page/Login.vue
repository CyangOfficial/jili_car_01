<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title">吉利后台管理系统</div>
      <el-form-item class="form-item">
        <div class="icon el-icon-user"></div>
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <div class="icon el-icon-lock"></div>
        <el-input type="password" show-password="true" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" style="width: 100%;">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      username: "admin",
      password: "admin"
    };
  }
};
</script>
<style lang="scss">
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .title {
      font-size: 26px;
      color: #eee;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: 700;
    }
    .form-item {
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      .el-input {
        display: inline-block;
        height: 47px;
        width: 90%;
        input {
          background: transparent;
          border: 0;
          -webkit-appearance: none;
          border-radius: 0;
          padding: 12px 5px 12px 15px;
          color: #eee;
          height: 47px;
        }
      }
      .icon {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
    }
  }
}
</style>


