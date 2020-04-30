<template>
  <div class="header">
    <div class="top d-flex ai-center jc-between">
      <router-link to="/" tag="div">
        <img src="../assets/images/20190214logo2.png" class="logo" />
      </router-link>
      <ul class="list d-flex">
        <li @click="subDown($event,0)">
          <span class="list-tit">车型总览</span>
          <i class="iconfont icon-down"></i>
          <div :style="`height: ${subMenus[0].height}%`" class="submenu cars">
            <div class="menu-wrapper">
              <div class="close" @click="closeHandle">
                <i class="iconfont icon-close-hei"></i>
              </div>
              <div class="cars-tit">搜索车型</div>
              <div class="search-form">
                <div class="form-item price-block">
                  <div class="form-item-tit">价格（元）：</div>
                  <div class="slider-horizontal">
                    <div class="slider-track"></div>
                  </div>
                </div>
                <div class="form-item d-flex">
                  <div class="form-item-tit">结构：</div>
                  <div class="check-list d-flex">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>全部</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>SUV</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>MPV</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>新能源</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>两厢</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>三厢</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-item d-flex">
                  <div class="form-item-tit">车系：</div>
                  <div class="check-list d-flex flex-wrap">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>全部</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>缤系</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>博瑞</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>博越</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>帝豪</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>金刚</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>远景</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>嘉际</span>
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span>星系</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <GeminiScrollbar class="my-scroll-bar">
                <div class="cars-list">
                  <ul class="d-flex flex-wrap">
                    <li v-for="(item,i) in cars" :key="i">
                      <div class="car-tit">{{item.car_name}}</div>
                      <div class="car-desc">官方指导价：{{item.offical_price | currency}}</div>
                      <div class="car-img">
                        <img class="w-100" :src="item.head_img_url" />
                      </div>
                      <div class="more d-flex flex-wrap">
                        <div class="iconfont icon-success success"></div>
                        <div class="more-left">
                          <div class="car-tit">{{item.car_name}}</div>
                          <div class="car-desc">官方指导价：{{item.offical_price | currency}}</div>
                          <div class="car-img">
                            <img class="w-100" :src="item.head_img_url" />
                          </div>
                        </div>
                        <div class="more-right">
                          <ul>
                            <li>
                              <label>外形尺寸</label>
                              <span class>{{item.car_size ? item.car_size : '-'}}</span>
                            </li>
                            <li>
                              <label>发动机</label>
                              <span>{{item.car_engine ? item.car_engine : '-'}}</span>
                            </li>
                            <li>
                              <label>轴距</label>
                              <span>{{item.car_wheelbase ? item.car_wheelbase : '-'}}</span>
                            </li>
                            <li>
                              <label>变速箱</label>
                              <span>{{item.car_trans_case ? item.car_trans_case : '-'}}</span>
                            </li>
                            <li>
                              <label>百公里耗油</label>
                              <span>{{item.car_km_fuel_consumption ? item.car_km_fuel_consumption : '-'}}</span>
                            </li>
                          </ul>
                        </div>
                        <div class="more-info text-center w-100">
                          <router-link class="appoin" to="/">
                            <i class="iconfont icon-ios-shijian"></i>
                            <span>快速预约</span>
                          </router-link>
                          <router-link class="info" :to="`/order/${item.id}`">
                            <i class="iconfont icon-51"></i>
                            <span>了解详情</span>
                          </router-link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </GeminiScrollbar>
            </div>
          </div>
        </li>
        <li @click="subDown($event,1)">
          <span class="list-tit">品牌天地</span>
          <i class="iconfont icon-down"></i>
          <div :style="`height: ${subMenus[1].height}px`" class="submenu submenu-item">
            <div class="menu-wrapper d-flex">
              <div class="close" @click="closeHandle">
                <i class="iconfont icon-close-hei"></i>
              </div>
              <div class="menu-tit">
                <span class="tit">品牌天地</span>
                <span class="tit-2">进入品牌天地</span>
              </div>
              <ul class="menu-list flex-1 d-flex jc-between">
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/集团概述.jpg" />
                    </div>
                    <span>
                      集团概述
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                  <div class="suport-items">
                    <router-link tag="span" to="/">吉利大事记</router-link>
                  </div>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/news">
                    <div class="img">
                      <img class="w-100" src="../assets/images/新闻资讯.jpg" />
                    </div>
                    <span>
                      新闻资讯
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                  <div class="suport-items">
                    <router-link tag="span" to="/">新闻资讯</router-link>
                    <router-link tag="span" to="/">视频集锦</router-link>
                  </div>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/技术品牌.jpg" />
                    </div>
                    <span>
                      技术品牌
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                  <div class="suport-items">
                    <router-link tag="span" to="/">高效动力技术</router-link>
                    <router-link tag="span" to="/">人体安全技术</router-link>
                    <router-link tag="span" to="/">智慧互联车行技术</router-link>
                    <router-link tag="span" to="/">健康生态技术</router-link>
                    <router-link tag="span" to="/">智能驾驶技术</router-link>
                  </div>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/品牌天地.png" />
                    </div>
                    <span>
                      品牌天地
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                  <div class="suport-items">
                    <router-link tag="span" to="/">企业文化</router-link>
                    <router-link tag="span" to="/">吉利教育</router-link>
                    <router-link tag="span" to="/">社会责任</router-link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li @click="subDown($event,2)">
          <span class="list-tit">购车支持</span>
          <i class="iconfont icon-down"></i>
          <div :style="`height: ${subMenus[2].height}px`" class="submenu submenu-item">
            <div class="menu-wrapper d-flex">
              <div class="close" @click="closeHandle">
                <i class="iconfont icon-close-hei"></i>
              </div>
              <div class="menu-tit">
                <span class="tit">购车支持</span>
                <span class="tit-2">让您的购车体验更舒适</span>
              </div>
              <ul class="menu-list flex-1 d-flex flex-wrap">
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/预约试驾.jpg" />
                    </div>
                    <span>
                      预约驾驶
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/经销商查询.jpg" />
                    </div>
                    <span>
                      经销商查询
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/市场活动.jpg" />
                    </div>
                    <span>
                      市场活动
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/天猫旗舰店.jpg" />
                    </div>
                    <span>
                      天猫旗舰店
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/dkh.jpg" />
                    </div>
                    <span>
                      大客户购车
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/车主服务.jpg" />
                    </div>
                    <span>
                      车主服务
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/ershouche.jpg" />
                    </div>
                    <span>
                      二手车服务
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <router-link to="/shop">
            <span>官方商城</span>
          </router-link>
        </li>
        <li @click="subDown($event,3)">
          <span class="list-tit">商务合作</span>
          <i class="iconfont icon-down"></i>
          <div :style="`height: ${subMenus[3].height}px`" class="submenu submenu-item">
            <div class="menu-wrapper d-flex">
              <div class="close" @click="closeHandle">
                <i class="iconfont icon-close-hei"></i>
              </div>
              <div class="menu-tit">
                <span class="tit">商务合作</span>
                <span class="tit-2">进入商务合作</span>
              </div>
              <ul class="menu-list flex-1 d-flex flex-wrap">
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/吉利汽车招商.jpg" />
                    </div>
                    <span>
                      吉利汽车招商加盟
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/jiheA.jpg" />
                    </div>
                    <span>
                      几何汽车招商加盟
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/1.jpg" />
                    </div>
                    <span>
                      吉利研发中心访客预约系统
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/2.jpg" />
                    </div>
                    <span>
                      研究总院展厅参观网络预约系统
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li @click="subDown($event,4)">
          <span class="list-tit">吉行天下</span>
          <i class="iconfont icon-down"></i>
          <div :style="`height: ${subMenus[4].height}px`" class="submenu submenu-item">
            <div class="menu-wrapper d-flex">
              <div class="close" @click="closeHandle">
                <i class="iconfont icon-close-hei"></i>
              </div>
              <div class="menu-tit">
                <span class="tit">吉行天下</span>
                <span class="tit-2">愿我们长久相伴！</span>
              </div>
              <ul class="menu-list flex-1 d-flex flex-wrap">
                <li>
                  <router-link tag="div" class="link" to="/club">
                    <div class="img">
                      <img class="w-100" src="../assets/images/club_home.jpg" />
                    </div>
                    <span>
                      吉天天下首页
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/club_quanzi.jpg" />
                    </div>
                    <span>
                      圈子
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/club_activity.jpg" />
                    </div>
                    <span>
                      活动
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/club_youjuhui.jpg" />
                    </div>
                    <span>
                      友聚惠
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/club_jishe.jpg" />
                    </div>
                    <span>
                      吉行驿站
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link tag="div" class="link" to="/">
                    <div class="img">
                      <img class="w-100" src="../assets/images/club_mall.jpg" />
                    </div>
                    <span>
                      吉币商城
                      <i class="iconfont icon-right"></i>
                    </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div class="login">
        <div class="unLogin" v-if="!isLogin">
          <router-link to="/registerorsginIn/login">登录</router-link>
          <router-link to="/registerorsginIn/register">注册</router-link>
        </div>
        <div class="login-box" v-else>
          <div class="avatar">
            <img :src="'http://localhost:3000/'+basicInfo.avatar" />
          </div>
          <div class="username">
            <span class="user-name">{{basicInfo.username}}</span>
          </div>
          <ul class="slide-down">
            <li>
              <img
                class="icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAYAAAClI5npAAAACXBIWXMAAAsSAAALEgHS3X78AAACdklEQVRYhcWYwZXaQAyGP/JyJx0sHZgO8B58ZyuADuJUYLsDl2AqCHdfTAdMB9BBtgJyGAkbZ8b2sBB02TdG+vWPpJH0dna5XHilfHupd+B7iHKU1QsgBWIg6v18AI5AaYrkNBVzNiUFUVb/AEpgMxF3B6SmSP6MKY6mIMrqJfZm6vwM/ALeTZHMTJHMgHf5dhadDXAU20EZjIAANMAc+MTeqhohvMVGS21iUyTHYAIS9gab61GgAeJGbJ3pGEpBeo9zANGNxTYSLKc4Ccjt1agMcd4jUcoxFcxpBIA1bQ5Lj84UKQVjLpiTCWj17qc8JZ+I7b6HGUQgOPQOUYwgAn3jRxBwyhgBZ+EEyiCGj4DmfbSTTRDFCOoDGjZn5QaKYjQhBLRyoyir43s9i61Ozb1Lx0lAmshBjvm9BDq2B9+IHipCNV5FWV2FehablRzDWjGAKZIGKOS4CSEhujq+i7umoQfsDOS+kSyjOAfe5NPOFMl2CH/qRpQK8Fw+fWJfSiPnGPvcur/npkhG58jUnbACFsBPOc+x+V0N6FdTgMc2Ih3LKe3toI1AV5YOnRI7zr0DbWgjWmLfrubzLOfKV1Riswa2Pbu1z8ZJwLHXlaZIct8tPGRy2sh598l/CERZvQZ+y9EI+1OI8w7WAhs17YYfpkhuOuINgZBlMoDE4HLbb0TVI53DdSuKBXNO73VcCUjeNVTbRzjvkdiqK/F1S4C29w+2zi+QONK2dvVlCUjh6bP5yhY8Jor9Jj6vEdClYffI0PdFsHddn0oglr/Ns5x3RJ9h3CWg4f8fBLS+3roEztjwn57tXXwcsM9y2jh+prz8f0R/AddTFxou3WpXAAAAAElFTkSuQmCC"
              />
              <span class="text" @click="$router.push('/personalProfile')">个人中心</span>
            </li>
            <li>
              <img
                class="icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAYAAAClI5npAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM3MzhGMDRGODk2QjExRTg4MjM4OTJGMTE4MTM0MkYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM3MzhGMDUwODk2QjExRTg4MjM4OTJGMTE4MTM0MkYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzczOEYwNEQ4OTZCMTFFODgyMzg5MkYxMTgxMzQyRjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzczOEYwNEU4OTZCMTFFODgyMzg5MkYxMTgxMzQyRjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7dge/iAAACQUlEQVR42uyYT0gUcRTHm5zN7R9EKGRQUNHBLkEnL0FBfw4idCn6A6WkSWxQEHhYRAmCCIrs4EUIEoTwUgcvQZeiiycjkSikLlaIYlYUtbU2fh58F5bY2GaZ3lz6wYc3DDu/95037715s0EURSvSXGHpYHf/owCzBy5DC2Tg12+/Xwf3IP/8ysHPiQnAeR3mLNyGbJVrtpQLTyoCO+GWnC/AA/hYwVE9jMO3pAV0wxp4CycJ71OvHFgpuw+W7M49nZcLyErAnHcVlASUsr0uLQGprdQFhP9iU/rKRkwPbIc+EvuldwSsWbXBUbiBoCZvAS9gTMetcFNR8RFAyH9i+mFIp04oEhvckhARBcxFGNGpDhOFiLVuVYCI75hOGNWpS3AVEavdylCRaIe7EElEHhGZmsqQCw9hdkGgDast+53NDh/gE1ge9MIsDIYxnW/CDEBzAsG5FluAZoQp3UXxLyNQ/q7ZDKvKSjVeDiipjmuAadajqArXbbMyhIK2moFTNeUAm9ndfI356I6pL6yX8yPs89qlCnDeqrxphHdwGucTLmWI870adJtUCedx/tilEcn5HdgBX+AczsdcWjHOt9prWMlqOXMB56Oeb0Pr9w06zuF82HUgYb2CM2A9/5n7RKRSnfw/lMYREMhGaQmIJCJMS8C0/g84QA1nPQUE9g8JTg9z/FBN44m9p2G+QkTs0+29lRmZXkzyw8T687Bqd7/407oPXZpwknkEmttycB3eaHRarMAP2aVEH0Gaa1mAAQDnYqs8pjTMYQAAAABJRU5ErkJggg=="
              />
              <span class="text">退出账户</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="sublist"></div>
  </div>
