<template>
  <div>
      <div class="top">  <router-link to='/index/login'>登录</router-link>
        <router-link to='/index/new'>注册</router-link></div>
       <div>
           <router-view></router-view>
       </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>