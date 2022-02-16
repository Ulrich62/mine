const express = require('express');
require('dotenv').config()
// application
const app = require('./app')
// base de donnes
const db = require('./database')

// listening port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});