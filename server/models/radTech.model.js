const mongoose = require('mongoose'); 
//bring in middleware to create model/collection 

const RadTechSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"], //optional validation w/custom response+
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [50, "Last name must not be more than 50 characters"],
        
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"], //optional validation w/custom response+
        minlength: [2, "Last name must be at least 2 characters"],
        maxlength: [50, "Last name must not be more than 50 characters"],
        
    },
    modality: {
        type: String,
        required: [true, "Modality is required"], //optional validation w/custom response+
        minlength: [2, "Modality must be at least 2 characters"],
        maxlength: [50, "Modality must not be more than 50 characters"],
        
    },
    firstShiftStatus: {
        type: String, 
        enum: ["Undecided","Working","Not Working"],
        required: [true, "First shift status requried"],
        default: "Undecided" //give default value in case want to decide shift later
    },
    secondShiftStatus: {
        type: String, 
        enum: ["Undecided","Working","Not Working"],
        required: [true, "Second shift status requried"],
        default: "Undecided" //give default value in case want to decide shift later
    },
    thirdShiftStatus: {
        type: String, 
        enum: ["Undecided","Working","Not Working"],
        required: [true, "Third shift status requried"],
        default: "Undecided" //give default value in case want to decide shift later
    }
},{timestamps:true}); //optional for created_at and updated_at

const RadTech = mongoose.model('RadTech', RadTechSchema); 
module.exports = RadTech;
//blueprint created, now goes into mongoose.model - & creates collection with the name of 'RadTech' 

// module.exports = mongoose.model("RadTech", RadTechSchema); //same as above