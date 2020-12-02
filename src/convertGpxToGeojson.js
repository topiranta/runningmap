const masterFilePath = 'data/master.geojson';
var tj = require('@mapbox/togeojson');
var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var geoJsonMerge = require('@mapbox/geojson-merge');



module.exports = {
    convert: function (filepath) {

        console.log(filepath.toString());

        var file = fs.readFileSync(filepath, 'utf-8');
        var gpx = new DOMParser().parseFromString(file);
        
        var converted = tj.gpx(gpx);
        var convertedPath = filepath.replace('.gpx', '.geojson');

        fs.rmSync(filepath);

        if (fs.existsSync(masterFilePath)) {
            var readmaster = fs.readFileSync(masterFilePath);
            readmaster = JSON.parse(readmaster);
            var merged = geoJsonMerge.merge([converted, readmaster]);
            fs.writeFileSync(masterFilePath, JSON.stringify(merged));



        } else {

            fs.writeFileSync(masterFilePath, JSON.stringify(converted)); 
            

        }



        return "File uploaded";
    }
}
