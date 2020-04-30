<template>
  <div class="slidbar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      background-color="#324157"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>

            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  :index="threeItem.index"
                  :key="threeItem.index"
                  v-for="threeItem in subItem.subs"
                >{{threeItem.title}}</el-menu-item>
              </el-submenu>

              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{subItem.title}}</el-menu-item>
            </template>
          </el-submenu>
        </template>

        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    isCollapse: Boolean
  },
  data() {
    return {
      items: [
        {
          icon: "el-icon-umpxiazai45",
          index: "/homePage",
          title: "系统首页"
        },
        {
          icon: "el-icon-umptable",
          index: "/cars",
          title: "汽车管理",
          subs: [
            {
              index: "/cars",
              title: "汽车列表"
            },
            {
              index: "/addCar",
              title: "添加车辆"
            }
          ]
        },
        {
          icon: "el-icon-umptab",
          index: "/news",
          title: "新闻管理",
          subs: [
            {
              icon: "el-icon-umptab",
              index: "/news",
              title: "新闻列表"
            },
            {
              icon: "el-icon-umptab",
              index: "/news/newsEdit",
              title: "发布新闻"
            }
          ]
        },
        {
          icon: "el-icon-umpbiaodan",
          index: "/predict",
          title: "用户预约"
        },
        {
          icon: "el-icon-umpbiaodan",
          index: "/users",
          title: "用户管理"
        },
        {
          icon: "el-icon-umpbiaodan",
          index: "/form",
          title: "表单相关",
          subs: [
            {
              index: "forms",
              title: "基本表单"
            },
            {
              index: "threeLevelMenu",
              title: "三级菜单",
              subs: [
                {
                  index: "editor",
                  title: "富文本编辑器"
                },
                {
                  index: "markdown",
                  title: "markdown编译器"
                }
              ]
            },
            {
              index: "upload",
              title: "文件上传"
            }
          ]
        },
        {
          icon: "el-icon-umpzidingyiyemian",
          index: "/icon",
          title: "自定义图标"
        },
        {
          icon: "el-icon-umpbingzhuangtu",
          index: "/charts",
          title: "charts图表"
        },
        {
          icon: "el-icon-umpkujialeqiyezhan_mohutuozhuaichicun",
          index: "/drag",
          title: "拖拽组件",
          subs: [
            {
              index: "drags",
              title: "拖拽列表"
            },
            {
              index: "dialog",
              title: "拖拽弹框"
            }
          ]
        },
        {
          icon: "el-icon-umpearth",
          index: "/i18n",
          title: "国际化功能"
        },
        {
          icon: "el-icon-umpalert",
          index: "/alert",
          title: "错误处理",
          sub: [
            {
              index: "permission",
              title: "权限测试"
            },
            {
              index: "404",
              title: "404页面"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onRouters() {
      console.log(this.$route.path.replace("/", ""));
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.slidbar {
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  height: 100%;
}
.slidbar > ul {
  float: left;
  height: 100%;
}
</style>

