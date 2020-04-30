<template>
  <div class="table">
    <bread-crumb></bread-crumb>
    <div class="container">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane name="base" label="基本信息">
          <el-form @submit.native.prevent style="width: 400px" ref="form" label-width="100px">
            <el-form-item label="名称：">
              <el-input v-if="baseData" v-model="baseData.car_name"></el-input>
            </el-form-item>
            <el-form-item label="车系：">
              <el-select v-model="choseCate" placeholder="请选择">
                <el-option v-for="item in cateList.category" :key="item.id" :value="item.cate_name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="官方指导价：">
              <el-input v-if="baseData" v-model="baseData.offical_price"></el-input>
            </el-form-item>
            <el-form-item label="库存：">
              <el-input v-if="baseData" v-model="baseData.stock"></el-input>
            </el-form-item>
            <el-form-item label="头部展示图：">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/admin/api/upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="headImgSuccess"
              >
                <img v-if="baseData.head_img_url" :src="baseData.head_img_url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="尺寸：">
              <el-input v-if="baseData" v-model="baseData.car_size"></el-input>
            </el-form-item>
            <el-form-item label="发动机：">
              <el-input v-if="baseData" v-model="baseData.car_engine"></el-input>
            </el-form-item>
            <el-form-item label="轴距：">
              <el-input v-if="baseData" v-model="baseData.car_wheelbase"></el-input>
            </el-form-item>
            <el-form-item label="变速箱：">
              <el-input v-if="baseData" v-model="baseData.car_trans_case"></el-input>
            </el-form-item>
            <el-form-item label="百公里耗油：">
              <el-input v-if="baseData" v-model="baseData.car_km_fuel_consumption"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="baseData"
                @click="saveBaseInfo"
                type="primary"
                native-type="submit"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
      carId: 0,
      checkId: false, //校验ID是否存在
      props: { multiple: true },
      baseData: {
        car_name: "",
        sale: 0,
        head_img_url: "",
        car_size: "",
        car_engine: "",
        car_wheelbase: "",
        car_trans_case: "",
        car_km_fuel_consumption: "",
        offical_price: "",
        cate_id: 0,
        stock: 0
      }, //基本信息
      cateList: [],
      choseCate: "",
      activeName: "base",
      dialogVisible: false //汽车照片放大
    };
  },
  methods: {
    //头部图片汽车上传
    headImgSuccess(res, file) {
      if (file.response.url.trim() !== "") {
        this.baseData.head_img_url = file.response.url;
      }
    },
    //保存汽车基本信息
    saveBaseInfo() {
      console.log(this.baseData);
      if (this.baseData.car_name.trim() === "") {
        this.$message.error("名称不能为空");
        return;
      } else if (this.baseData.cate_id === 0) {
        this.$message.error("请选择车系");
        return;
      } else if (this.baseData.head_img_url.trim() === "") {
        this.$message.error("请上传展示图");
        return;
      }
      this.$http
        .post(`/carInfo`, {
          data: this.baseData
        })
        .then(res => {
          if (res.data.success) {
            this.$message.success("添加成功");
            this.$router.replace('/cars');
          } else {
            this.$message.success("添加失败");
          }
        });
    },
    //获取车系
    async fetchCategory() {
      let { data } = await this.$http.get("/category");
      this.$set(this.cateList, "category", data);
      this.cateList.category.forEach(item => {
        if (item.id === this.baseData.cate_id) {
          this.cateList.push(item);
        }
      });
    }
  },
  watch: {
    choseCate: {
      handler(val, oldVal) {
        this.cateList.category.forEach(item => {
          if (item.cate_name === this.choseCate) {
            this.$set(this.baseData, "cate_id", item.id);
          }
        });
      }
    }
  },
  created() {
    this.fetchCategory();
  }
};
</script>
<style lang="scss">
.avatar-uploader {
  .el-upload--picture-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    max-width: 200px;
    min-height: 50px;
    height: auto;
    img {
      width: 100%;
    }
  }
}
</style>


