const express = require("express")  ; 

const port = 3000 ; 
const app = express() ;

app.get( "/" , (req, res) =>{
  res.send("hello word 1111 11111  hhgj") ;
})

app.listen(port , () =>{
  console.log(`Example listener on port ${port} `);
})