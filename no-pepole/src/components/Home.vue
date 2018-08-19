<template>
    <div id="home">
        <header class="index_header">
			
			<div class="hlist">
				<img src="../assets/images/rexiao.png"/>
				<p>热销榜</p>				
			</div>
			
			<div class="hlist">
				<img src="../assets/images/caidan.png" />
				<p>点过的菜</p>				
			</div>
			<div class="hlist">
				
				<img src="../assets/images/sousuo.png"/>
				<p>搜你喜欢</p>				
			</div>
			
		</header>
		
		<aside class="left_cate" id="left_cate">
				<ul>
					<li v-for="(item,key) in list" @click="changeList(key)">{{item.title}}</li>
				</ul>
				
				<div id="nav_cate" class="nav_cate">
					<img src="../assets/images/nav.png"/>
					<p>菜单</p>
				</div>
				
				
		</aside>
		
		
		<div class="content">
			
			
			<div class="item" v-for="item in list">
				
				<h3 class="item_cate">{{item.title}}</h3>
				
				<ul class="item_list">
					<li v-for="itemInfo in item.list">	
						<div class="inner">

							<router-link :to="'/pcontent?id='+itemInfo._id">
								<img :src="api+itemInfo.img_url" />
								<p class="title">{{itemInfo.title}}</p>						
								<p class="price">¥{{itemInfo.price}}</p>
							
							</router-link>							
						
						</div>		
					</li>
				</ul>
				
			</div>
		</div>
		
		<div class="bg" id="bg"></div>
		<v-navfooter></v-navfooter>

        <router-link to="/cart">
            <div id="footer_cart">
                <img src="../assets/images/cart.png"/>
                <p>购物车</p>
                <span v-if="cartCount">{{cartCount}}</span>
            </div>
        </router-link>

    </div>

</template>

<script>
import NavFooter from './public/NavFooter.vue';
import Config from '../assets/model/config.js'
import Storage from '../assets/model/storage.js';
export default {
  data () {
    return {
	  list:[],
      api:Config.api,
      cartCount:0
    }
  },
  sockets:{
      addcart:function(){ /*接收服务器广播过来的addcart*/
      //重新获取购物车数据
        this.getCartCount();
      }
  },
  components:{
	  'v-navfooter':NavFooter
  },
  methods:{
	//获取
	asideDomInit(){ //初始化aside dom节点
		var leftCate = document.getElementById("left_cate");
		var navCate = document.getElementById("nav_cate");
		var bgDom = document.getElementById("bg");
		var leftCateFlag = false ;
		navCate.onclick = function(){
			if(leftCateFlag){
				leftCateFlag = false ;
				leftCate.style.transform = "translate(0 , 0)";
				bgDom.style.display = "block";
				document.body.style.overflow = "hidden";
			}else{
				leftCateFlag = true ;
				leftCate.style.transform = "translate(-100% , 0)";
				bgDom.style.display = "none";
				document.body.style.overflow = "auto";
			}
		}
    },
    //请求首页页面数据
	requestData(){ 
		var honeRequestApi = this.api+'api/productlist';
		this.$http.jsonp(honeRequestApi).then((response)=>{ 
            //第一个response是成功之后的回调
			this.list = response.body.result;
		},(error)=>{
            //第二个是失败之后的回调
			console.log("首页数据加载失败"+error);
		});
    },
    //获取购物车商品数量
    getCartCount(){
        var requirPath = this.api+"api/cartCount?uid="+Storage.get('roomid');
        this.$http.get(requirPath).then((response)=>{
            // console.log(response);
            // console.log(response.body.result);
            this.cartCount = response.body.result;
        },(errror)=>{
            console.log('请求失败的原因:'+error);
        })
    },
	//点击导航改变页面位置
	changeList(key){
		//获取页面相关节点
		var itemCateDom = document.getElementsByClassName('item_cate')[key];
		// 实现滚动
		document.documentElement.scrollTop = itemCateDom.offsetTop;
		// 点击后导航栏隐藏
		var leftCate = document.getElementById("left_cate");
		var bgDom = document.getElementById("bg");

		leftCate.style.transform = "translate(-100% , 0)";
		bgDom.style.display = "none";
	}
  },
  mounted(){
      //点击导航改变页面位置
      this.asideDomInit();
      //请求首页页面数据
      this.requestData();
      //获取购物车商品数量
      this.getCartCount();
  }
}
</script>
<style lang="scss">
@charset "UTF-8";
//头部
.index_header{
    width: 96%;
    margin: 1rem auto 0;
    height: 4.4rem;
    background: #fff;
    display: flex;
    border-radius: .5rem;
    .hlist{
       flex: 1;
       text-align: center;
       border-right: 1px solid #eee;
       img{
           width: 2rem;
           height: 2rem;
           margin: .2rem auto 0;
           
       }
       &:last-child{
           border-right: none;
       }
    }
}

