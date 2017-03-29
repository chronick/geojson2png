const jsdom = require('jsdom');
const svg2png = require('svg2png');
const fs = require('fs');

// need to load these as scripts in jsdom instead of require()
// so they have access to the DOM enviroment
const scripts = [
  'node_modules/d3/build/d3.min.js',
  'node_modules/d3-geo/build/d3-geo.min.js',
  'node_modules/d3-selection-multi/build/d3-selection-multi.min.js'
]

module.exports = (feature, options, cb) => {
  if (feature.type != 'Feature') {
    throw new Error('Must supply a single GeoJSON feature')
  }

  jsdom.env("<svg></svg>", scripts, function(errors, window) {
    const d3 = window.d3;

    const {
      filename = 'out.png',
      style = { // very basic styles
        'stroke': '#444',
        'fill': 'none',
        'stroke-width': '3'
      },
      width = 500,
      height = 500,
      projection = d3.geoMercator()
    } = options;

    const svg = d3.select("svg")
      .attr('width', width)
      .attr('height', height);

    const path = d3.geoPath()
      .projection(projection.fitSize([width, height], feature));

    svg.selectAll('path')
      .data([feature])
      .enter().append('path')
        .styles(style)
        .attr('d', path);

    const node = svg.node();

    // set the xmlns attribute on the root node
    node.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // write the XML declaration first
    const fullSvg = '<?xml version="1.0" standalone="yes"?>'.concat(node.outerHTML);
    const buf = Buffer.from(fullSvg, 'utf8');

    // run through svg2png and write to file
    svg2png(buf).then((buffer) => fs.writeFile(filename, buffer, (err) => {
      cb(err, filename);
    }));
  });
}
