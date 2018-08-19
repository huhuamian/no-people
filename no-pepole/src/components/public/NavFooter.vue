<template>
    <div id="navfooter">
		<div id="footer_nav" @click="flag = !flag">
			<img src="../../assets/images/navigation.png">
			<p>导航</p>
		</div>
		
		<div class="footer_nav_show" v-if="flag">
			<ul class="list">
				<li>
                    <router-link to="/home">
                        <img src="../../assets/images/menu.png"/>
                        <p>菜单</p>
                    </router-link>
				</li>
				<li>
                    <router-link to="/cart">
                        <img src="../../assets/images/cart.png"/>
                        <p>购物车</p>
                    </router-link>
				</li>
				<li>
                    <router-link to="/order">
                        <img src="../../assets/images/order.png"/>
                        <p>我的订单</p>
                    </router-link>
				</li>
				<li>
                    <router-link to="/home">
                        <img src="../../assets/images/wallet.png"/>
                        <p>结账</p>
                    </router-link>
				</li>
				<li @click="flag=!flag">
                    <router-link to="/home">
                        <img src="../../assets/images/close.png"/>
                        <p>返回</p>
                    </router-link>
				</li>
			</ul>
		</div>
		

    </div>
</template>

<script>
    export default{
        data(){
            return{
                'flag':false
            }
        }
    }
</script>

<style lang="scss">
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
}
</style>

