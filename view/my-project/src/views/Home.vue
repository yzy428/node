<template>
  <div>
      <h1>{{num}}</h1>
      <button @click="play()">签到</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
   return{
     num:0
   }
  },
  created(){
    console.log(1)
      axios({
        url:'/api/day',
        data:{num:this.num},
        method:'POST'
      }).then(res=>{
       
      })
  },
  methods:{
   play(){
     axios({
       url:'/api/play',
       data:{num:this.num},
          method:'POST'
     }).then(res=>{
       if(res.data.code==1){
          this.num=res.data.data
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