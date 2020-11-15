const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

//DB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('DB Connected'))
.catch((err) => console.log(err));

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//Port
app.listen(PORT, (req, res) => {
    console.log(`server started at port ${PORT}`)
});