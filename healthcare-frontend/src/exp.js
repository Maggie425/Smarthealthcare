const express=require('express');
const app= express();
const port=3000;
 app.use(express.json());

 app.post ('/',(req,res)=>{

    const msg= req.body;
    res.json({index:'1', message:msg});
 });

 app.listen(port,()=> { console.log(`Server is  running on port ${port}`)});
