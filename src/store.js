import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    user:{},
  },
  mutations: {
    //设置vuex的token
    settoken(state,token){
      state.token = token
    },
    setuser(state,user){
      state.user = user
      // console.log(user)
      // console.log(JSON.stringify(state.user))
      if(user!=''){
        window.localStorage.setItem("user",JSON.stringify(user));
      }
    },
  },
  
  actions: {
    // 邮箱登录
    LoginByEmail({ commit }, userInfo) {
      //const email = userInfo.email.trim();


      //
      return new Promise((resolve, reject) => {
        console.log('登录入参：',userInfo)
        global.get( api.login,{params:userInfo}, function(res){
            //登录接口，可只返回token 和 uid 。然后可根据uid 查询用户信息
               console.log('-------获取到登录返回信息：',JSON.stringify(res) )
               if(res.body.resultCode == 0){
                    var res = res.body.data;

                    // 按一天8小时工作制设置过期时间
                      Cookies.set('userToken', res.token,{ expires: 1/3}); //设置token
                      Cookies.set('userId', res.uid,{ expires: 1/3}); //设置用户id，

                      commit('SET_TOKEN', res.token);
                      //设置userInfo
                      //commit('SET_USERINFO', res); //此处也可省略，放在getUserInfo中统一处理


                      resolve();
               }else{
                    //alert(res.body.resultMsg)
                    Message({
                        showClose: true,
                        message: res.body.resultMsg,
                        type: 'error'
                    });
               }
                
        },function(res){
            reject(res);
        })

        return false;

      });
    },
  }
})
