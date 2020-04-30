<template>
  <div class="charts">
    <bread-crumb></bread-crumb>
    <div class="container">
      <div class="plugins-tips">
        插件地址：
        <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
      </div>
      <div class="drag-box">
        <div class="drag-item">
          <div>todo</div>
          <draggable
            :options="dragOption"
            v-model="todo"
            @end="endHandle"
            @start="startHandle"
            @remove="removeHandle"
          >
            <transition-group tag="div" data-id="todo" class="item-group">
              <div class="drag-list" v-for="item in todo" :key="item.id">{{item.tit}}</div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-item">
          <div>doing</div>
          <draggable
            :options="dragOption"
            @end="endHandle"
            @start="startHandle"
            v-model="doing"
            @remove="removeHandle"
          >
            <transition-group tag="div" data-id="doing" class="item-group">
              <div class="drag-list" v-for="item in doing" :key="item.id">{{item.tit}}</div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-item">
          <div>done</div>
          <draggable
            :options="dragOption"
            @end="endHandle"
            @start="startHandle"
            v-model="done"
            @remove="removeHandle"
          >
            <transition-group tag="div" data-id="done" class="item-group">
              <div class="drag-list" v-for="item in done" :key="item.id">{{item.tit}}</div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from "./breadcrumb";
import draggable from "vuedraggable";
export default {
  components: {
    breadCrumb,
    draggable
  },
  data() {
    return {
      dragOption: {
        animation: 100,
        group: "sortlist",
        scroll: true,
        ghostClass: "ghost-style"
      },
      isDrag: false,
      todo: [
        {
          tit: "吃饭睡觉打豆豆",
          id: 1
        },
        {
          tit: "今天是2019年6月21日",
          id: 2
        },
        {
          tit: "今天改了10个BUG",
          id: 3
        },
        {
          tit: "ElementUi组件",
          id: 4
        }
      ],
      doing: [
        {
          tit: "正在做的事情",
          id: 5
        },
        {
          tit: "无可奈何花落去",
          id: 6
        },
        {
          tit: "似曾相似燕归来",
          id: 7
        },
        {
          tit: "ElementUi组件",
          id: 8
        }
      ],
      done: [
        {
          tit: "已完成",
          id: 9
        },
        {
          tit: "无可奈何花落去",
          id: 10
        },
        {
          tit: "似曾相似燕归来",
          id: 11
        },
        {
          tit: "ElementUi组件",
          id: 12
        }
      ]
    };
  },
  methods: {
    removeHandle(ev) {
      console.log(ev);
      this.$message.success(
        "从" + ev.from.dataset.id + "移动到" + ev.to.dataset.id
      );
    },
    startHandle() {
      // this.isDrag = true;
      document.addEventListener("move", function(ev) {
        console.log("移动了");
      });
    },
    endHandle(ev) {
      //this.isDrag = false;
    }
  }
};
</script>
<style scope>
.drag-box {
  display: flex;
}
.drag-item {
  width: 28%;
  background: #eff1f5;
  border-radius: 8px;
  padding: 10px;
  margin-right: 20px;
}
.drag-list {
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 5px;
  margin: 10px 0;
  line-height: 40px;
  padding: 0 5px;
  transition: 0.5s ease;
  cursor: pointer;
  user-select: none;
}
.drag-list:hover {
  border: 1px solid #20a0ff;
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
.draging {
  background: yellow;
}
</style>


