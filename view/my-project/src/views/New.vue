<template>
  <div>
       <input type="text" placeholder="请输入账号" v-model="user"><br>
      <input type="password" placeholder="请输入密码" v-model="password"><br>
      <button @click="zhuce()">注册</button>
  </div>
</template>

<script>

import axios from 'axios'
export default {
    data(){
        return{
          user:'',
          password:''
         }
    },
methods:{
 zhuce(){
    
     axios({
         url:'/api/new',
         data:{user:this.user,password:this.password},
         method:'post'
     }).then(res=>{
        if(res.data.code==1){
            //如果注册成功,则跳转登录页进行登录
            alert(res.data.msg)
            this.$router.push('/index/login')
        }else{
             alert(res.data.msg)
        }
     })
 }
}
}
</script>

<style>

</style>