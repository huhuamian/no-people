<template>
    <div id="cart_no_data">

        <div class="cart_empty">
            <h3>购物车为空</h3>
            <p>您可以点击下面的菜单按钮开始点餐</p>
        </div>
        
        <!-- <div id="footer_nav">
            <img src="images/navigation.png"/>
            <p>导航</p>
        </div> -->
        
        <div id="footer_book">
            <img src="../assets/images/menu.png"/>
            <p>菜单</p>
        </div>
        
        <div id="footer_cart">
            <img src="../assets/images/cart.png"/>
            <p>继续点餐</p>
        </div>
        
    </div>
</template>

<script>
    
</script>

<style lang="scss">
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
</style>

