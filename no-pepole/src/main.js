import Vue from 'vue'
import App from './App.vue'

//引入配置路由、使用路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//引入AJAX请求插件，vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

//获取桌号
// console.log(window.location.hash.split('=')[1])
var roomid = window.location.hash.split('=')[1] ||'001' ;
import Storage from './assets/model/storage.js';
Storage.set('roomid',roomid);

//引入vue-socket.io 并使用
import VueSocketIo from 'vue-socket.io';
Vue.use(VueSocketIo,'http://a.itying.com?roomid='+roomid);

//1、创建引入组件
import start from './components/Start.vue';
import Search from './components/Search.vue';
import Pcontent from './components/Pcontent.vue';
import Order from './components/Order.vue';
import Hot from './components/Hot.vue';
import Home from './components/Home.vue';
import Cart from './components/Cart.vue';
import EditUserInfo from './components/EditUserInfo.vue';

//2、配置路由
const routes = [
  {path:'/start',component:start},
  {path:'/search',component:Search},
  // {path:'/pcontent/:id',component:Pcontent},
  {path:'/pcontent',component:Pcontent},
  {path:'/order',component:Order},
  {path:'/hot',component:Hot},
  {path:'/home',component:Home},
  {path:'/cart',component:Cart},
  {path:'/edituserinfo',component:EditUserInfo},
  {path:'*',redirect:'/start'}
];

//3、实例化路由
const router = new VueRouter({routes});

//4、挂载
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

//5、需要将 <router-view></router-view> 放在根组件当中

