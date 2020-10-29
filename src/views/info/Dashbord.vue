<template>
    <div class="dashbord">
        <el-row :gutter="20">
            <el-col :span="15" class="col-box">
                <div class="grid-content bg-purple">
                    <el-col :span="6">
                        <h1>{{visiting}}</h1>
                        <p>访问量</p>
                    </el-col>
                    <el-col :span="6">
                        <h1>{{product_count}}</h1>
                        <p>产品数</p>
                    </el-col>
                    <el-col :span="6">
                        <h1>{{news_count}}</h1>
                        <p>新闻数</p>
                    </el-col>
                    <el-col :span="6">
                        <h1>{{user_count}}</h1>
                        <p>管理员人数</p>
                    </el-col>
                </div>
            </el-col>
            <!-- <el-col :span="7" class="col-box">
                <div class="grid-content bg-purple"></div>
            </el-col> -->

            <el-col :span="15" class="col-box">
                <div class="grid-content bg-purple">
                    <div class="user-info-box">
                        <h2>登录日志</h2>
                        <div class="user_info_text">
                        <el-form label-position="right" label-width="100px">
                            <el-form-item v-for="(val,key) in login_log" :key="key">
                                {{ val.title }}
                            </el-form-item>
                        </el-form>
                    </div>
                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="7" class="col-box">
                <div class="grid-content bg-purple">

                </div>
            </el-col> -->

        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                login_log:[],
                listQuery: {
                    currPage: 1,
                    pageSize: 7,
                    // importance: undefined,
                    title: '',
                    // type: null, //类型
                },
                product_count:0,
                news_count:0,
                user_count:0,
                visiting:0,
                count:0,
            }
        },
        async created() {
            this.getList();
            this.getCount('news',(receive,data)=>{receive = data},this.product_count);
            this.getCount('news',this.callback,this.news_count);
            console.log(this.product_count)
        },
        methods: {
            async getList() {
                const result = await axios.get(this.global.api_host+'/home/getLoginLog', {
                    params:{currentPage:this.listQuery.currPage,pageSize:this.listQuery.pageSize}
                }).then((response) => {
                    return response.data
                }).catch((err) => {
                    console.log(err)
                })
                let login_log = result.data
                login_log.forEach((val,key) => {
                    let timestamp = val.u_logintime
                    var newDate = new Date();
                    newDate.setTime(timestamp * 1000);
                    this.login_log.push({title : val.nickname+'在'+newDate.toLocaleString()+'登录了系统IP:'+val.u_loginip});
                    // console.log(this.login_log)
                });
                this.count = result.count
                // console.log(this.login_log)

            },
            getCount(){
                axios.get(this.global.api_host+'/product/getDashbordCount').then((response) => {
                    console.log(response.data);
                    this.news_count = response.data.news_count.count;
                    this.product_count = response.data.product_count.count;
                    this.user_count = response.data.user_count.count;
                    this.visiting = response.data.visiting[0].s_value
                }).catch((err) => {
                    console.log(err)
                })
            },
            callback(a,b){
                a=b;
            }
        },
    }
</script>
<style lang="stylus">
    body {
        // background-color #EEEEEE
    }

    .dashbord h1 {
        font-size 50px;
    }

    .dashbord p {
        font-size 16px;
        color #606266;
    }

    .dashbord .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .dashbord .col-box {
        border-radius: 4px;
        background-color #fff;
        box-sizing border-box;
        padding-bottom 40px;
        margin 20px 1%;
        box-shadow: #bbb 0px 0px 5px;
    }

    .dashbord .bg-purple-dark {
        background: #99a9bf;
    }

    .dashbord .bg-purple {
        background: #fff;
    }

    .dashbord .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .dashbord .user-info-box {
        /*padding-bottom: 20px;*/
        // border: 1px solid #dee1e2;

        h2 {
            position relative;
            text-align left;
            font-size: 25px;
            margin: 0;
            font-weight: normal;
            padding: 10px 20px;
            border-bottom: 1px solid #dee1e2;

            .i_edit {
                float: right;
                font-size: 16px;
                color: #7ab8ed;
            }
        }
    }
</style>