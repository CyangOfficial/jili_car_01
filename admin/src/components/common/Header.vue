<template>
  <div class="header">
    <div class="menu-btn" @click="changeCollapse">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="user-info">
      <div class="full-screen">
        <i class="el-icon-rank"></i>
      </div>
      <div class="remind">
        <i class="el-icon-bell"></i>
      </div>
      <div class="user-avator">
        <img src="../../assets/images/avator.jpg">
      </div>
      <el-dropdown class="user-name" trigger="click">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        isCollapse: Boolean
    },
    methods: {
        changeCollapse() {
            this.$emit("setCollapse");
        }
    }
};
</script>

<style>
.header {
  height: 70px;
  background-color: #242f42;
  padding: 0 30px;
  color: #fff;
}

.header .menu-btn {
  float: left;
}

.header .menu-btn i {
  font-size: 30px;
  line-height: 70px;
}

.header .logo {
  float: left;
  line-height: 70px;
  font-size: 22px;
  margin-left: 20px;
}

.header .user-info {
  float: right;
  font-size: 22px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header .user-info > div {
  float: left;
  margin-left: 20px;
}

.header .user-avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.header .user-avator img {
  width: 100%;
}

.header .user-name {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.header .menu-btn {
    cursor: pointer;
}
</style>
