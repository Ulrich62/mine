mongose = require('mongoose');

// connection base de donnees
mongose.connect(process.env.MONGO_DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!')
}).catch(err => {
    console.log("Cannot connect to the database!",err)
});
