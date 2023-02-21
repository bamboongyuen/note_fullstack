require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./route');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());

mongoose.set({ strictQuery: true });
mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) console.log(err);
    else console.log('db connected.');
});

router(app);

app.listen(8080, () => {
    console.log('started...');
});
