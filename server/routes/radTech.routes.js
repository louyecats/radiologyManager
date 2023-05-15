//routes need to be associated with controller
const RadTechController = require('../controllers/radTech.controller');

module.exports = app => {
    app.post('/api/radtechs', RadTechController.createRadTech);
    app.get('/api/radtechs', RadTechController.findAllRadTechs);
    app.get('/api/radtechs/:id', RadTechController.findOneRadTech);
    app.patch('/api/radtechs/:id', RadTechController.updateRadTech);
    //use patch so don't have to update all values like would w/put
    app.delete('/api/radtechs/:id', RadTechController.deleteRadTech);
}