//内容区域
.content{
    margin-top: 1.6rem;
    
    .item_cate{
        text-align: center;
        margin-bottom: 1.2rem;
    }
    
    .item_list{
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        
        li{
            width: 33.33%;
            margin: .5rem 0;
            padding: 0 .5rem;
            box-sizing: border-box;
            .inner{
                width: 100%;
				background: #fff;
				a{
					color: #666666;
					text-decoration: none;
				}
				img{
					width: 100%;
					height: 8rem;
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

//侧边栏
.left_cate{
    //css3运动加过渡效果
    transition: all 1s;
    transform: translate(-100% , 0);
    width: 6rem;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background: #EEEEEE;
    
    ul{
        height: 100%;
        padding: .5rem;
        background: #EEEEEE;
        position: absolute;
        z-index: 3;
        li{
            line-height: 4.4rem;
        }
    }
    .nav_cate{
        width: 5rem;
        height: 4rem;
        position: absolute;
        z-index: 2;
        right: -4rem;
        top: 42%;
        background: rgba(132 ,128 ,128 ,0.8);
        text-align: center;
        border-radius: 0 50% 50% 0;
        padding: .3rem .1rem 0 0 ;
        box-sizing: border-box;
        img{
            widows: 1.8rem;
            height: 1.8rem;
        }
        p{
            color: #FFFFFF;
            margin-top: -.4rem;
        }
    }
}

/*透明背景遮罩层*/
.bg{
    width: 100%;
    height: 100%;
    background: rgba(132 ,128 ,128 ,0.5);
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    z-index: 1;
}

/*首页导航、购物车*/
#footer_nav {
    width: 4.4rem;
    height: 4.4rem;
    background: #000;
    color: #FFFFFF;
    position: fixed;
    bottom: .5rem;
    left: .5rem;
    text-align: center;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: 50%;
    img{
        width: 2.5rem;
    }
    p{
        margin-top: -.5rem;
    }
}

/*底部弹出层导航*/
.footer_nav_show{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    .list{
        width: 100%;
        height: 100%;
        background: rgba(132 ,128 ,128 ,0.9);
        li{
            width: 4.4rem;
            height: 4.4rem;
            background: #000;
            color: #FFFFFF;
            position: fixed;
            bottom: .5rem;
            left: .5rem;
            text-align: center;
            padding: .5rem;
            box-sizing: border-box;
            border-radius: 50%;
            font-size: .6rem;
            img{
                width: 2.5rem;
            }
            p{
                margin-top: -.5rem;
            }
            &:nth-child(1){
                bottom: 15.4rem;
                left: 0;
            }
            &:nth-child(2){
                bottom: 12.4rem;
                left: 30%;
                margin-left: -3rem;
            }
            &:nth-child(3){
                bottom: 7.4rem;
                left: 60%;
                margin-left: -6rem;
            }
            &:nth-child(4){
                bottom: .5rem;
                left: 90%;
                margin-left: -12rem;
            }
        }
        
        
    }
}

#footer_cart{
    width: 4.4rem;
    height: 4.4rem;
    background: red;
    color: #FFFFFF;
    position: fixed;
    bottom: .5rem;
    right: .5rem;
    text-align: center;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: 50%;
    img{
        width: 2.5rem;
    }
    p{
        margin-top: -.5rem;
    }
    span{
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        background: red;
        border-radius: 50%;
        text-align: center;
        line-height: 1.6rem;
        color: #EEEEEE;
        position: absolute;
        top: -.6rem;
        right: -.4rem;
    }
}

</style>

