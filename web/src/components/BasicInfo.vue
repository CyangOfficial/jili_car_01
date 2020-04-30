<template>
  <div class="basic-container">
    <div class="info-nav">
      <span @click="infoNav = !infoNav" :class="{'info-active': infoNav}">基本资料</span>
      <span @click="infoNav = !infoNav" :class="{'info-active': !infoNav}">头像设置</span>
    </div>
    <div v-show="infoNav" class="basic-info">
      <el-form label-width="80px" :label-position="labelPosition">
        <!-- @submit.native.prevent="saveBasicInfo" -->
        <el-form-item class="form-item" label="姓名">
          <el-input v-if="formShow" class="nickname" v-model="basicInfo.name"></el-input>
          <div v-else class="nickname">
            <template v-if="!basicInfo.name">- -</template>
            <template>{{basicInfo.name}}</template>
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="性别">
          <el-radio-group v-if="formShow" v-model="basicInfo.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
          <div v-else class="sex">
            <template v-if="!basicInfo.sex">- -</template>
            <template v-else>{{basicInfo.sex}}</template>
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="出生日期">
          <el-date-picker
            v-if="formShow"
            v-model="basicInfo.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >></el-date-picker>
          <div v-else class="birthday">
            <template v-if="!basicInfo.birthday">- -</template>
            <template>{{basicInfo.birthday|moment('YYYY-MM-DD')}}</template>
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="职业">
          <el-input v-if="formShow" class="occup" v-model="basicInfo.occupation"></el-input>
          <div v-else class="occup">
            <template v-if="!basicInfo.occupation">- -</template>
            <template>{{basicInfo.occupation}}</template>
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="所在地">
          <div v-if="formShow" class="location">
            <div class="provice">
              <el-select
                @visible-change="fetchProvice"
                @change="choseProv"
                v-model="choseLocation.provice"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in provCity.provice"
                  :key="item.cityname"
                  :label="item.cityname"
                  :value="item.cityname"
                ></el-option>
              </el-select>
            </div>
            <div class="city">
              <el-select
                @visible-change="fetchCity"
                @change="choseCity"
                v-model="choseLocation.city"
                placeholder="请选择"
                :disabled="!choseLocation.provice"
              >
                <el-option
                  v-for="(item,index) in provCity.city"
                  :key="index"
                  :label="item.cityname"
                  :value="item.cityname"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div v-else class="location">
            <template v-if="!basicInfo.location">- -</template>
            <template>{{basicInfo.location}}</template>
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="邮箱">
          <el-input v-if="formShow" class="email" v-model="basicInfo.email"></el-input>
          <div v-else class="email">
            <template v-if="!basicInfo.email">- -</template>
            <template>{{basicInfo.email}}</template>
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="个性签名">
          <el-input v-if="formShow" class="perSig" v-model="basicInfo.per_sig"></el-input>
          <div v-else class="perSig">
            <template v-if="!basicInfo.per_sig">- -</template>
            <template v-else>{{basicInfo.per_sig}}</template>
          </div>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button @click="formShow = !formShow" v-if="!formShow" type="primary">编辑</el-button>
          <template v-else>
            <el-button type="success" @click="saveBasicInfo">保存</el-button>
            <el-button @click="formShow = !formShow" type="info">取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="!infoNav" class="avator-info">
      <div class="avator now-head">
        <div class="text">当前头像</div>
        <div class="img">
          <p>如果您还没有设置自己的头像，系统会显示为默认头像，您需要自己上传一张新照片来作为自己的个人头像</p>
          <img v-if="basicInfo.avatar" :src="'http://localhost:3000/'+basicInfo.avatar" />
        </div>
      </div>
      <div class="avator now-head">
        <div class="text">设置当前头像</div>
        <div class="img">
          <p>请选择一个新照片进行上传编辑</p>
          <div class="upload">
            <el-upload
              class="quill-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :data="{id: basicInfo.id}"
              :on-success="avatarImgSucc"
            ></el-upload>
            <div class="picture" @click="avatarFn">
              <img src="../assets/images/avatar_upload.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "../eventBus";
