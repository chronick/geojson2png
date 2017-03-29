# geojson2png

Convert GeoJSON Feature to PNG Image

## Usage

```javascript
const geojson2Png = require('./geojson2png');

const options = {
  filename: `example.png`,
  style: {
    'stroke': '#444',
    'fill': 'none',
    'stroke-width': '3'
  },
  width: 960,
  height: 500
}

const feature = require('./example.json');

geojson2Png(feature, options, (err, filename) => {
  console.log(`${filename} created.`)
});
```
