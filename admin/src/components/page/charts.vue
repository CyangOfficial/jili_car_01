<template>
  <div class="charts">
    <bread-crumb></bread-crumb>
    <div class="container">
      <div class="plugins-tips">
        插件地址：
        <a href="https://v-charts.js.org" target="_blank">v-chart</a>
      </div>
      <ul class="charte-box">
        <li>
          <ve-line :data="chartData"></ve-line>
        </li>
        <li>
          <ve-histogram :data="chartData"></ve-histogram>
        </li>
        <li>
          <ve-bar :data="chartData"></ve-bar>
        </li>
        <li>
          <ve-pie :data="chartData"></ve-pie>
        </li>
        <li>
          <ve-ring :data="chartData"></ve-ring>
        </li>
        <li>
          <ve-funnel :data="chartData"></ve-funnel>
        </li>
      </ul>
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
      chartData: {
        columns: ["日期", "访问量"],
        rows: [
          { 日期: "1月", 访问量: 482 },
          { 日期: "2月", 访问量: 1223 },
          { 日期: "3月", 访问量: 2123 },
          { 日期: "4月", 访问量: 4123 },
          { 日期: "5月", 访问量: 3123 },
          { 日期: "6月", 访问量: 3158 },
          { 日期: "7月", 访问量: 3123 },
          { 日期: "8月", 访问量: 2123 },
          { 日期: "9月", 访问量: 4123 },
          { 日期: "10月", 访问量: 3123 },
          { 日期: "11月", 访问量: 7123 },
          { 日期: "12月", 访问量: 4860 }
        ]
      }
    };
  }
};
</script>
<style>
.charte-box {
  display: flex;
  flex-wrap: wrap;
}
.charte-box li {
  width: 48%;
  margin: 10px;
  border: 2px solid #abcdef;
}
</style>


