<template>
  <div @touchmove.prevent class="predict-block" :class="{open: isOpen}">
    <div @touchmove.prevent @mousewheel.prevent class="predict-content">
      <div class="head">
        <i class="iconfont icon-ios-shijian"></i>
        <span>预约试驾</span>
      </div>
      <div class="text-info">欢迎您在线预约试驾，吉利很重视您所提交的一切信息，这将令我们更了解您的需求和喜好，并为您提供更好的驾乘体验。</div>
      <div class="form">
        <el-form label-position="top" size="small">
          <el-form-item label="车型选择" class="form-item">
            <el-select @visible-change="fetchModel" v-model="preObj.car">
              <el-option
                v-for="item in cars"
                :key="item.car_name"
                :label="item.car_name"
                :value="item.car_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择地区" class="form-item">
            <div class="location">
              <div class="provice">
                <el-select
                  @visible-change="fetchProvice"
                  @change="choseProv"
                  v-model="choseLocation.provice"
                >
                  <el-option
                    v-for="item in provice"
                    :key="item.cityname"
                    :label="item.cityname"
                    :value="item.cityname"
                  ></el-option>
                </el-select>
              </div>
              <div class="city">
                <el-select @visible-change="fetchCity" @change="choseCity" v-model="choseLocation.city">
                  <el-option
                    v-for="item in city"
                    :key="item.cityname"
                    :label="item.cityname"
                    :value="item.cityname"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <div class="text">联系方式（*为必填信息请确保信息准确无误）</div>
          <el-form-item class="form-item" label="姓名">
            <el-input class="input-block" v-model="preObj.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="称 谓">
            <el-radio-group v-model="preObj.sex">
              <el-radio label="先生">先生</el-radio>
              <el-radio label="女士">女士</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item" label="手机">
            <el-input class="input-block" v-model="preObj.phone" placeholder="请输入您的手机号码"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="电子邮箱">
            <el-input class="input-block" v-model="preObj.email" placeholder="请输入您的电子邮箱"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label>
            <el-checkbox class="check-box" v-model="preObj.agree">
              我已阅读并了解本网站的
              <a href="javascript:;">《隐私政策》。</a>本网站承诺将严格保障您的个人信息。
            </el-checkbox>
          </el-form-item>
          <el-form-item class="form-item predict-btn">
            <el-button type="primary" @click="save">立即预约</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div @touchmove.prevent @mousewheel.prevent class="mask" @click="maskClose"></div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      labelPosition: "top",
      provice: "",
      city: "",
      isOpen: false,
      cars: [],
      choseLocation: {
        provice: "",
        city: ""
      },
      preObj: {
        car: "",
        provice: "",
        location: "",
        name: "",
        sex: "",
        phone: "",
        email: ""
      }
    };
  },
  methods: {
    async fetchModel() {
      let res = await this.$http.get("/headCars");
      this.cars = res.data;
      console.log(res.data);
    },
    async fetchProvice(val) {
      if (val) {
        let { data } = await this.$http.get("/provice");
        this.provice = data.data;
      }
    },
    //获取城市
    async fetchCity(val) {
      if (val) {
        let prov = this.provice.find(
          item => item.cityname === this.choseLocation.provice
        );
        let { data } = await this.$http.get(`/city?id=${prov.id}`);
        this.city = data.data;
      }
    },
    //选择省份
    choseProv(val) {
      this.choseLocation.provice = val;
      this.choseLocation.city = "";
    },
    //选择城市
    choseCity(val) {
      this.choseLocation.city = val;
      this.preObj.location = `${this.choseLocation.provice} ${this.choseLocation.city}`;
    },
    maskClose() {
      this.isOpen = !this.isOpen;
      this.$emit("closed");
      // console.log(this.isOpen)
    },
    async save() {
      let { data } = await this.$http.post("/predict", this.preObj);
      console.log(data)
      if(data.success){
        this.$message.success('预约成功')
      } else {
        this.$message.error('预约失败')
      }
    }
  },
  watch: {
    open(val) {
      this.isOpen = val;
    }
  }
};
</script>

<style lang="scss">
.predict-block {
  visibility: hidden;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  &.open {
    visibility: visible;
    .mask {
      display: block;
    }
    .predict-content {
      right: 0;
    }
  }
  .predict-content {
    width: 45%;
    height: 100%;
    background: #fff;
    position: absolute;
    right: -45%;
    top: 0;
    z-index: 8;
    padding: 20px;
    transition: all 0.3s;
    .head {
      i {
        vertical-align: middle;
        font-size: 24px;
      }
      span {
        vertical-align: top;
        font-size: 18px;
        font-weight: 700;
      }
    }
    .text-info {
      margin: 20px 0;
    }
    .form {
      .text {
        margin-bottom: 15px;
      }
      .form-item {
        margin-bottom: 10px;
        .el-form-item__label {
          line-height: 10px;
          input {
            height: 28px;
          }
        }
        .location {
          display: flex;
          .provice {
            margin-right: 15px;
          }
        }
        .input-block {
          width: 300px;
        }
        .check-box {
          a {
            color: #409eff;
          }
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 5;
    display: none;
  }
}
</style>