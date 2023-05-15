const express = require("express"); //import express module
const cors = require('cors'); //comment out til later
const app = express(); //use express to create app
const port = 8000; //optional port pick localhost://8000

require('./config/mongoose.config');
//if planning to handle post requests, must have middleware express as it allows us to use a post request and pass it through
app.use(express.json(), express.urlencoded({extended:true}));
app.use(cors()); //must come after const app line comment out til later

//bring in routes to server & give app we imported access to them
require('./routes/radTech.routes')(app); //comment out til later

app.listen(port, () => console.log(`Listening on port: ${port}`));