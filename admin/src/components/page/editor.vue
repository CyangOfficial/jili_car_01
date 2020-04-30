<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="container">
        <div class="plugins-tips">插件地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a></div>
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import breadCrumb from "./breadcrumb";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    breadCrumb,
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "hello world"
      }
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    onEditorChange(event) {
      console.log("onEditorChange");
    }
  }
};
</script>
<style>
.ql-editor{
    height:400px;
}
</style>


