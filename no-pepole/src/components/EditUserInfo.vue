<template>
    <div id="start">
      <div class="start_content">
        <header class="start_header">
          <img src="../assets/images/canju.png"/> 修改用餐人数
        </header>
        <p class="notice">请选择正确的用餐人数</p>
        <div class="content">
          <ul class="user_list">
            <li v-for="(item,key) in peopleList" :class="{'active':key == 0}" >
              <span>{{item}}</span>
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

        <div class="edit_ok">
          <router-link to="cart">
            <span>
              取消修改
            </span>
          </router-link>
        </div>

        <div class="edit_ok" @click="addPersonInfo()">
          <span>
            确定修改
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
      'api':Config.api,
      'peopleList':[]//['1人','2人','3人','4人','5人','6人','7人','8人','9人','10人','11人','12人']

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
            console.log(that.p_num)
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
            // console.log(that.p_mark);
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
          this.$router.push({path:'cart'});
        }
      },(error)=>{
        console.log(error);
      })
    },
    //获取用餐人数及备注信息
    getOrderInfo(){
      var requirPath = `${this.api}api/peopleInfoList?uid=${Storage.get('roomid')}`;
      this.$http.get(requirPath).then((response)=>{
        // console.log(response);
        this.orderInfo = response.body.result[0];

        this.p_mark = this.orderInfo.p_mark || '无';
        // console.log(this.p_mark);
        
      },(error)=>{
        alert(error);
      })
    }
  },
  mounted(){
    //给用户列表添加数据
    for(var i=0 ; i<12 ; i++){
      this.peopleList.push(i+1+"人");
    }
    //点击更改按钮事件
    this.$nextTick(()=>{ //先渲染完成dom节点
      this.addChangeEvent();
    })
    //获取用餐人数及备注信息
    this.getOrderInfo();

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
      .edit_ok{
          width: 4.4rem;
          height: 4.4rem;
          background: red;
          position: fixed;
          bottom: 5rem;
          left: 50%;
          margin-left: -4.2rem;
          border-radius: 50%;
          color: #fff;
          a{
            text-decoration: none;
            color: white;
          }
        &:last-child{
          margin-left: 2.2rem;
        }

          
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

