<template>
    <div id="cart">
      <div class="cart_content">
        <div class="cart_info" v-if="totalNum">
          <h2>购物车</h2>
          <div class="p_number">
            <div class="p_number_left">
              <p>用餐人数：{{orderInfo.p_num}}</p>
              <p>备注：<span v-if="!orderInfo.p_mark">无</span><span v-if="orderInfo.p_mark">{{orderInfo.p_mark}}</span></p>
            </div>
            <div class="p_number_right">
              <router-link to="edituserinfo">
                <img src="../assets/images/edit.png"/>
                <p>修改</p>
              </router-link>
            </div>
            
          </div>
          <div class="cart_number">
            <p>购物车中总共有{{totalNum}}个菜</p>
            <p>合计：<span class="price">￥{{allPrice}}</span></p>
          </div>
        </div>
        
        <div class="cart_list" v-if="totalNum">
          <ul>
            <li class="item" v-for="(item,key) in cartList">
              <div class="left_food">
                <span v-if="item.img_url.startsWith('http')"><img :src="item.img_url"/></span>
                <span v-if="!item.img_url.startsWith('http')"><img :src="'http://a.itying.com/'+item.img_url"/></span>
                <div class="food_info">
                  <p>{{item.title}}</p>
                  <p class="price">￥{{item.price}}</p>
                </div>
              </div>
              <div class="right_cart">
                <div class="car_num">
                  <div class="car_left" @click="subNumber(item,key)">-</div>
                  <div class="car_center">
                    <input type="text" readonly="readonly" v-model="item.num" />
                  </div>
                  <div class="car_right" @click="addNumber(item)">+</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="hot_food">

          <div class="item">
            <h3 class="item_cate">
              热门菜谱
            </h3>
          </div>
          <div class="item_list_outer">
            
            <ul class="item_list">
              <li>
                <div class="inner">
                  <img src="../assets/images/1.jpg"/>
                  <p class="title">
                    大蒜腊肉
                  </p>
                  <p class="price">
                    ￥30
                  </p>
                </div>
              </li>
              <li>
                <div class="inner">
                  <img src="../assets/images/1.jpg"/>
                  <p class="title">
                    大蒜腊肉
                  </p>
                  <p class="price">
                    ￥30
                  </p>
                </div>
              </li>
              <li>
                <div class="inner">
                  <img src="../assets/images/1.jpg"/>
                  <p class="title">
                    大蒜腊肉
                  </p>
                  <p class="price">
                    ￥30
                  </p>
                </div>
              </li>
              <li>
                <div class="inner">
                  <img src="../assets/images/1.jpg"/>
                  <p class="title">
                    大蒜腊肉
                  </p>
                  <p class="price">
                    ￥30
                  </p>
                </div>
              </li>
              <li>
                <div class="inner">
                  <img src="../assets/images/1.jpg"/>
                  <p class="title">
                    大蒜腊肉
                  </p>
                  <p class="price">
                    ￥30
                  </p>
                </div>
              </li>
              <li>
                <div class="inner">
                  <img src="../assets/images/1.jpg"/>
                  <p class="title">
                    大蒜腊肉
                  </p>
                  <p class="price">
                    ￥30
                  </p>
                </div>
              </li>
              <li>
                <div class="inner">
                  <img src="../assets/images/1.jpg"/>
                  <p class="title">
                    大蒜腊肉
                  </p>
                  <p class="price">
                    ￥30
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 购物车数据为空 -->
        <div v-if="!totalNum">
          <v-cartnodata></v-cartnodata>
        </div>
        
      </div>

      
      <v-navfooter></v-navfooter>
      <div v-if="totalNum">
        <div id="footer_book" class="footer_book">
          <img src="../assets/images/menu.png" >
          <p>菜单</p>
        </div>
        <div @click="addOrder()" id="footer_book" class="footer_book fotter_book_order">
          <img src="../assets/images/doorder.png" >
          <p>下单</p>
        </div>
      </div>

    </div>
</template>

