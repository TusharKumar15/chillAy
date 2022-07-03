import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import shopsRoutes from './customers/routes/shops.js';
import orderRoutes from './bussiness/routes/orders.js';
import buss_auth from './bussiness/routes/auth.js';
import cust_auth from './customers/routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(shopsRoutes);
app.use(orderRoutes);
app.use(cust_auth);
app.use(buss_auth);

app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));

// app.get('/test', (req, res) => res.send('this is a test route'));

const CONNECTION_URL = 'mongodb+srv://TusharKumar:1q2w3e4r@cluster0.j53s1.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

