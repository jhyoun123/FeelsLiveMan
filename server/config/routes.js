var messages = require('../controllers/messages.js');
module.exports = function(app) {
  app.get('/', messages.index);
  app.get('/activate', messages.activate)
  app.get('/home', messages.index);
  // app.post('/addNote', messages.addMessage)
  // send any other requests to angular for routing
  app.all("*", (req,res,next) => {
       res.sendFile(path.resolve("./public/dist/index.html"))
   });
}
