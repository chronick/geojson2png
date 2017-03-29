const geojson2Png = require('./geojson2png');
const exampleFeature = require('./example.json');

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

geojson2Png(exampleFeature, options, (err, filename) => {
  console.log(`${filename} created.`)
});
