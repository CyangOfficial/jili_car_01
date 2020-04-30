<template>
  <div class="charts">
    <bread-crumb></bread-crumb>
    <div class="container">
      <div class="tit">可以拖动的弹窗</div>
      <el-button size="mini" @click="visible = true" type="primary">点我弹框</el-button>
      <el-dialog v-drag class="dailog" title="提示" :visible.sync="visible" width="30%">
        <span>这是一个可拖拽的弹窗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="visible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import breadCrumb from "./breadcrumb";
export default {
  components: {
    breadCrumb
  },
  data() {
    return {
      visible: false
    };
  }
};
</script>
<style>
.tit {
  margin-bottom: 20px;
}
</style>


