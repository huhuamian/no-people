<template>
    <div id="search">
      <header class="search_header header">
        <input class="search" type="search" name="search" id="search" value="" />
      </header>
      
      <div class="search_content ">
        <ul class="item_list">
          <li>
            <img src="../assets/images/1.jpg"/>
            <div class="inner">
              <h3 class="title">大蒜腊肉</h3>
              <p class="price">￥26</p>
              <span>已售：351份</span>
            </div>
          </li>
          <li>
            <img src="../assets/images/2.jpg"/>
            <div class="inner">
              <h3 class="title">大蒜腊肉</h3>
              <p class="price">￥26</p>
              <span>已售：351份</span>
            </div>
          </li>
          <li>
            <img src="../assets/images/3.jpg"/>
            <div class="inner">
              <h3 class="title">大蒜腊肉</h3>
              <p class="price">￥26</p>
              <span>已售：351份</span>
            </div>
          </li>
          <li>
            <img src="../assets/images/4.jpg"/>
            <div class="inner">
              <h3 class="title">大蒜腊肉</h3>
              <p class="price">￥26</p>
              <span>已售：351份</span>
            </div>
          </li>
        </ul>
      </div>
      
      <div id="footer_nav">
        <img src="../assets/images/navigation.png"/>
        <p>导航</p>
      </div>
      
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
export default {
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss">
@charset "UTF-8";

.search_header{
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    background: #CCCCCC;
    font-size: 1rem;
    color: #000000;
    .search{
        width: 90%;
        height: 3.8rem;
        line-height: 3.8rem;
        border-radius: .5rem;
        border: 1px solid #EEEEEE;
    }
}

.search_content{
    width: 100%;
    .item_list{
        width: 100%;
        li{
            display: flex;
            padding: .5rem;
            border-bottom: 1px solid #CCCCCC;
            img{
                width: 6rem;
                height: 6rem;
            }
            .inner{
                flex: 1;
                padding: .5rem;
            }
        }
    }
}


</style>

