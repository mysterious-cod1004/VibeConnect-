import express from 'express';
const app= express();
import {ENV} from './src/env.js';
app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.listen(ENV.PORT,()=>{
    console.log("Server is running on port", ENV.PORT);
})