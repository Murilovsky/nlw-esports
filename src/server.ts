import express from "express";

const app = express();

app.get('/home',(req:any,res:any)=>{
    console.log('homepage');
    res.json([
        {"id":1,"nome":"Joaquim","jogo":"COD"},
        {"id":30,"nome":"Lorena","jogo":"LoL"},
        {"id":72,"nome":"Amélia","jogo":"Risk of Rain"},
        {"id":1928,"nome":"Hebron","jogo":"Multiversus"}
    ]);
})

app.listen(3000)