export default {
  data() {
    return {
      labelPosition: "left",
      infoNav: true, //nav切换
      provCity: {
        provice: ["河南省", "湖北省", "浙江省", "辽宁省"],
        city: ["XX市", "XX市", "XX市", "XX市", "XX市", "XX市"]
      },
      choseLocation: {
        provice: null,
        city: null
      },
      formShow: false, //表单编辑状态
      basicInfo: {
        name: null, //姓名
        sex: "1", //性别
        birthday: null, //生日
        occupation: null, //职业
        email: "", //邮箱
        location: "",
        per_sig: "", //个性签名
        avatar: "" //头像
      },
      cityLoad: [true, true]
    };
  },
  methods: {
    //头像上传
    avatarFn() {
      //触发el-upload的input 上传图片
      document.querySelector(".quill-uploader input").click();
    },
    //头像上传成功
    avatarImgSucc(response, file, fileList) {
      this.basicInfo.avatar = "uploads/" + response.filename;
      this.$emit("avatar", this.basicInfo);
    },
    //获取用户基本信息
    async fetchBasicInfo() {
      let id = this.$route.params.id;
      let { data } = await this.$http.post(`/basicInfo`, {
        token: localStorage.token
      });
      this.basicInfo = data.data[0];
      if (this.location) {
        this.choseLocation.provice = this.basicInfo.location.split(" ")[0];
        this.choseLocation.city = this.basicInfo.location.split(" ")[1];
      }
      this.$emit("avatar", this.basicInfo);
      eventBus.$emit("isLogin", {
        isLogin: true,
        basicInfo: this.basicInfo
      });
    },
    //选择省份
    choseProv(val) {
      this.choseLocation.provice = val;
      this.choseLocation.city = "";
      this.cityLoad[1] = true;
    },
    //选择城市
    choseCity(val) {
      this.choseLocation.city = val;
      this.basicInfo.location = `${this.choseLocation.provice} ${this.choseLocation.city}`;
    },
    //获取省份
    async fetchProvice(val) {
      if (val && this.cityLoad[0]) {
        let { data } = await this.$http.get("/provice");
        this.provCity.provice = data.data;
      }
      this.cityLoad[0] = false;
    },
    //获取城市
    async fetchCity(val) {
      if (val && this.cityLoad[1]) {
        let prov = this.provCity.provice.find(
          item => item.cityname === this.choseLocation.provice
        );
        let { data } = await this.$http.get(`/city?id=${prov.id}`);
        this.provCity.city = data.data;
      }
      this.cityLoad[1] = false;
    },
    //保存用户个人信息
    async saveBasicInfo() {
      // this.formShow = !this.formShow;
      let res = await this.$http.put("/basicInfo", this.basicInfo);
      if (res.data.state === 1) {
        this.$message.success("保存成功");
        this.formShow = !this.formShow;
      } else {
        this.$message.error("保存失败");
      }
    },
    editor() {
      this.formShow = !this.formShow;
    }
  },
  created() {
    this.fetchBasicInfo();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_varibles.scss";
.basic-container {
  .info-nav {
    span {
      cursor: pointer;
      font-size: 16px;
      color: silver;
      &:nth-child(1) {
        padding-right: 30px;
        border-right: 1px solid silver;
        margin-right: 30px;
      }
      &.info-active {
        color: #6a6a6a;
        font-weight: 600;
      }
    }
  }
  .basic-info {
    .form-item {
      margin-top: 20px;
      .nickname {
        width: 500px;
      }
      .occup {
        width: 500px;
      }
      .email {
        width: 500px;
      }
      .location {
        display: flex;
        .provice {
          margin-right: 20px;
        }
      }
    }
  }
  .avator-info {
    .avator {
      color: #929292;
      display: flex;
      margin: 50px 0 50px;
      .text {
        width: 100px;
      }
      .img {
        img {
          margin-top: 25px;
          width: 243px;
          height: 243px;
          border-radius: 121.5px;
        }
        .picture {
          width: 243px;
          height: 243px;
          border: 2px solid #dcdcdc;
          border-radius: 50%;
          margin-top: 20px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>