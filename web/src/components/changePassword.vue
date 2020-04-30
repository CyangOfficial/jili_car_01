<template>
  <div class="password-container">
    <div class="title">修改密码</div>
    <div class="sub-tit">您必须填写原密码才能修改下面的资料</div>
    <div class="form">
      <el-form
        label-width="80px"
        :label-position="labelPosition"
        @submit.native.prevent="submitData"
      >
        <el-form-item class="form-item" label="原密码">
          <el-input class="pass-wd" v-model="paswd.originPas" show-password></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="新密码">
          <el-input class="pass-wd" v-model="paswd.newPas" show-password></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="确认密码">
          <el-input class="pass-wd" v-model="paswd.reNewPas" show-password></el-input>
        </el-form-item>
        <el-form-item class="form-item" label>
          <el-button type="success" @click="password">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
      paswd: {
        originPas: "",
        newPas: "",
        reNewPas: ""
      }
    };
  },
  methods: {
    async password() {
      let res = await this.$http.put("/password", {
        origin: this.paswd.originPas,
        newPas: this.paswd.newPas
      });
      console.log(res);
      if (res.data.state === 0) {
        this.$message.success("修改成功，请重新登录!");
        this.$router.push('registerorsginIn/login');
        localStorage.clear();
      } else if(res.data.state === 1) {
        this.$message.error("原密码错误");
      }else {
        this.$message.error("修改失败");
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/scss/_varibles.scss";
.password-container {
  .title {
    color: #6a6a6a;
    font-weight: 600;
    font-size: 16px;
  }
  .sub-tit {
    color: #a4a4a4;
    margin-top: 10px;
  }
  .form {
    margin-top: 30px;
    .pass-wd {
      width: 500px;
    }
  }
}
</style>