<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="container">
      <el-table
        ref="multipleTable"
        :data="predictList"
        tooltip-effect="dark"
        style="width: 100%"
        :row-style="{'height':'50px'}"
        :border="true"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="车系" width="250" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.model }}</template>
        </el-table-column>
        <el-table-column label="地区"  show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.location }}</template>
        </el-table-column>
        <el-table-column label="姓名"  show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="性别"  show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.sex }}</template>
        </el-table-column>
        <el-table-column label="电话"  show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="邮箱"  show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="时间"  show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.time | moment('YYYY年MM月DD日') }}</template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="$router.push(`/news/newsEdit/${scope.row.id}`)"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>
<script>
import breadCrumb from "./breadcrumb";
import moment from "moment";
export default {
  components: {
    breadCrumb
  },
  data() {
    return {
      predictList: [],
      multipleSelection: [],
      page: 1
    };
  },
  methods: {
    async fetchPredict() {
      let { data } = await this.$http.get('/predict');
      this.predictList = data.data;
      console.log(data);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  },
  created() {
    this.fetchPredict();
  }
};
</script>
<style>
.msg {
  color: #20a0ff;
}
</style>


