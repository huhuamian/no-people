<template>
    <div id="order">
      <div class="order_content">
        <div class="order_info">
          <div class="order_top">
            <img src="../assets/images/timer.png"/>
            <div class="order_info_right">
              <h2>118号桌待门店接单</h2>
              <p>请联系服务员确定菜谱信息</p>
            </div>
          </div>
          <h3>已点菜品{{list.total_num}}份，合计：<span class="price">{{list.total_price}}元</span></h3>
          
        </div>
        <div class="order_list" v-for="item in list.items">
          <h3>菜品详情：</h3>
          <ul>
            <li>
              <div class="title">
                {{item.title}}
              </div>
              <div class="num">
                {{item.num}}份
              </div>
              <div class="price">
                {{item.price}}元
              </div>
            </li>
          </ul>
          
        </div>
      </div>

      <v-navfooter></v-navfooter>
      <div class="menu">
        <router-link to="/home">
            <div id="footer_book" class="footer_book">
                <img src="../assets/images/menu.png" >
                <p>菜单</p>
            </div>
        </router-link>
      </div>
    </div>
</template>

<script>
import NavFooter from './public/NavFooter.vue';
import Config from '../assets/model/config.js';
import Storage from '../assets/model/storage.js';
export default {
  data () {
    return {
      api:Config.api,
      list:[]
    }
  },
  methods:{
      //请求订单数据
      getOrderList:function(){
          var requirePath = `${this.api}api/getOrder?uid=${Storage.get('roomid')}`;
          this.$http.get(requirePath).then((response)=>{
              this.list = response.body.result[0] || [];
          },(error)=>{
              alert(error.body.message);
          })
      }
  },
  mounted(){
      this.getOrderList();
  },
  components:{
      'v-navfooter':NavFooter
  }
 }
</script>
<style lang="scss">
@charset "UTF-8";

.order_content{
    padding: 1rem;
    .order_info{
        background: #FFFFFF;
        border-radius: .5rem;
        .order_top{
            display: flex;
            img{
                width: 5.6rem;
                height: 5.6rem;
                margin-right: .5rem;
            }
            .order_info_right{
                flex: 1;
                padding-top: .5rem;
                p{
                    font-size: 1.4rem;
                }
            }
        }
        h3{
            width: 100%;
            line-height: 2rem;
            padding: .5rem;
            .price{
                font-size: 2rem;
                color: red;
            }
        }

    }
    /*订单列表*/
    .order_list{
        padding: 1rem;
        margin-top: 1rem;
        border-radius: .5rem;
        background: #FFFFFF;
        h3{
            line-height: 2rem;
        }
        ul{
            margin-top: 1rem;
            li{
                font-size: 1.4rem;
                font-weight: 700;
                margin-top: .5rem;
                display: flex;
                .title{
                    flex: 2;
                }
                .num{
                    flex: 1;
                    text-align: center;
                }
                .price{
                    flex: 1;
                    text-align: center;
                }
            }
        }
    }
    
    /*支付页面*/
   .order_play{
        padding: 1rem;
        border-radius: .5rem;
        background: #FFFFFF;
        h3{
            font-size: 2rem;
            line-height: 2rem;
            text-align: center;
        }
        .order_play_detail{
            display: flex;
            border-bottom: 1px solid #EEEEEE;
            padding-bottom: 1rem;
            margin-top: 1rem;
            div{
                flex: 1;
            }
        }
        .order_play_info{
            display: flex;
            margin-top: 1rem;
            .play_list{
                flex: 2;
                padding-top: .5rem;
                .price{
                    font-size: 2rem;
                    color: red;
                }
            }
            .play_buttom{
                flex: 1;
                height: 3rem;
                border-radius: .5rem;
                background: orange;
                color: white;
                text-align: center;
                line-height: 3rem;
            }
        }
       
   }
    
}
</style>
