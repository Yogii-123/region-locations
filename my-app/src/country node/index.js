const express1=require('express')
const mongoose = require('mongoose');
const app=express1();
const ejs=require('ejs');
const cors=require('cors');
app.use(cors());

app.set('view engine', 'ejs');
 

mongoose.connect('mongodb://0.0.0.0:27017/php',{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
  if (err) throw err
  console.log("Database connected.");
  console.log(err);

})


 const phpschema ={
          region:String,
        region_code:Number,
        circle:String,
        circle_code:Number,
       division:String,
      division_code:Number,
      subdivision:String,
     subdivision_code:Number,
     section:String,
     section_code:Number
 }
 const samples= mongoose.model('samples',phpschema);

app.get('/get',async(req,res)=>{
  const getdata1=await samples.find()
  res.json(getdata1)
})

app.get('/sections/:region/:circle/:division/:subdivision', async (req, res) => {
  const { region, circle, division, subdivision } = req.params;
  const sections = await samples.find({ region, circle, division, subdivision });
  res.json(sections);
});


 
let PORT=9005;
app.listen(PORT,function(err){
    if(err) console.log('ERROR');
    console.log('server listening on '+PORT);
})
