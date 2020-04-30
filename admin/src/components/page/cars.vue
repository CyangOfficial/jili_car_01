<template>
  <div class="table">
    <bread-crumb></bread-crumb>
    <div class="container">
      <div class="hanle-box mb20">
        <el-button size="mini" type="primary" @click="delAll">批量删除</el-button>
        <el-select v-model="selectWords" :clearable="true" placeholder="选择车系" size="mini">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.cate_name"
            :value="item.cate_name"
          ></el-option>
        </el-select>
        <el-input size="mini" class="search-input" v-model="keywords" placeholder="请输入车名"></el-input>
        <el-button size="mini" @click.native.prevent="searchCar" type="primary">搜索</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="model.list"
        height="347px"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
        border
        class="mb20"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="car_name" align="center" label="名称" width="120"></el-table-column>
        <el-table-column prop="car_name" align="center" label="图片" width="120">
          <template slot-scope="scope">
            <img style="width: 80px;" :src="scope.row.head_img_url" />
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" show-overflow-tooltip></el-table-column>
        <el-table-column prop="offical_price" label="官方价格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="car_engine" label="引擎" show-overflow-tooltip></el-table-column>
        <el-table-column prop="car_wheelbase" label="轴距" show-overflow-tooltip></el-table-column>
        <el-table-column prop="car_trans_case" label="变速箱" show-overflow-tooltip></el-table-column>
        <el-table-column prop="car_km_fuel_consumption" label="百公里耗油" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editJump(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        align="right"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 删除弹出框 -->
    <el-dialog title="提示" center :visible.sync="delDialogVisible" width="20%">
      <div class="del-dialog">确认删除吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹出框 -->
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
      keywords: "",
      selectWords: "",
      multipleSelection: [],
      currentPage: 1,
      editDialogVisible: false,
      delDialogVisible: false,
      nowId: 0,
      loading: true,
      delList: [],
      category: {},
      model: {}, //数据
      page: 1,
      cateId: 0,
      total: 0,//总条数
      pageSize: 5,//总页数
      options: []
    };
  },
  created() {
    this.getData();
    this.fetchCategory();
  },
  /*
   * computed用来监控自己定义的变量，该变量不在data里面声明，
   * 直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
   */
  computed: {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    editJump(scope) {
      this.$router.push(`/cars/edit/${scope.row.id}`);
    },
    //批量删除
    delAll() {
      const length = this.multipleSelection.length;
      this.delList = this.delList.concat(this.multipleSelection);
      let str = "";
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    //删除
    handleDel(msg) {
      this.nowId = msg.$index;
      this.delDialogVisible = true;
    },
    //删除一条数据
    deleteRow() {},
    //保存编辑
    saveEditData() {},
    //获取车辆数据
    getData() {
      this.loading = true;
      this.$http.get(`/cars?page=${this.page}`).then(data => {
        console.log(data);
        this.loading = false;
        this.$set(this.model, "list", data.data.data);
        this.total = data.data.total.count;
        this.loading = false;
      });
    },
    //获取车系
    async fetchCategory() {
      let { data } = await this.$http.get("/category");
      this.category = data;
    },
    //根据车系获取数据
    async fetchCate() {
      let { data } = await this.$http.get(`/searchCate/?cateId=${this.cateId}`);
      this.total = data.count.count;
      this.$set(this.model, "list", data.data);
    },
    async fetchSearchCar() {
      console.log(this.keywords);
      let { data } = await this.$http.get(`/searchCar/?kw=${this.keywords}`);
      if(data.success){
        this.$set(this.model, "list", data.data);
        this.total = data.count.count;
      }else {
        this.$message.warning('没有找到');
      }
    },
    async searchCar() {
      if (this.keywords.trim() === "") {
        this.getData();
        return;
      }
      this.fetchSearchCar();
    }
  },
  watch: {
    //根据选择的车系关键词来筛选数据
    selectWords(val, oldVal) {
      if (val.trim() === "") {
        this.getData();
        return;
      }
      this.category.forEach(item => {
        if (item.cate_name === val) {
          this.cateId = item.id;
        }
      });
      this.fetchCate();
    }
  }
};
</script>
<style>
.table .search-input {
  display: inline-block;
  width: 300px;
}
.table .del-dialog {
  font-size: 20px;
  text-align: center;
}
</style>


