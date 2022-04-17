const express= require('express');

const connect= require('./configs/db');

const userController= require('./controller/user.controller');

const teacherController = require("./controller/teachers.controller")

const classesController= require('./controller/classes.controller');

const { register, login} = require("./controller/auth.controller")

const app= express();

app.use(express.json())

app.post("/register", register)
app.post("/login", login)

app.use("/users", userController);
app.use("/teacher", teacherController)
app.use("/classes", classesController);

app.listen(2345, async()=>{
    try{
        await connect();
    console.log('listening to server 2345');

    }catch(err){
        console.log(err.message);
    }
});