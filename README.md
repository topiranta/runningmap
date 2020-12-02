# Running Map
This Node.js server converts GPX files downloaded for example from Strava to GeoJSON, merges them and shows your running heatmap.

Root page shows the map. In order it to work properly, a [Mapbox access token](https://docs.mapbox.com/mapbox.js/api/v3.3.1/) needs to be inserted into [map.html](https://github.com/topiranta/runningmap/blob/main/src/map.html). Initial location and zoom level of the map can be edited in map.html too.

One can add a GPX file in /upload. Every uploaded GPX is converted to GeoJSON format before merging into master file located in data/master.geojson.
