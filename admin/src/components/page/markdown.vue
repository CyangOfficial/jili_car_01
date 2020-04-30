<template>
  <div class="markdown">
      <bread-crumb></bread-crumb>
      <div class="container">
          <div class="plugins-tips">插件地址：<a href="https://github.com/hinesboy/mavonEditor" target="_blank">mavonEditor</a></div>
          <mavon-editor v-model="value"/>
      </div>
  </div>
</template>
<script>
import breadCrumb from "./breadcrumb";
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  components: {
    breadCrumb,
    mavonEditor
  },
  data() {
      return {
          value: ''
      }
  }
};
</script>
<style>
</style>


