const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const User = require('./routes/user');
const db = require('./models/index');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// rutas
app.use(require('./routes/index'));
app.use('/', User);

// sync our sequelize models and then start server
// force: true will wipe our database on each server restart
// this is ideal while we change the models around
db.sequelize.sync().then(() => {
  
     // inside our db sync callback, we start the server
     // this is our way of making sure the server is not listening 
     // to requests if we have not made a db connection
     app.listen(8080, () => {
       console.log(`App listening on PORT ${8080}`);
     });
   });