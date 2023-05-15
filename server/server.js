const express = require("express"); //import express module
const app = express(); //use express to create app
const port = 8000; //optional port pick localhost://8000
// const cors = require('cors');

require('./config/mongoose.config');

//if planning to handle post requests, must have middleware express as it allows us to use a post request and pass it through
app.use(express.json(), express.urlencoded({extended:true}));

//bring in routes
//make server require routes and give the app imported on line 2 access to them
require('./routes/radTech.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));