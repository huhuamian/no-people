<template>
    <div id="pcontent">
      <router-link to="/home">
        <div class="back">返回</div>
      </router-link>
      <div id="p_content">
        <div class="p_info">
          <img :src="api+list.img_url"/>
          <h2>{{list.title}}</h2>
          <p class="price">
            {{list.price}}/份
          </p>
        </div>
        <div class="p_detailt">
          <h3>商品详情</h3>
          <div class="p_content">
            <img :src="api+list.img_url"/>
            <br />
            <p v-html="list.content"></p>
          </div>
        </div>
      </div>
      
      
      <footer class="pfooter">
        <div class="cart">
          <strong>数量</strong>
          <div class="car_num">
            <div class="car_left" @click="subNum()">-</div>
            <div class="car_center">
              <input type="text" readonly="readonly" v-model="numValue"/>
            </div>
            <div class="car_right" @click="addNum()">+</div>
          </div>
        </div>
        <button class="addCart" @click="addCart()">加入购物车</button>
        
        
      </footer>
        
    </div>
</template>

<script>
import Config from '../assets/model/config.js';
import Storage from '../assets/model/storage.js';
export default {
  data () {
    return {
      api:Config.api,
      list:[],
      numValue:1
    }
  },
  methods:{
    //   请求详情页数据方法
    getDetailData(id){
        // var apiPath = this.api +'api/productcontent?id=5ac1a22011f48140d0002955';//+id;
        var apiPath = this.api +'api/productcontent?id='+id;
        // console.log(apiPath);
        this.$http.get(apiPath).then((response)=>{
            console.log(response);
            this.list = response.body.result[0];
        },(error)=>{
            console.log('详情页数据加载失败'+error);
        })
    },
    //购物车数量增加
    addNum(){
        ++this.numValue;
    },
    //购物车数量减少
    subNum(){
        if(this.numValue > 1){
            --this.numValue;
        }
    },
    // 加入购物车
    addCart(){
        // 获取数据，加入购物车
        var cartPath = this.api + 'api/addcart';
        var objParams = {
            uid:Storage.get('roomid'),                               // 桌号（一个桌子有多位用户，他们的桌号一样） 必传（001 002）
            title:this.list.title,                   // 菜品名称必传
            product_id:this.list._id,                // 菜品id 必传
            img_url:this.api+this.list.img_url,      // 菜品图片必传
            price:this.list.price,                   // list菜品价格必传
            num:this.numValue,                       // 菜品数量必传
            open_id:'666666'                         // 选填
        }
        this.$http.post(cartPath,objParams).then((response)=>{
            console.log(response);
            if(response.body.success){
                //加入购物车成功之后给服务器发送消息
                this.$socket.emit('addcart','addcart');
                //编程式导航返回首页
                this.$router.push({path:'home'});
            }
        },(error)=>{

        })


    }
  },

  mounted(){
    //   动态路由传值
    //   console.log(this.$route.params);

    // get传值
    //   console.log(this.$route.query);
      var id  = this.$route.query.id ;
      
      //请求详情页面数据
      this.getDetailData(id);
  }
}
</script>
<style lang="scss">
@charset "UTF-8";

#p_content{
    width: 100%;
    height: 100%;
    background: #fff;
    .p_info{
        img{
            width: 100%;
            height: 18rem;
        }
        h2{
            font-size: 1.8rem;
            font-weight: 700;
            color: black;
            padding: .5rem;
        }
        .price{
            padding: .2rem .5rem;
            color: red;
        }
    }
    .p_detailt{
        margin-top: 1rem;
        padding: .5rem;
       h3{
            font-size: 2rem;
            font-weight: 700;
            color: black;
       } 
       .p_content{
           img{
               width: 100%;
           }
           p{
               margin-top: 1rem;
               font-size: 1.4rem;
               color: black;
               line-height: 2rem;
           }
       }
    }
}
.back{
    width: 3.8rem;
    height: 3.8rem;
    line-height: 3.8rem;
    text-align: center;
    background: #000000;
    color: #FFFFFF;
    border-radius: 50%;
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
    &:before{
        content:"";
        display:inline-block;
        width: .8rem;
        height: .8rem;
        border-left: .2rem solid #FFFFFF;
        border-bottom:.2rem solid #FFFFFF;
        transform: rotate(45deg);
        margin-top: .2rem;
    }
}

.pfooter{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 4.4rem;
    line-height: 4.4rem;
    border-top: 1px solid #000;
    margin-right: 1rem;
    background: #FFFFFF;
    .cart{
        float: left;
        display: flex;
        strong{
            margin-top: .2rem;
            flex: 1;
            text-align: center;
        }
        .car_num{
            width: 10rem;
            display: flex;
            text-align: center;
            font-size: 2.4rem;
            .car_left,.car_right{
                margin-top: 0.2rem;
                flex:1;
                width: 2.8rem;
                height: 2.8rem;
                border: 1px solid #EEEEEE;
                color: red;
            }
            .car_center{
                flex: 1;
                input{
                    width: 2rem;
                    height: 2.8rem;
                    line-height: 2.8rem;
                    border: none;
                    text-align: center;
                }
            }
        }
        
    }
    .addCart{
        float: right;
        background: red;
        color: #FFFFFF;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        padding:0 .5rem;
        border: none;
        border-radius: .5rem;
        margin: .8rem;
    }
}
</style>

