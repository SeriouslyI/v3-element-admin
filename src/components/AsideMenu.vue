<template>
    <div>
        <el-row class="tac">
            <!-- <h5>自定义颜色</h5> -->
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#324157" text-color="#fff;" :default-openeds="opens" :collapse="isCollapse"
                :style="aside_height">
                <el-menu-item index="1">
                    <i class="el-icon-s-home"></i>
                    <span slot="title" @click="go('/')">首页</span>
                </el-menu-item>
                <el-submenu :index="String(key+2)" v-for="(val,key) in menu" :key="key">
                    <template slot="title">
                        <i :class="val.icon"></i>
                        <span slot="title">{{val.title}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="(key+2)+'-'+(k+1)" v-for="(v,k) in val.children" :key="k"
                            @click="addTag(v.title,v.path)">{{v.title}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-row>
    </div>
</template>
<script>
    export default {
        props: ['isCollapse'],
        data() {
            return {
                opens: ['1'],
                aside_height:'',
                menu: [{
                    title: '轮播图管理',
                    icon: 'el-icon-picture',
                    children: [{
                        title: '首页轮播图管理',
                        path: '/homeBannerSetting'
                    }, {
                        title: '工坊轮播图管理',
                        path: '/workshopBannerSetting'
                    }]
                }, {
                    title: '导航一',
                    icon: 'el-icon-location',
                    children: [{
                        title: '选项1',
                        path: '/homeBannerSetting'
                    }, {
                        title: '选项2',
                        path: '/workshopBannerSetting'
                    }, {
                        title: '选项3',
                        path: '/workshopBannerSetting'
                    }, {
                        title: '选项4',
                        path: '/workshopBannerSetting'
                    }]
                }, {
                    title: '系统设置',
                    icon: 'el-icon-user-solid',
                    children: [{
                        title: '权限管理',
                        path: '/homeBannerSetting'
                    }, {
                        title: '登录日志',
                        path: '/workshopBannerSetting'
                    }]
                }]
                // isCollapse: false
            }
        },
        created() {
            this.aside_height = {
                'height': window.screen.availHeight + 'px'
            } //设置aside和main的高度
            // console.log(this.$route.params);
            if (document.documentElement.clientHeight) {
                this.aside_height = {
                    'height': document.documentElement.clientHeight + 'px'
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            addTag(title, path) {
                let arr = {
                    title: title,
                    path: path
                }
                this.$emit('childFn', arr)
                this.go(path)
            },
            go(path) {
                this.$router.push(path)
            }
        }
    }
</script>
<style lang="stylus">
    .el-menu--dark .el-menu-item,
    .el-menu--dark .el-submenu__title {
        color: #bfcbd9;
    }

    .el-submenu__title {
        color #bfcbd9;
        user-select none;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .el-menu-item {
        color #bfcbd9;
        user-select none;
    }

    .el-icon-arrow-down:before {
        color #bfcbd9
    }
</style>