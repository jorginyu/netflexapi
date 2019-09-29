const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// rutas
app.use(require('./routes/index'));

app.listen(8080, () => console.log('corriendo'));