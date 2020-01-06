<template>
  <div>
      <input type="text" placeholder="请输入账号" v-model="user"><br>
      <input type="password" placeholder="请输入密码" v-model="password"><br>
      <button @click="login()">登录</button>
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
    login(){
      axios({
          url:'/api/login',
          data:{user:this.user,password:this.password},
          method:'post'
      }).then(res=>{
          alert(res.data.msg)
          if(res.data.code==0){
              //如果账号不存在,则跳转注册页面,进行注册
              this.$router.push('/index/new')
          }else if(res.data.code==1){
              this.$router.push('/home')
          }
      })
    }
}
}
</script>

<style>

</style>