const express = require('express');
const app = express();
const converter = require('./convertGpxToGeojson.js');
const port = 3000;
var multer = require('multer');




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


  app.post('/upload/file', upload.single('gpx'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    

    var converterResponse = converter.convert(file.path);

    res.send(converterResponse.toString());
    
  })

  app.get('/data/master', function(req, res){
    res.sendFile(__dirname + '/data/master.geojson')
  });

  app.get('/',function(req,res){
    res.sendFile(__dirname + '/map.html');
   
  });

  app.get('/upload',function(req,res){
    res.sendFile(__dirname + '/upload.html');
   
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});