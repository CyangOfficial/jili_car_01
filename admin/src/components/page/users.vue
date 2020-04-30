<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="container">
      <el-table :data="userList" tooltip-effect="dark" style="width: 100%" :border="true">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="用户名" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="姓名" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.name!=='null' ? scope.row.name : '--' }}</template>
        </el-table-column>
        <el-table-column label="性别" width="80" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.sex!=='null' ? scope.row.sex : '--' }}</template>
        </el-table-column>
        <el-table-column label="生日" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.birthday | moment('YYYY年MM月DD') }}</template>
        </el-table-column>
        <el-table-column label="职业" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.occupation!=='null' ? scope.row.occupation : '--' }}</template>
        </el-table-column>
        <el-table-column label="位置" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.location!=='null' ? scope.row.location : '--' }}</template>
        </el-table-column>
        <el-table-column label="邮箱" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.email!=='null' ? scope.row.email : '--' }}</template>
        </el-table-column>
        <el-table-column label="个性签名" width="80" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.per_sig!=='null' ? scope.row.per_sig : '--' }}</template>
        </el-table-column>
        <el-table-column label="头像" width="80" show-overflow-tooltip>
          <template slot-scope="scope">
            <img class="avatar" :src="'http://localhost:3000/'+scope.row.avatar" >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="$router.push(`/news/newsEdit/${scope.row.id}`)"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">注销</el-button>
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
      userList: []
    };
  },
  methods: {
    async fetchUsers() {
      let { data } = await this.$http.get(`/users`);
      this.userList = data.data;
      console.log(this.userList);
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>
<style>
.msg {
  color: #20a0ff;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>


