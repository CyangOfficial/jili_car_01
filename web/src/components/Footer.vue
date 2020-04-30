<template>
  <div class="footer d-flex ai-center flex-column">
    <div class="friendlinks-wraper d-flex jc-between">
      <div class="friendlinks">
        <div class="text-wathet tit">品牌天地</div>
        <div class="text-white links">
          <router-link to="#">集团概念</router-link>
          <router-link to="#">新闻资讯</router-link>
          <router-link to="#">技术品牌</router-link>
          <router-link to="#">企业文化</router-link>
          <router-link to="#">吉利教育</router-link>
          <router-link to="#">集团概念</router-link>
          <router-link to="#">隐私政策</router-link>
        </div>
      </div>
      <div class="friendlinks">
        <div class="text-wathet tit">热门车型</div>
        <div class="text-white links">
          <router-link to="#">博瑞</router-link>
          <router-link to="#">博越</router-link>
          <router-link to="#">帝豪GL</router-link>
          <router-link to="#">帝豪GS</router-link>
          <router-link to="#">全新帝豪</router-link>
          <router-link to="#">全新远景</router-link>
        </div>
      </div>
      <div class="friendlinks">
        <div class="text-wathet tit">购车支持</div>
        <div class="text-white links">
          <router-link to="#">预约试驾</router-link>
          <router-link to="#">经销商查询</router-link>
          <router-link to="#">市场活动</router-link>
          <router-link to="#">天猫旗舰店</router-link>
        </div>
      </div>
      <div class="friendlinks">
        <div class="text-wathet tit">国主服务</div>
        <div class="text-white links">
          <router-link to="#">服务活动</router-link>
          <router-link to="#">服务介绍</router-link>
          <router-link to="#">服务站查询</router-link>
          <router-link to="#">精品与零件</router-link>
          <router-link to="#">G-LINK服务</router-link>
          <router-link to="#">备件价格查询</router-link>
          <router-link to="#">动力电池回收网点</router-link>
        </div>
      </div>
      <div class="friendlinks">
        <div class="text-wathet tit">商务合作</div>
        <div class="text-white links">
          <router-link to="#">吉利研发中心访客预约系统</router-link>
          <router-link to="#">研究总院展厅参观网络预约系统</router-link>
          <router-link to="#">吉利汽车招商加盟</router-link>
          <router-link to="#">几何汽车招商加盟</router-link>
          <router-link to="#">吉利招标采购平台</router-link>
        </div>
      </div>
    </div>
    <div class="copyright-wraper text-white d-flex jc-between ai-center">
      <div class="copyright">
        <p>© 2013 浙江吉利控股集团 浙ICP备11045738号-8</p>
        <div>
          <img src="../assets/images/logo.png" />
          <span>中国互联网诚信示范单位</span>
        </div>
      </div>
      <div class="contact">
        <div>
          <i class="iconfont icon-phoneon"></i>
          <span>400-886-9888</span>
        </div>
        <div class="quick-links">
          <span>
            <i class="iconfont icon-lujing"></i>
          </span>
          <span>
            <i class="iconfont icon-xingzhuang"></i>
          </span>
          <span>
            <i class="iconfont icon-icon"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss">
@import "../assets/scss/_varibles.scss";
.footer {
  padding: 12px 0;
  background-color: map-get($colors, "primary-1");
  .friendlinks-wraper {
    width: 75vw;
    .friendlinks {
      .links {
        a {
          display: block;
          color: map-get($colors, "white");
          font-size: 11px;
          line-height: 1.8em;
        }
      }
      .tit {
        margin-bottom: 12px;
      }
    }
  }
  .copyright-wraper {
    width: 75vw;
    margin-top: 50px;
    .copyright {
      font-size: 12px;
      img {
        width: 18px;
        vertical-align: middle;
      }
    }
    .contact {
      font-size: 24px;
      span {
        vertical-align: middle;
      }
      .quick-links {
        span {
          display: inline-block;
          width: 36px;
          height: 36px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
          text-align: center;
          line-height: 36px;
          margin: 5px;
          i {
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
