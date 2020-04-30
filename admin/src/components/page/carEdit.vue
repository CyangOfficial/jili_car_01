<template>
  <div class="table">
    <bread-crumb></bread-crumb>
    <div class="container">
      <el-tabs @tab-click="tabsChange" type="border-card" v-model="activeName">
        <el-tab-pane name="base" label="基本信息">
          <el-form @submit.native.prevent style="width: 400px" ref="form" label-width="100px">
            <el-form-item label="名称：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.car_name"></el-input>
            </el-form-item>
            <el-form-item label="车系：">
              <el-select v-model="baseData.choseCate" placeholder="请选择">
                <el-option v-for="item in baseData.category" :key="item.id" :value="item.cate_name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="官方指导价：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.offical_price"></el-input>
            </el-form-item>
            <el-form-item label="库存：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.stock"></el-input>
            </el-form-item>
            <el-form-item label="头部展示图：">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/admin/api/upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="headImgSuccess"
              >
                <img v-if="baseData.carInfo" :src="baseData.carInfo.head_img_url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="尺寸：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.car_size"></el-input>
            </el-form-item>
            <el-form-item label="发动机：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.car_engine"></el-input>
            </el-form-item>
            <el-form-item label="轴距：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.car_wheelbase"></el-input>
            </el-form-item>
            <el-form-item label="变速箱：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.car_trans_case"></el-input>
            </el-form-item>
            <el-form-item label="百公里耗油：">
              <el-input v-if="baseData.carInfo" v-model="baseData.carInfo.car_km_fuel_consumption"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="baseData.carInfo"
                @click="saveBaseInfo"
                type="primary"
                native-type="submit"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkId" name="volume" label="汽车排量">
          <el-form @submit.native.prevent label-width="100px">
            <el-form-item label="选择排量：">
              <el-select v-model="volumeData.choseValumes" multiple placeholder="请选择">
                <el-option v-for="item in volumeData.volumes" :key="item.id" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveVolumes" type="primary" native-type="submit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkId" name="picture" label="汽车颜色/图片">
          <el-form>
            <el-table :data="colorsData.colors" style="width: 100%">
              <el-table-column label="颜色名称" width="180">
                <template slot-scope="scope">
                  <el-input type="primary" v-model="scope.row.color_name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sm_url" label="颜色缩略图" width="180">
                <template slot-scope="scope">
                  <el-upload
                    class="avatar-uploader"
                    action="http://localhost:3000/admin/api/upload"
                    :show-file-list="false"
                    :on-success="(response, file, fileList) => colorSmSuccess(response, file, fileList, scope.$index)"
                  >
                    <img
                      style="width: 50px;"
                      list-type="picture-card"
                      v-if="scope.row.sm_url"
                      :src="scope.row.sm_url"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="汽车图片" width="180">
                <template slot-scope="scope">
                  <el-upload
                    action="http://localhost:3000/admin/api/upload"
                    list-type="picture-card"
                    :on-success="(response, file, fileList) => carImgSucc(response, file, fileList, scope.$index)"
                    :show-file-list="false"
                    class="avatar-uploader"
                  >
                    <img
                      list-type="picture-card"
                      :show-file-list="false"
                      v-if="scope.row.img_url"
                      :src="scope.row.img_url"
                      class="avatar"
                    />
                    <i v-if="!scope.row.img_url" class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="scope.row.img_url" alt />
                  </el-dialog>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="delColRow(scope.$index)"
                    type="text"
                    size="small"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start">
              <el-col :span="3">
                <el-form-item>
                  <el-button @click.native.prevent="addColor" icon="el-icon-plus" type="success">添加</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item>
                  <el-button
                    @click.native.prevent="saveColor"
                    type="primary"
                    native-type="submit"
                  >保存</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkId" name="model" label="汽车型号">
          <el-form @submit.native.prevent>
            <el-form-item
              v-for="item in modelData.carVolumes"
              :key="item.name"
              :label="item.name + '：'"
            >
              <el-select v-model="item.choseVol" multiple placeholder="请选择">
                <el-option
                  v-for="child in item.children"
                  :key="child.model_name"
                  :label="child.model_name"
                  :value="child.model_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveModel" type="primary" native-type="submit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkId" name="inner" label="汽车内饰">
          <el-form>
            <el-table :data="innerData.list" style="width: 100%">
              <el-table-column label="标题" width="180">
                <template slot-scope="scope">
                  <el-input type="primary" v-model="scope.row.title"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="描述" width="180">
                <template slot-scope="scope">
                  <el-input type="primary" v-model="scope.row.description"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="颜色名称" width="180">
                <template slot-scope="scope">
                  <el-input type="primary" v-model="scope.row.col_name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sm_url" label="颜色缩略图" width="180">
                <template slot-scope="scope">
                  <el-upload
                    class="avatar-uploader"
                    action="http://localhost:3000/admin/api/upload"
                    :show-file-list="false"
                    :on-success="(response, file, fileList) => innerSmSuccess(response, file, fileList, scope.$index)"
                  >
                    <img
                      style="width: 50px;"
                      list-type="picture-card"
                      v-if="scope.row.sm_url"
                      :src="scope.row.sm_url"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="内饰图片" width="180">
                <template slot-scope="scope">
                  <el-upload
                    action="http://localhost:3000/admin/api/upload"
                    list-type="picture-card"
                    :on-success="(response, file, fileList) => innerImgSucc(response, file, fileList, scope.$index)"
                    :show-file-list="false"
                    class="avatar-uploader"
                  >
                    <img
                      list-type="picture-card"
                      :show-file-list="false"
                      v-if="scope.row.img_url"
                      :src="scope.row.img_url"
                      class="avatar"
                    />
                    <i v-if="!scope.row.img_url" class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="scope.row.img_url" alt />
                  </el-dialog>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="delInnerRow(scope.$index)"
                    type="text"
                    size="small"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start">
              <el-col :span="3">
                <el-form-item>
                  <el-button @click.native.prevent="addInner" icon="el-icon-plus" type="success">添加</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item>
                  <el-button
                    @click.native.prevent="saveInner"
                    type="primary"
                    native-type="submit"
                  >保存</el-button>
                </el-form-item>
              </el-col>
            </el-row>
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
      baseData: {}, //基本信息
      volumeData: {}, //汽车排量数据
      colorsData: {}, //汽车颜色数据
      modelData: {}, //汽车型号数据
      innerData: {}, //汽车内饰数据
      activeName: "base",
      dialogVisible: false, //汽车照片放大
      tabLoad: [true, false, false, false]
    };
  },
  methods: {
    //获取汽车基本信息
    async fetchBaseInfo() {
      let { data } = await this.$http.get(`/carInfo?id=${this.carId}`);
      if (data.length !== 0) {
        this.checkId = true; //ID存在，校验成功
        this.$set(this.baseData, "carInfo", data[0]);
        this.fetchCategory();
      } else {
        this.$message.error("此车辆不存在");
      }
    },
    //头部图片汽车上传
    headImgSuccess(res, file) {
      if (file.response.url.trim() !== "") {
        this.baseData.head_img_url = file.response.url;
      }
    },
    //保存汽车基本信息
    saveBaseInfo() {
      if (this.baseData.length !== 0) {
        this.$http
          .put(`/carInfo`, {
            data: this.baseData
          })
          .then(res => {
            if (res.data.success) {
              this.$message.success("修改成功");
            } else {
              this.$message.success("修改失败");
            }
          });
      } else {
        this.$message.error("此车辆不存在");
      }
    },
    //获取车系
    async fetchCategory() {
      let { data } = await this.$http.get("/category");
      this.$set(this.baseData, "category", data);
      this.baseData.category.forEach(item => {
        if (item.id === this.baseData.carInfo.cate_id) {
          this.$set(this.baseData, "choseCate", item.cate_name);
        }
      });
    },
    //选项卡切换
    tabsChange(val) {
      this.activeName = val.paneName;
      if (this.activeName === "volume" && !this.tabLoad[1]) {
        this.fetchVolumes(); //排量列表
        this.fetchCarVolume(); //汽车对应的排量值
      } else if (this.activeName === "picture" && !this.tabLoad[2]) {
        this.fetchColors(); //获取汽车颜色
      } else if (this.activeName === "model" && !this.tabLoad[3]) {
        this.fetchModel();
      } else if (this.activeName === "inner" && !this.tabLoad[4]) {
        this.fetchInner();
      }
    },
    //获取排量列表
    async fetchVolumes() {
      let { data } = await this.$http.get("/volumes");
      if (data.length !== 0) {
        this.tabLoad[1] = true;
        this.volumeData.volumes = data;
      }
    },
    //获取汽车对应的排量值
    async fetchCarVolume() {
      let { data } = await this.$http.get(`/carVolumes/?id=${this.carId}`);
      this.$set(this.volumeData, "carVolumes", data);
      this.volumeData.choseValumes = data.map(item => item.name);
    },
    //保存排量修改
    saveVolumes() {
      if (this.volumeData.choseValumes.length === 0) {
        this.$message.error("至少选择一个");
      } else {
        this.volumeData.volumesId = this.volumeData.volumes
          .filter(item => {
            return this.volumeData.choseValumes.includes(item.name);
          })
          .map(item => [Number(this.carId), item.id]);
        this.$http
          .put("/carVolumes", {
            carId: this.carId,
            volumesId: this.volumeData.volumesId
          })
          .then(res => {
            if (res.data.success) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
      }
    },
    //获取汽车颜色
    async fetchColors() {
      let { data } = await this.$http.get(`/colors/?id=${this.carId}`);
      if (data.length !== 0) {
        this.$set(this.colorsData, "colors", data);
        this.tabLoad[2] = true;
      } else {
        this.colorsData.colors = [];
      }
    },
    //汽车颜色上传成功
    colorSmSuccess(res, file, fileList, index) {
      this.colorsData.colors[index].sm_url = file.response.url;
      if (file.status === "success") {
        this.$message.success("上传成功");
      }
    },
    //汽车图片上传成功
    carImgSucc(res, file, fileList, index) {
      this.colorsData.colors[index].img_url = file.response.url;
      if (file.status === "success") {
        this.$message.success("上传成功");
      }
    },
    //添加汽车颜色/图片
    addColor() {
      this.$set(
        this.colorsData,
        this.colorsData.colors.push({
          car_id: this.carId,
          color_name: "",
          img_url: "",
          sm_url: ""
        })
      );
    },
    //删除颜色
    delColRow(index, data) {
      this.$confirm("确定删除该项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.colorsData.colors.splice(index, 1);
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },
    //保存汽车颜色/图片
    async saveColor() {
      let isValid = false;
      //校验信息是否完成
      isValid = this.colorsData.colors.every(item => {
        console.log(item);
        if (
          item.color_name.trim() === "" ||
          item.sm_url.trim() === "" ||
          item.img_url.trim() === ""
        ) {
          return false;
        }
        return true;
      });
      if (!isValid) {
        this.$message.info("信息不完整");
      } else {
        console.log(this.colorsData);
        let res = await this.$http.put(`/colors`, {
          carId: this.carId,
          colors: this.colorsData.colors
        });
        if (res.data.success) {
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
        }
      }
    },
    //获取型号
    async fetchModel() {
      let volumes = await this.$http.get(`/carVolumes/?id=${this.carId}`);
      this.$set(this.modelData, "carVolumes", volumes.data);
      let { data } = await this.$http.get("/model");
      this.tabLoad[3] = true;
      let midData = await this.$http.get(`/volAndModelMid/?id=${this.carId}`);
      this.$set(this.modelData, "modelList", data);
      this.modelData.carVolumes.forEach(item => {
        item.children = data;
        item.choseVol = [];
        midData.data.forEach(modelItem => {
          if (modelItem.volume_id === item.volume_id) {
            item.choseVol.push(modelItem.model_name);
          }
        });
      });
    },
    //保存型号
    saveModel() {
      let data = this.modelData.carVolumes.map(item => {
        return item.choseVol.map(child => {
          let id = this.modelData.modelList.filter(modeItem => {
            if (modeItem.model_name === child) {
              return modeItem.id;
            }
          });
          return [Number(this.carId), item.volume_id, id[0].id];
        });
      });
      let list = [];
      data.forEach(item => {
        item.forEach(child => {
          list.push(child);
        });
      });
      this.$http
        .put("/model", {
          carId: this.carId,
          list
        })
        .then(res => {
          if (res.data.success) {
            this.$message.success("保存成功");
          } else {
            this.$message.error("保存失败");
          }
        });
    },
    async fetchInner() {
      let { data } = await this.$http.get(`/inner/?id=${this.carId}`);
      this.$set(this.innerData, "list", data.data);
      console.log(this.innerData);
    },
    //删除内饰
    delInnerRow(index, data) {
      this.$confirm("确定删除该项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.innerData.list.splice(index, 1);
          this.$message.success("删除成功");
          console.log(this.colorsData);
        })
        .catch(() => {});
    },
    addInner() {
      this.innerData.list.push({
        car_id: this.carId,
        sm_url: "",
        img_url: "",
        title: "",
        desc: ""
      });
    },
    //汽车内饰缩略图上传成功
    innerSmSuccess(res, file, fileList, index) {
      console.log(this.innerData.list, index);
      this.innerData.list[index].sm_url = file.response.url;
      if (file.status === "success") {
        this.$message.success("上传成功");
      }
    },
    //汽车内饰图片上传成功
    innerImgSucc(res, file, fileList, index) {
      this.innerData.list[index].img_url = file.response.url;
      if (file.status === "success") {
        this.$message.success("上传成功");
      }
    },
    //保存颜色
    async saveInner() {
      let isValid = false;
      //校验信息是否完成
      isValid = this.innerData.list.every(item => {
        console.log(item);
        if (
          item.title.trim() === "" ||
          item.sm_url.trim() === "" ||
          item.img_url.trim() === "" ||
          item.description.trim() === "" ||
          item.col_name.trim() === ''
        ) {
          return false;
        }
        return true;
      });
      if (!isValid) {
        this.$message.info("信息不完整");
      } else {
        console.log("put");
        let res = await this.$http.put(`/inner`, {
          carId: this.carId,
          list: this.innerData.list
        });
        if (res.data.success) {
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
        }
      }
    }
  },
  watch: {
    "baseData.choseCate": {
      handler(val, oldVal) {
        this.baseData.category.forEach(item => {
          if (item.cate_name === this.baseData.choseCate) {
            this.$set(this.baseData.carInfo, "cate_id", item.id);
          }
        });
      }
    }
  },
  created() {
    this.carId = this.$route.params.id;
    this.carId && this.fetchBaseInfo();
  }
};
</script>
<style lang="scss">
.avatar-uploader {
  .el-upload--picture-card {
    display: flex;
    align-items: center;
    width: auto;
    max-width: 200px;
    height: auto;
    img {
      width: 100%;
    }
  }
}
</style>


