const fs = require('fs');

let html = fs.readFileSync('gas_template.html', 'utf8');
const css = fs.readFileSync('bundled_style.css', 'utf8');
const js = fs.readFileSync('bundled_mario.js', 'utf8');

html = html.replace('{{CSS_CONTENT}}', () => css);
html = html.replace('{{JS_CONTENT}}', () => js);

fs.writeFileSync('gas_export/Index.html', html);
console.log('Final Index.html created in gas_export/');