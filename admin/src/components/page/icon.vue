<template>
    <div class="">
        <bread-crumb></bread-crumb>
        <div class="container">
            <h2>ElementUi图标库</h2>
            <div class="search">
                <el-input size="large" v-model="keywords" placeholder="图标搜索"></el-input>
            </div>
            <ul class="list">
                <li v-for="item in list" :key="item" :class="`el-icon-${item}`">
                    <span>{{item}}</span>
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
            keywords: '',
            iconList: [
                'platform-eleme',
                'eleme',
                'delete-solid',
                'delete',
                's-tools',
                'setting',
                'user-solid',
                'user',
                'phone',
                'phone-outline',
                'more',
                'more-outline',
                'star-on',
                'star-off',
                's-goods',
                'goods',
                'warning',
                'warning-outline',
                'question',
                'info',
                'remove',
                'circle-plus',
                'success',
                'error',
                'zoom-in',
                'zoom-out',
                'remove-outline',
                'circle-plus-outline',
                'circle-check',
                'circle-close',
                's-help',
                'help',
                'minus',
                'plus',
                'check',
                'close',
                'picture',
                'picture-outline',
                'picture-outline-round',
                'upload',
                'upload2',
                'download',
                'camera-solid',
                'camera',
                'video-camera-solid',
                'video-camera',
                'message-solid',
                'bell',
                's-cooperation',
                's-order',
                's-platform',
                's-fold',
                's-unfold',
                's-operation',
                's-promotion',
                's-home',
                's-release',
                's-ticket'
            ]
        }
    },
    computed: {
        list() {
            return this.iconList.filter( item =>{
                return item.includes(this.keywords);
            })
        }
    },
}
</script>
<style>
.search {
    width: 200px;
    margin-top: 20px;
}
.list {
    display: flex;
    flex-wrap: wrap;
    font-size: 50px;
    color: rgb(105, 105, 105);
    padding: 0 10px;
}
.list li {
    width: 100px;
    margin: 18px;
    text-align: center;
}
.list li span {
    font-size: 14px;
    display: block;
    margin-top: 5px;
}
</style>


