const express = require('express');
const mongoose = require('mongoose');
const app = express();
const appRouter = require('./routes/appRouter');
const cors = require('cors')
require('dotenv/config');

const port = 3000;


app.use(cors())
app.use(express.json());

//adding router
app.use("/", appRouter);

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }).then( ()=> console.log("Connected Successfully"), error => handleError(error));
// mongoose.connection.on('error', (error)=> console.log(error) )


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})