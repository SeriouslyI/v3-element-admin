<template>
  <div class="home">
    <el-container>
      <el-aside width="">
        <AsideMenu :isCollapse="isCollapse" @childFn="addTag"></AsideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between" style="width:100%">
            <el-col :span="2">
              <div class="grid-content"><i ref="show_menu" :label="false" class="el-icon-s-fold"
                  style="line-height: 50px;cursor:pointer;font-size: 28px;" @click="showMenu"></i></div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content tag-box">
                <router-link :to="tag.path" v-for="(tag,key) in dynamicTags" :key="key">
                  <el-tag type='info' effect="dark" size="small" closable
                    :disable-transitions="false" @close="handleClose(key)">
                    {{tag.title}}
                  </el-tag>
                </router-link>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <div class="user-box">
                  <span class="user-name">{{user.u_nickname}}</span><span class="avatar-box"><img
                      :src="this.global.resources_host+user.avatar"
                      alt=""></span>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                      <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                      <el-dropdown-item command="editPass">修改密码</el-dropdown-item>
                      <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </el-col>
          </el-row>


        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // @ is an alias to /src
  import AsideMenu from '@/components/AsideMenu.vue'

  export default {
    name: 'home',
    data() {
      return {
        show_menu: true,
        isCollapse: false,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        aside_height:'',
        user:{}
      }
    },
    created() {
      this.user = JSON.parse(window.localStorage.getItem('user'))
    },
    methods: {
      showMenu() {
        this.isCollapse = !this.isCollapse
        if (this.isCollapse === true) {
          this.$refs.show_menu.setAttribute("class", "el-icon-s-unfold")
        } else {
          this.$refs.show_menu.setAttribute("class", "el-icon-s-fold")
        }
      },
      handleClose(key) {
        this.dynamicTags.splice(key, 1);
      },
      addTag(data){
        // console.log(this.dynamicTags.filter(v => v.title == data.title).length);
        if(this.dynamicTags.filter(v => v.title == data.title).length<1){
          this.dynamicTags.push(data);
        }
        
      },
      handleCommand(command){
        if(command != 'logout'){
          this.$router.push({
            path: '/'+command
          })
        }else{
          this.logOut()
        }
      }
    },
    components: {
      AsideMenu
    }
  }
</script>
<style lang="stylus">
  .navbar .fa-bars {
    cursor: pointer;
    float: left;
    padding: 0 15px;
  }

  .user-box {
    width auto;
    height 60px;
    // background-color pink;
    float right;
    text-align right;
    position relative;
    cursor pointer;
    display flex;
  }

  .user-name {
    padding 0 10px;
    font-size 15px;
    color rgb(72, 106, 95);
  }

  .user-box i {
    padding 0 10px;
    line-height 60px;
  }

  .user-box span {
    line-height 60px;
  }

  .avatar-box {
    width 40px;
    height 40px;
    position relative;
    border-radius 50%;
    display inline-block;
    overflow hidden;
    margin-top 10px;
  }

  .avatar-box img {
    position absolute;
    width 100%;
    height 100%;
    left 0;
    top 0;
  }

  .el-tag {
    cursor pointer;
    margin 0 5px;
  }

  .tag-box {
    height: 60px;
    line-height: 60px;
    overflow hidden;
  }
</style>