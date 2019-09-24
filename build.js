const fs = require('fs') // for manipulation of files
const Handlebars = require('handlebars') // for using handlebars

// this is motivated by their README file
// https://github.com/wycats/handlebars.js/#usage

// we need a string, so we use .toString()
var source = fs.readFileSync('./source/index.html').toString()
var template = Handlebars.compile(source)

// Handlebars escapes the '<' and '>' characters by default, so we need to
// explain that the strings are safe
// API reference: http://handlebarsjs.com/reference.html
var navbar = new Handlebars.SafeString(
	fs.readFileSync('./source/templates/navbar.html')
)
var data = { navbar: navbar }
var result = template(data)

// write output to ./index.html
fs.writeFileSync('./index.html', result)
