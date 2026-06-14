import express from 'express'
const app=express();
const celebrity = {
    type: "action hero",
    name: "JSON Statham"
  }
app.get('/',(req,res)=>{
    res.json(celebrity)
})
app.listen(3000,()=>console.log('server started at port 3000'))