const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 5000;

// parser to get form data
app.use(express.urlencoded({extended: true}));
app.use('/products', require('./routes/products'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in starting the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});