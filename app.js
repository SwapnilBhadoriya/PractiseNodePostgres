const express = require("express");
const app = express();
const {connectToDb} = require('./database/db');
require('dotenv').config();
//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//routers
const tasks = require("./routes/tasks");



app.use("/api/v1/tasks", tasks);
const port = 3000;

const start = async ()=>{
    try {
        await connectToDb();
        app.listen(port, (err) => {
            if (err) {
              console.log(`Errro in starting server at port :${port}`);
              return;
            }
            console.log(`Server running successfully at port : ${port}`);
          });

    } catch (error) {
        console.log(error);
    }
}

start();