<script>
import NavFooter from './public/NavFooter.vue';
import CartNoData from './CartNoData.vue';
import Config from '../assets/model/config.js';
import Storage from '../assets/model/storage.js';
export default {
  data () {
    return {
      api:Config.api,
      cartList:[],
      allPrice:0,
      totalNum:0,
      orderInfo:{}
    }
  },
  sockets:{
    addcart:function(){/*接收服务器广播过来的数据addcart*/
      // 更新购物车列表数据
      this.getCartListData();
    }
  },
  methods:{
    // 获取购物车列表数据
    getCartListData(){
      var requirPath = this.api + "api/cartlist?uid="+Storage.get('roomid') ;
      this.$http.jsonp(requirPath).then((response)=>{
        // console.log(response);
        this.cartList = response.body.result;
        //获取购物车商品总数量及总价
        this.getTotalResult();
      },(error)=>{
        console.log(error);
      })
    },
    //减少购物车列表商品数量
    subNumber(item,key){

      // 将数量同步到后台，后台对其数量进行-1
      var requirePath = `${this.api}api/decCart?uid=${Storage.get('roomid')}&product_id=${item.product_id}&num=${item.num}`;
      this.$http.get(requirePath).then((response)=>{
        // console.log(response);
        //获取购物车商品总数量及总价
        this.getTotalResult();
        //向后台发送信息
        this.$socket.emit('addcart','addcart');
      },(error)=>{
        alert(error);
      })

      // 前端显示数操作
      if(item.num == 1){
        this.cartList.splice(key,1);
      }else{
        --item.num ;
      }
    },
    // 添加购物车列表商品数量
    addNumber(item){

      //将数量同步到后台,后台对其数量进行+1
      var requirePath = `${this.api}api/incCart?uid=${Storage.get('roomid')}&product_id=${item.product_id}&num=${item.num}`
      this.$http.get(requirePath).then((response)=>{
        // console.log(response);
        //获取购物车商品总数量及总价
        this.getTotalResult();
        //向后台发送信息
        this.$socket.emit('addcart','addcart');
      },(error)=>{
        alert(error);
      })
      // 前端显示数量操作
      ++item.num;
    },
    //获取购物车商品总数量及总价
    getTotalResult(){
      var allPrice = 0 ;
      var allNum = 0 ;
      for(var i=0 ; i<this.cartList.length;i++){
        allPrice += parseFloat(this.cartList[i].price*this.cartList[i].num) ;
        allNum += this.cartList[i].num;
      }
      this.allPrice = allPrice ;
      this.totalNum = allNum ;
    },
    //获取用餐人数及备注信息
    getOrderInfo(){
      var requirPath = `${this.api}api/peopleInfoList?uid=${Storage.get('roomid')}`;
      this.$http.get(requirPath).then((response)=>{
        // console.log(response);
        this.orderInfo = response.body.result[0];
      },(error)=>{
        alert(error);
      })
    },
    //下单
    addOrder(){
      var requirePath = this.api+'api/addOrder';
      console.log(requirePath)
      // var requirePath = `${this.api}api/getOrder`;
      var pramas = {
        uid : Storage.get('roomid') ,        // 桌号id    必传
        p_num : '6人',//this.orderInfo.p_num,        // 用餐人数  必传
        p_mark :'特辣',// this.orderInfo.p_num,       // 备注信息  必传
        order:JSON.stringify(this.cartList), // 菜品信息（数组，见菜品参数说明） 序列化的数组
        total_price : this.allPrice,         // 总价格
        total_num : this.totalNum            // 总数量
      }
      this.$http.post(requirePath,pramas).then((response)=>{
        console.log(response)
        //如果请求数据成功则跳转订单页面
        if(response.body.success){
          this.$router.push({path:'order'});
        }else{
          alert('提交数据有误')
        }
      },(error)=>{
        console.log(error );
      })
    }
  },
  mounted(){
    // 获取购物车列表数据
    this.getCartListData();
    //获取用餐人数及备注信息
    this.getOrderInfo();
  },
  components:{
    'v-navfooter':NavFooter,
    'v-cartnodata':CartNoData
  }
}
</script>
<style lang="scss">
@charset "UTF-8";

.cart_content{
    padding: 1rem;
    /*头部信息*/
    .cart_info{
        background: #FFFFFF;
        border-radius: .5rem;
        h2{
            text-align: center;
            font-size: 1.8rem;
            padding: .8rem 0 ;
            border: 1px solid #EEEEEE;
        }
        .p_number{
            display: flex;
            padding: .5rem;
            border-bottom: 1px solid #EEEEEE;
            .p_number_left{
                flex: 1;
                
                p{
                    line-height: 2rem;
                    &:first-child{
                        color: red;
                    }
                }
            }
            .p_number_right{
                width: 4rem;
                height: 4rem;
                text-align: center;
                img{
                    width: 1.8rem;
                    height: 1.8rem;
                    margin: 0 auto;
                }
            }
        }
        .cart_number{
            padding: .5rem;
            border-bottom: 1px solid #EEEEEE;
            p{
                line-height: 2rem;
                &:first-child{
                    color: blue;
                }
                &:last-child{
                    .price{
                        color: red;
                        font-size: 2.4rem;
                    }
                }
            }
            
        }
    }
    /*购物车列表*/
    .cart_list{
       padding: .5rem;
       background: #FFFFFF;
       border-radius: .5rem;
       margin-top: 1rem;
       ul{
           .item{
               display: flex;
               padding: 1rem 0;
               margin: .5rem 0;
               border-bottom: 1px solid #EEEEEE;
               .left_food{
                   flex: 1;
                   display: flex;
                   img{
                       width: 4rem;
                       height: 4rem;
                       border-radius: .5rem;
                       margin-right: 1rem;
                   }
               }
               .right_cart{
                    width: 10rem;
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
           }
           
       }
        
    }
    
    /*热门菜谱*/
    .hot_food{
         padding: .5rem;
         background: #FFFFFF;
         border-radius: .5rem;
         margin-top: 1rem;
        .item_cate{
            margin-bottom: 1.2rem;
        }
        
        .item_list_outer{
            width: 100%;
            overflow-x: auto;
            margin-bottom: 4rem;
            .item_list{
                display: flex;
                li{
                    width: 6rem;
                    padding: 0 .5rem;
                    box-sizing: border-box;
                    margin-right: 1rem;
                    .inner{
                        width: 100%;
                        background: #fff;
                    }
                    img{
                        width: 6rem;
                        border-radius:.5rem .5rem 0 0  ;
                    }
                    p{
                        margin-top: .2rem .5rem;
                    }
                    .title{
                        font-weight: bold;
                    }
                }
            }
        }
    }
    
    /*购物车为空*/
   .cart_empty{
        padding: .5rem;
        background: #FFFFFF;
        border-radius: .5rem;
        margin-top: 1rem;
        text-align: center;
        h3{
            font-size: 1.6rem;
        }
        p{
            line-height: 3rem;
        }
   }
}

#cart .fotter_book_order{
  left: 100%;
  margin-left: -6.2rem;
  background: red;
}

</style>