</template>

<script>
import eventBus from "../eventBus";
export default {
  name: "Head",
  data() {
    return {
      subMenus: [
        { height: 0, open: false },
        { height: 0, open: false },
        { height: 0, open: false },
        { height: 0, open: false },
        { height: 0, open: false }
      ],
      heights: [100, 270, 330, 220, 330],
      page: -1,
      flag: false,
      cars: [],
      isLogin: false,
      basicInfo: {}
    };
  },
  methods: {
    closeHandle() {
      console.log(123)
      this.subMenus.filter(item => {
        item.height = 0;
        item.open = false;
      });
      this.page = -1;
      this.flag = false;
    },
    subDown(ev, n) {
      if (
        ev.target.classList[0] != "list-tit" &&
        ev.target.tagName[0] != "iconfont"
      ) {
        return;
      }
      this.page = n;
      if (n === this.page && this.subMenus[n].open) {
        this.$set(this.subMenus, n, {
          height: 0,
          open: false
        });
        this.flag = false;
      } else {
        this.subMenus.filter((item, index) => {
          if (this.page !== index) {
            item.height = 0;
            item.open = false;
          }
        });
        if (!this.flag) {
          this.$set(this.subMenus, n, {
            height: this.heights[n],
            open: true
          });
          this.flag = true;
        } else {
          setTimeout(() => {
            this.$set(this.subMenus, n, {
              height: this.heights[n],
              open: true
            });
          }, 300);
        }
      }
    },
    async fetchCars() {
      let { data } = await this.$http.get("/headCars");
      this.cars = data;
      // console.log(data)
    },
    loginFn() {
      eventBus.$on("isLogin", obj => {
        this.isLogin = obj.isLogin;
        if (obj.basicInfo) {
          this.basicInfo = obj.basicInfo;
        }

        console.log(obj);
      });
    }
  },
  created() {
    console.log('created');
    this.fetchCars();
    this.loginFn();
  },
  beforeDestroy(){
    this.loginFn();
    // console.log(this.isLogin);
  },
  watch: {
    $route(to, from) {
      console.log('触发 route');
      console.log('to:'+to,'from:'+from);
      this.closeHandle();
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/varibles";
.header {
  position: fixed;
  left: 0;
  top: 0;
  // margin-bottom: 50px;
  z-index: 10;
  background: #fff;
  width: 100vw;
  .top {
    height: 50px;
    padding: 0 12px;
    .list {
      & > li {
        padding: 0 12px;
        // cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
        span {
          user-select: none;
          // cursor: pointer;
        }
        .submenu {
          position: fixed;
          top: 50px;
          left: 0;
          width: 100%;
          background: #fff;
          z-index: 10;
          transition: 0.3s ease;
          overflow: hidden;
          .menu-wrapper {
            position: relative;
            padding: 0 12.23%;
            .close {
              width: 22px;
              height: 23px;
              text-align: center;
              line-height: 23px;
              position: absolute;
              z-index: 11;
              right: 40px;
              top: 0;
              cursor: pointer;
              i {
                font-size: 16px;
                color: map-get($colors, "gray");
              }
            }
          }
          &.cars {
            height: 100%;
            .cars-tit {
              font-size: 16px;
              font-weight: bold;
              line-height: 40px;
              border-bottom: 1px solid map-get($colors, "gray");
            }
            .search-form {
              margin-top: 20px;
              font-size: 12px;
              border-bottom: 1px solid map-get($colors, "gray-1");
              .form-item {
                margin-bottom: 20px;
                &.price-block {
                  display: none;
                }
                .check-list {
                  .checkbox {
                    margin: 0 0 10px 0;
                    label {
                      cursor: pointer;
                      input {
                        display: none;
                        &:checked {
                          & + span:after {
                            content: "\e6ae";
                            font-family: "iconfont";
                            position: absolute;
                            left: -1px;
                            top: -2px;
                            width: 15px;
                            height: 15px;
                            color: map-get($colors, "primary");
                            font-size: 20px;
                          }
                        }
                      }
                      span {
                        display: inline-block;
                        width: 100px;
                        user-select: none;
                        position: relative;
                        padding-left: 30px;
                        &:before {
                          content: "";
                          position: absolute;
                          left: 0;
                          width: 15px;
                          height: 15px;
                          border-radius: 4px;
                          border: 1px solid map-get($colors, "gray");
                        }
                      }
                    }
                  }
                }
                .form-item-tit {
                  width: 108px;
                }
              }
            }
            .my-scroll-bar {
              height: 400px;
              .cars-list {
                margin-top: 20px;
                height: 400px;
                ul {
                  li {
                    position: relative;
                    width: 170px;
                    margin-bottom: 20px;
                    .car-tit {
                      font-size: 13px;
                      font-weight: bold;
                    }
                    .car-desc {
                      font-size: 10px;
                      color: map-get($colors, "gray-2");
                    }
                    .car-img {
                      width: 130px;
                    }
                    &:hover {
                      .more {
                        display: flex;
                      }
                    }
                    &:nth-child(6n) {
                      .more {
                        left: -215px;
                      }
                    }
                    .more {
                      position: absolute;
                      z-index: 5;
                      left: 0;
                      top: 0;
                      width: 400px;
                      padding: 10px 10px 5px;
                      background: #fff;
                      box-shadow: 2px 2px 2px #ccc, 0 -2px 2px #ccc;
                      display: none;
                      .success {
                        position: absolute;
                        left: 50%;
                        top: -12px;
                        font-size: 18px;
                        color: map-get($colors, "primary");
                      }
                      .more-left {
                        width: 49%;
                      }
                      .more-right {
                        width: 45%;
                        ul {
                          li {
                            line-height: 16px;
                            font-size: 10px;
                            margin: 0;
                            label {
                              color: map-get($colors, "gray-2");
                              display: inline-block;
                              width: 60px;
                            }
                          }
                        }
                      }
                      .more-info {
                        font-size: 10px;
                        a {
                          margin-right: 10px;
                          &.appoin {
                            color: #c79c71;
                            i {
                              font-size: 14px;
                              color: #c79c71;
                            }
                          }
                          &.info {
                            color: map-get($colors, "primary");
                            i {
                              font-size: 14px;
                              color: map-get($colors, "primary");
                            }
                          }
                          i {
                            vertical-align: middle;
                          }
                          span {
                            vertical-align: middle;
                            text-decoration: underline;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          &.submenu-item {
            .menu-wrapper {
              padding-top: 36px;
              padding-bottom: 36px;
              .menu-tit {
                width: 200px;
                height: 120px;
                border-right: 1px solid map-get($colors, "gray");
                margin-right: 40px;
                .tit {
                  display: block;
                  font-size: 16px;
                  font-weight: bold;
                  color: map-get($colors, "primary");
                }
                .tit-2 {
                  display: block;
                  font-size: 13px;
                  margin-top: 15px;
                }
              }
              .menu-list {
                li {
                  margin-right: 36px;
                  margin-bottom: 10px;
                  &:nth-child(4n) {
                    margin-right: 0;
                  }
                  .link {
                    font-size: 12px;
                    cursor: pointer;
                    .img {
                      width: 170px;
                    }
                    span {
                      line-height: 30px;
                      i {
                        font-size: 10px;
                      }
                    }
                  }
                  .suport-items {
                    span {
                      cursor: pointer;
                      display: block;
                      font-size: 10px;
                      color: map-get($colors, "gray-2");
                    }
                  }
                }
              }
            }
          }
        }
      }
      i {
        font-size: 18px;
        color: map-get($colors, "primary");
      }
    }
    .logo {
      width: 120px;
      height: auto;
    }
    .login {
      padding-right: 30px;
      .unLogin {
        a {
          color: map-get($colors, "primary");
          &:hover {
            color: map-get($colors, "primary-1");
          }
        }
      }
      .login-box {
        display: flex;
        align-items: center;
        height: 50px;
        cursor: pointer;
        &:hover {
          .slide-down {
            display: block;
          }
        }
        .avatar {
          margin-right: 15px;
          width: 28px;
          img {
            width: 30px;
            height: 30px;
            border: 2px solid #ccc;
            border-radius: 50%;
            box-sizing: border-box;
          }
        }
        .username {
          position: relative;
          .user-name {
            position: relative;
            margin: 0 20px 0 5px;
            color: #3a86be;
            font-size: 14px;
            &::after {
              content: "";
              position: absolute;
              right: -20px;
              top: 6px;
              border-width: 5px;
              border-style: solid;
              border-color: #2e7eba transparent transparent transparent;
            }
          }
        }
        .slide-down {
          width: 120px;
          border: 1px solid #ccc;
          background: #fff;
          position: absolute;
          right: 30px;
          bottom: -75px;
          display: none;
          padding: 0 10px;
          li {
            padding: 8px 10px;
            display: flex;
            &:nth-child(1) {
              border-bottom: 1px solid #ccc;
            }
            .icon {
              width: 18px;
              height: 20px;
              margin-right: 4px;
            }
            .text {
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>
