<template>
  <div class="wrap">
    <v-head :isCollapse="isCollapse" @setCollapse="setCollapse"></v-head>
    <v-sidebar :isCollapse="isCollapse"></v-sidebar>
    <div class="content-box" :class="{open:!isCollapse}">
        <v-tags></v-tags>
        <div class="content">
          <!-- 
          由于 Vue 会复用相同组件, 即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 
          这类链接跳转时, 将不在执行created, mounted之类的钩子, 这时候你需要在路由组件中, 
          添加beforeRouteUpdate钩子来执行相关方法拉去数据 
          -->
          <router-view :key="$route.path"></router-view>
        </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./SliderBar.vue";
import vTags from "./tags";
export default {
  props: {
    // isCollapse: Boolean
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    setCollapse(){
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-box {
  position: absolute;
  height: 100%;
  left: 64px;
  right: 0;
  top: 70px;
  border: 1px solid #ccc;
  transition: left .3s ease-in-out;
  background: rgb(240,240,240);
  
}
.content-box.open {
  left: 200px;
}
.content {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  padding-bottom: 120px;
}
</style>
