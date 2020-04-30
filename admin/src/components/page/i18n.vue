<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="container">
      <span>{{$t('i18n.tips')}}</span>
      <el-button type="primary" @click="$i18n.locale = $i18n.locale === 'zh' ? 'en' : 'zh'">{{$t('i18n.btn')}}</el-button>
      <h2>{{$t('i18n.title1')}}</h2>
      <p>{{$t('i18n.p1')}}</p>
      <p>{{$t('i18n.p2')}}</p>
      <p>{{$t('i18n.p3')}}</p>
      <h2>{{$t('i18n.title2')}}</h2>
      <i18n path="i18n.info" tag="p">
        <a
          place="action"
          href="https://element.eleme.cn/2.0/#/zh-CN/component/i18n"
        >{{$t('i18n.value')}}</a>
      </i18n>
    </div>
  </div>
</template>
<script>
import breadCrumb from "./breadcrumb";
export default {
  components: {
    breadCrumb
  }
};
</script>
<style>
p {
  line-height: 40px;
}
</style>


