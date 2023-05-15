const RadTech = require('../models/radTech.model');
//connect controller to model by importing the RadTech variable that we exported from the radTech.model.js

module.exports = {

    //Create
    createRadTech: (req, res) => {
        // Mongoose's "create" method is run using our model to add a new object to our db's collection
        RadTech.create(req.body)
        //The req.body is sent to the back-end from the front-end (client) as an object called request with a key called body that contains form values used to create new
            .then(newRadTech => {
                res.status(201).json({radTech: newRadTech})
                //This is where we're setting the API's response to the requesting client
            })
            .catch((err) => {
                console.log("create error", err)
                res.json({message: 'Something went wrong', error: err})
            });
    }, 

    //Read all using Mongoose method find()
    findAllRadTechs: (req, res) => {
        RadTech.find({})
            .then(allRadTechs => {
                // console.log(allRadTechs)
                res.json({radTechs: allRadTechs})
            })
            .catch(err => {
                console.log("findAll error", err)
                res.status(400).json({message: 'Something went wrong', error: err})
            });
    },

    //Read one
    findOneRadTech: (req, res) => {
        //console.log(req)
        //within request body is a key called params and the value is going to be id (route /:id)
        //if it finds the matching object id in our collection, it responds w/it, else returns error
        RadTech.findById(req.params.id)
            .then(oneRadTech => {
                res.json({radTech: oneRadTech});
                //make object if want key to be named differently
            })
            .catch((err) => {
                console.log("findOne error", err);
                res.status(400).json({message: 'Something went wrong', error: err});
            });
    },
    
    //Update - new:true is an options object used to set different functionality to indicate we want the returned document to contain the newly updated document vs default mongoose original
    //runValidators:true makes sure that what they update to passes the validations
    updateRadTech: (req, res) => {
        RadTech.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .then(updatedRadTech => res.json({radTech: updatedRadTech}))
            .catch((err) => {
                console.log("update error", err);
                res.status(400).json({message: 'Something went wrong', error: err})
            });
        },
    
    //Delete
    deleteRadTech: (req, res) => {
        RadTech.findByIdAndDelete(req.params.id)
            .then(deletedRadTech => res.json(deletedRadTech))
            .catch((err) => {
                console.log("delete error", err);
                res.status(400).json({message: 'Something went wrong', error: err})
            });
    }
}