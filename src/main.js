import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import setaxios from './setaxios';
import '../src/assets/style/public.css';
import qs from 'qs';
import global from './global';
import {
  Row,
  Col,
  Button,
  Carousel,
  CarouselItem,
  Container,
  Main,
  Aside,
  Header,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Menu,
  Tree,
  Step,
  Steps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Input,
  Dialog,
  Message,
  Select,
  Option,
  Avatar,
  Tag
} from 'element-ui';

setaxios();
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Menu.name, Menu);
Vue.component(Container.name, Container);
Vue.component(Main.name, Main);
Vue.component(Aside.name, Aside);
Vue.component(Header.name, Header);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Message.name, Message);
Vue.component(Avatar.name, Avatar);
Vue.component(Tag.name, Tag);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);

Vue.prototype.$message = Message
Vue.prototype.$http = axios;
Vue.config.productionTip = false

//路由守卫
router.beforeEach((to, from, next) => {
  // 无论是刷新还是跳转路由，第一个进入的就是这个路由前置钩子函数
  store.commit('settoken', localStorage.getItem('token'))
  if (localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
    store.commit('setuser', '')
  } else {
    store.commit('setuser', JSON.parse(localStorage.getItem('user')))
  }
  // store.commit('setuser',JSON.parse(localStorage.getItem('user')))
  // console.log('守卫')
  if (to.meta.title != undefined) {
    // console.log(to.meta.title);
    store.commit('sethead_title', to.meta.title)
  }
    if (store.state.token) {
      next()
    } else {
      // Message({
      //   showClose: true,
      //   message: '请登录使用',
      //   type: 'error'
      // });
      next({
        path: '/login',
        query:{redirect:to.fullPath}
      })
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
