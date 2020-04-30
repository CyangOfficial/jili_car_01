<template>
  <div class="table">
    <bread-crumb></bread-crumb>
    <div class="container">
      <el-form
        @submit.native.prevent="saveNews('ruleForm')"
        label-width="80px"
        ref="ruleForm"
      >
      <!-- :rules="rules" -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="newsDetail.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="newsDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="cover">
          <el-upload
            class="cover-uploader"
            action="http://localhost:3000/admin/api/upload"
            :show-file-list="false"
            :on-success="coverImgSucc"
            list-type="picture-card"
          >
            <img v-if="newsDetail.news_pic" :src="newsDetail.news_pic" class="cover" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻正文" prop="content">
          <!-- <vue-editor v-model="newsDetail.content"></vue-editor> -->
          <el-upload
            class="quill-uploader"
            action="http://localhost:3000/admin/api/upload"
            :show-file-list="false"
            :on-success="contentImgSucc"
          ></el-upload>
          <quill-editor
            class="ql-editor"
            ref="myTextEditor"
            v-model="newsDetail.content"
            :options="editorOption"
          ></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">{{id?'保存':'发布'}}</el-button>
          <!-- <el-button type="primary" @click="$router.push('/news/newsEdit/3')">跳转</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import breadCrumb from "./breadcrumb";
import { VueEditor } from "vue2-editor";
import { quillEditor } from "vue-quill-editor";
import moment from "moment";
import toolbarOptions from "../common/toolbarOptions"; //工具栏选项
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  props: ["id"],
  components: {
    breadCrumb,
    VueEditor,
    quillEditor
  },
  data() {
    return {
      page: 1,
      newsDetail: {
        title: "",
        description: "",
        content: "",
        news_pic: "",
        create_time: null,
        mod_time: null
      },
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: 'blur' }],
        description: [{ required: true, message: "描述不能为空", trigger: 'blur' }]
      },
      editorOption: {
        placeholder: "请输入正文",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              //当点击工具栏中的图片(image)时触发事件
              image(value) {
                if (value) {
                  //触发el-upload input 图片上传
                  document.querySelector(".quill-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  methods: {
    //富文本图片上传
    contentImgSucc(res, file, fileList) {
      let quill = this.$refs.myTextEditor.quill; //获取quill元素
      let length = quill.getSelection().index; //获取光标所在的位置
      if (file.response.url) {
        if (file.status === "success") {
          //把图片插入到光标位置
          quill.insertEmbed(length, "image", file.response.url);
        }
      } else {
        this.$message.error("图片插入失败");
      }
    },
    //新闻封面上传
    coverImgSucc(res, file, fileList) {
      this.newsDetail.news_pic = file.response.url;
    },
    //获取新闻内容详情
    async fetchNews() {
      let { data } = await this.$http.get(`/news/content?id=${this.id}`);
      this.newsDetail = data[0];
      console.log(this.newsDetail);
    },
    //新闻保存
    async saveNews(ruleForm) {
      // console.log(this.$refs[ruleForm]);
      // this.$refs[ruleForm].validate(valid => {
      //   console.log(valid);
      // })
      let dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      if (this.id) {
        //编辑新闻
        this.newsDetail.mod_time = dateTime;
        let res = await this.$http.put(`/news?id=${this.id}`, this.newsDetail);
        if (res.data.success) {
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
        }
      } else {
        //发布新闻
        this.newsDetail.create_time = dateTime;
        let res = await this.$http.post(`/news`, this.newsDetail);
        if(res.data.success){
          this.$message.success("发布成功");
        }else {
          this.$message.error("发布失败");
        }
        console.log(res);
      }
    }
  },
  created() {
    this.id && this.fetchNews();
  }
};
</script>
<style lang="scss">
.ql-editor {
  height: 500px;
}

.el-upload {
  min-height: 100px;
  max-width: 300px;
  height: auto;
}
.cover-uploader {
  height: auto;
}
.cover-uploader img {
  width: 100%;
}
</style>


