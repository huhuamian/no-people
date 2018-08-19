<template>
    <div id="start">
      <div class="start_content">
        <header class="start_header">
          <img src="../assets/images/canju.png"/> 用餐人数
        </header>
        <p class="notice">请选择正确的用餐人数，小而马上为你送餐具</p>
        <div class="content">
          <ul class="user_list">
            <li v-for="(item,key) in 12" :class="{'active':parseInt(p_num) == key+1}">
              <span>{{item}}人</span>
            </li>
          </ul>

          <div class="remarkInfo">
            <input type="text" placeholder="请输入您的口味要求，忌口等(非必填)" v-model="p_mark">
          </div>

          <div class="label">
            <ul class="mark_list">
              <li class="active">
                <span>打包带走</span>
              </li>
              <li>
                <span>微辣</span>
              </li>
              <li>
                <span>中辣</span>
              </li>
              <li>
                <span>特辣</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="star" @click="addPersonInfo()">
          <span>
            开始点餐
          </span>
        </div>
      </div>
    </div>
</template>

<script>
import Config from '../assets/model/config.js';
import Storage from '../assets/model/storage.js';
export default {
  data () {
    return {
      'p_num':"1人",
      'p_mark':'',
      'api':Config.api
    }
  },
  methods:{
    //点击更改按钮事件
    addChangeEvent(){
      //保存this
      var that = this ;

      //选择人数的dom操作
      var aLiDoms = document.querySelectorAll('.user_list li');
      // console.log(aLiDoms) 
      for(var i=0 ; i<aLiDoms.length ; i++){
        aLiDoms[i].onclick = function(){
          // 去掉所有li的class，让被点击的li添加active样式
          for(var j=0 ; j<aLiDoms.length;j++){
            aLiDoms[j].className = '';
            this.className = "active"; //this为li
            that.p_num = this.querySelector('span').innerHTML.trim(); //trim()为原生js里的去除空格的方法
            // console.log(that.p_num)
          }
        }
      }

      //选择口味的dom操作
      var aLi = document.querySelectorAll(".mark_list li");
      //给节点添加点击事件
      for(var k = 0; k<aLi.length;k++){
        aLi[k].onclick = function(){
          //先清除所有li的class，给点击的li添加active样式
          for(var l=0;l<aLi.length;l++){
            aLi[l].className = '';
            this.className = 'active';
            console.log(that.p_mark);
          }
          that.p_mark =`${that.p_mark} ${this.querySelector('span').innerText}` ;
        }

      }
    },
    //点击开始点餐按钮，发送AJAX请求
    addPersonInfo(){
      var requirPath = `${this.api}api/addPeopleInfo`;
      
      var requirParams = {
        uid:Storage.get('roomid'),
        user_num:this.p_num,
        mark_num:this.p_mark
      }
      this.$http.post(requirPath,requirParams).then((response)=>{
        console.log(response);
        if(response.body.success){
          //跳转页面到首页
          this.$router.push({path:'home'});
        }
      },(error)=>{
        console.log(error);
      })
    },
    //获取用餐人数及备注信息
    getOrderInfo(){
      var requirPath = `${this.api}api/peopleInfoList?uid=${Storage.get('roomid')}`;
      this.$http.get(requirPath).then((response)=>{
        //  console.log(response);
        this.orderInfo = response.body.result[0];
        var peopleInfoLength = response.body.length; //用餐信息长度
        if(peopleInfoLength){
          this.$router.push({path:"home"});
        }
        this.p_mark = "无" ;//this.orderInfo.p_mark || '无';
        // console.log(this.p_mark);
        
      },(error)=>{
        alert(error);
      })
    }
  },
  created(){
    //判断是否有用餐人数信息
    this.getOrderInfo();
  },
  mounted(){
    //点击更改按钮事件
    this.addChangeEvent();
  }
}
</script>
<style lang="scss">
  .start_content{
      .start_header{
          height:3.2rem;
          width: 10rem;
          line-height: 3.2rem;
          background: black;
          color: #fff;
          margin: 5rem auto 0;
          border-radius: .5rem;
          
          img{
              height: 2.2rem;
              line-height: 2.2rem;
              position: relative;
              top: .5rem;
              left: 1rem;
              margin-right: 1rem;
          }
      }
      
      .notice{
          color: red;
          font-size: 1.2rem;
          text-align: center;
          margin: 1rem 0;
      }
      
      .user_list,.mark_list{
          display: flex;
          flex-wrap: wrap;
          padding: .5rem;
          
          li{
              width: 25%;
              padding: .5rem;
              box-sizing: border-box;
              
              span{
                display: block;
                width: 100%;
                height: 3.2rem;
                line-height: 3.2rem;
                text-align: center;
                background: #fff;
                border-radius: .5rem;
                border: 1px solid #ccc;
              }
          }
          li.active{
            span{
              color: #fff;
              background:red;
            }
          }
      }
      .remarkInfo{
        padding: 1rem;
        margin-top: 2rem;

        input{
          border: 1px solid #eeeeee;
          width: 100%;
          height: 4rem;
          line-height: 4rem;
          font-size: 1.6rem;
          border-radius: .5rem;
        }
      }
      .star{
          width: 4.4rem;
          height: 4.4rem;
          background: red;
          position: fixed;
          bottom: 5rem;
          left: 50%;
          margin-left: -2.2rem;
          border-radius: 50%;
          color: #fff;
          
          span{
              display: block;
              width: 2rem;
              margin: 0 auto;
              position: relative;
              top: .5rem;
          }
      }
  }
</style>

