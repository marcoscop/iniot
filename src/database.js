const mongoose = require('mongoose');

/*const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
const NOTES_APP_MONGODB_DATABASE = process.env.NOTES_APP_MONGODB_DATABASE;*/
const {INIOT_APP_MONGODB_HOST, INIOT_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${INIOT_APP_MONGODB_HOST}/${INIOT_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI,{    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

    .then(db => console.log("Database is connected"))
    .catch(err => console.log(err));