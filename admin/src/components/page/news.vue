<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="container">
      <el-table
        ref="multipleTable"
        :data="newsList"
        :cell-style="cellStyle"
        tooltip-effect="dark"
        style="width: 100%"
        :row-style="{'height':'50px'}"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标题" width="250" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="详情" width="250">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column sortable label="发布时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.create_time | moment('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column label="修改时间" show-overflow-tooltip>
          <template
            slot-scope="scope"
          >{{scope.row.mod_time ? scope.row.mod_time : '-'}}</template>
        </el-table-column>
        <el-table-column label="浏览" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.bowser_count}}</template>
        </el-table-column>
        <el-table-column label="点赞" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.like_count}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="$router.push(`/news/newsEdit/${scope.row.id}`)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
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
      newsList: [],
      multipleSelection: [],
      page: 1
    };
  },
  methods: {
    async fetchNews() {
      let { data } = await this.$http.get(`/news?page=${this.page}`);
      this.newsList = data.data;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editJump(id) {
      this.$router.push(`/news/newsEdit/${id}`);
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      // if (row.columnIndex === 5) {
      //   return `text-align: center`;
      // }
      // console.log(row);
    }
  },
  created() {
    this.fetchNews();
  }
};
</script>
<style>
.msg {
  color: #20a0ff;
}
</style>


