const Router=require('koa-router')
const router=new Router()
const mysql=require('mysql')
const reg=require('reg-check')
//校验包
const connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'root',
database:'host'
})
connection.connect()

router.post('/api/login',async(ctx,next)=>{
    const {user,password}=ctx.request.body
    //接受登录的账号密码
    try{
     const result=  await new Promise((resolve,reject)=>{
         //数据库查找该账号密码
       connection.query('select * from week2 where user=? and password=?',[user,password],function(error,result){
           error?reject(error):resolve(result)
       })
        })
      console.log(result)
      //如果数据库结果length长度为1,证明查找到
        if(result.length==1){
            ctx.response.body={
                code:1,
                msg:'登录成功'
            }
        }else{
            ctx.response.body={
                code:0,
                msg:'查找不到用户,请注册账号'
            }
        }
     
    }catch(e){
        ctx.response.body={
            code:2,
            msg:'登陆失败'
        }
    }
})

router.post('/api/new',async(ctx,next)=>{
    const {user,password}=ctx.request.body
      //接收注册的账号密码
  try{
      //后台进行手机号校验
    if(!reg.phone.test(user)){
        ctx.response.body={
            code:0,
            msg:'手机号格式不正确'
        }  
        console.log(111)
    }
    //  //后台进行密码校验
    if(!reg.pwd.test(password)){
        ctx.response.body={
            code:0,
            msg:'密码格式不正确,必须为6-20个字符，必须同时包含大、小写字母及数字，不可包含特殊字符'
        }
        console.log(222)
    }
    if(reg.pwd.test(password)&&reg.phone.test(user)){
        //如果全部符合
        const result=await new Promise((resolve,reject)=>{
            //查钊数据库有没有此用户名
            connection.query('select * from week2 where user=?',user,function(error,result){
               error?reject(error):resolve(result)
            })
        })
       
   
        //如果没有,则进行注册
         if(result.length<1){
            await new Promise((resolve,reject)=>{
     connection.query('insert into week2 set user=?,password=?',[user,password],function(error,result){
               error?reject(error):resolve(result)
            })
            })
            ctx.response.body={
               code:1,
               msg:'注册成功'
           }
         }else{
             //如果查找到,则账号已存在
           ctx.response.body={
               code:0,
               msg:'该账号已存在'
           }
         }
    }
 
  }catch(e){
    ctx.response.body={
        code:0,
        msg:'注册失败'
    }
  }
})

//实现签到日历（记录签到总天数）
//存入数据库天数数据
router.post('/api/day',async(ctx,next)=>{
try{
     const {num}=ctx.request.body
 const result=    await new Promise((resolve,reject)=>{
   connection.query('insert into day set day=?',num,function(error,result){
    error?reject(error):resolve(result)
   })
     })
     ctx.response.body={
        code:1,
    }
}catch(e){
    ctx.response.body={
        code:0,
    
    }
}





})
var flag=true
router.post('/api/play',async(ctx,next)=>{
    try{
   if(flag){
         const result=  await new Promise((resolve,reject)=>{
        connection.query('select * from day',function(error,result){
            error?reject(error):resolve(result)
            })
        })
     const num=result[0].day
     const index=num+1
    //签到天数+1
        ctx.response.body={
            code:1,
            data:index
        }
          setTimeout(() => {
              flag=false
              //开关变为false
          }, 3);   
        
       
   }
  if(!flag){
      console.log(11111)
    ctx.response.body={
        code:0,
        msg:'未满24小时不可再次签到'
    }
       setTimeout(() => {
       flag=true
   }, 86400000);
   //86400000秒为24小时
  }



    }catch(e){
        ctx.response.body={
            code:0,
            msg:'签到失败'
        }
    }
})






module.exports=router