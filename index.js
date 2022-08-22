const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbAuthConnection, dbItemsConnection, dbConnection } = require('./database/config');

// Create express server
const app = express();

// Databases - MongoDB
dbConnection()

// CORS - https://www.npmjs.com/package/cors
app.use(cors())

// Public Directory
app.use(express.static('public'));

//  Reading and parsing of body
app.use( express.json() )

// Routes
app.use('/api/auth', require('./routes/auth'));     // Authentication API
app.use('/api/item', require('./routes/item'));     // Items API

// Port entrypoint
app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});
