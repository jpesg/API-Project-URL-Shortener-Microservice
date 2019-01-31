var mongoose = require('mongoose');
var app = require('./server.js');

const url = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
//Connect mongodb
mongoose.connect(url, (err, res) =>{
  if(err) throw(err);
  console.log('DB Connection succesfull');

  //Start server
  app.listen(port, function(err, res){
    console.log('server is working');
  });
});