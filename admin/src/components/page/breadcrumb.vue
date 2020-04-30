<template>
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{crubmTit}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    data() {
        return {
            crubmTit: this.$router.history.current.meta.title
        }
    }
}
</script>

<style>
.crumb {
  line-height: 40px;
  text-overflow: ellipsis
}
</style>
