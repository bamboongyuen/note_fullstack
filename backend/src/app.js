const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./route');

//init
dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 8080;

//middleware
app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//db connect
mongoose.set({ strictQuery: true });
mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) console.log(err);
    else console.log('db connected.');
});

//router
router(app);

//listen
app.listen(port, () => {
    console.log('server running...');
});
