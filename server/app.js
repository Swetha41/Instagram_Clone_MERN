const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

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

//Port
const PORT = 5000;
app.listen(PORT, (req, res) => {
    console.log(`server started at port ${PORT}`)
});