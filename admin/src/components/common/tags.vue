<template>
  <div class="tags">
      <ul class="tagList">
          <li v-for="(item,index) in tagList" :key="index">
              <router-link to="homePage">系统首页</router-link>
              <span class="close-icon">
                  <i class="el-icon-close"></i>
              </span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tagList: []
        }
    },
    methods: {
        
    }
};
</script>

<style>
.tags {
  width: 100%;
  height: 30px;
  background: #fff;
  position: relative;
  box-shadow: 0 2px 10px #ccc;
  z-index: 5;
}
.tagList {
    height: 100%;
    font-size: 12px;
    display: flex;
    align-items: center;
}
.tagList li {
    margin: 0 5px;
    color: #666;
    line-height: 24px;
    padding: 0 10px;
    border: 1px solid #e9eaec;
    border-radius: 3px;
}
.tagList li.active {
    border: 1px solid #409EFF;
    background-color: #409EFF;
}
</style>

