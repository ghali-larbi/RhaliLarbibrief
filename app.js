const express=require('express');
const app=express();
const fs=require('fs');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data.json')
const db = low(adapter)
const bodyParser=require('body-parser');
app.use(express.static('style'))
app.use(express.static('views'))
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        res.render('page1.ejs',{dataPhone:JSON.parse(data)})
    })
})
app.post('/addPhone',(req,res)=>{
    db.get('phone')
    .push({photo:req.body.photo,nom:req.body.nom,configuration:req.body.configue,prix:req.body.prix,promotion:req.body.promotion})
    .write()
    res.redirect('/');
})
app.get('/page2',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        res.render('page2.ejs',{dataPhone:JSON.parse(data)})
    })
})
app.post('/updatePhone',(req,res)=>{
  let phone= db.get('phone')
    .find({nom:req.query.nom,configuration:req.query.configue})
    .value()
    console.log(phone)
    res.render('page2.ejs',{phone:phone})  
    console.log(req.body.photo) 
})
app.post('/update',(req,res)=>{
    db.get('phone')
    .find({nom:req.query.nom2,configuration:req.query.configue})
    .assign({photo:req.body.photo,nom:req.body.nom,configuration:req.body.configue,prix:req.body.prix,promotion:req.body.promotion})
    .write()
    res.redirect('/')
  })
  app.post('/delete',(req,res)=>{
   let phone= db.get('phone')
    .find({nom:req.query.nom3,configuration:req.query.configue})
    .value()
    console.log(phone)
    db.get('phone')
    .remove(phone)
    .write()
    res.redirect('/')
  })
app.listen(2000,()=>{
    console.log('server run');
    })