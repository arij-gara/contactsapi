const express = require('express')
const dotenv = require("dotenv").config()
const connectdb = require("./config/dbConnection")
const errorhandler = require('./middleware/errorhandler')
const userrouter =require("./routes/userroutes")
const jwt = require('jsonwebtoken')
connectdb()
const app = express()
const contactroute = require('./routes/contactroutes')
const port=process.env.PORT||5000

app.use(express.json())
app.use('/api/contacts/', contactroute)
app.use('/api/users/',userrouter) 
 app.use(errorhandler);
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})