const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors')

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const routes = require('./routes/routes');
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/v1', routes);



app.get('/', (req, res) => res.send('Hello'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listenin in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));