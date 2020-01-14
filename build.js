// this is the build script
// it takes files from source/ and transpiles them into build/
// it takes components from components/ and substitutes them into all .html
//  files in source that use the handlebar syntax of {{ ... }}
// all non-html files are simply copied

const fs = require('fs') // for manipulation of files
const glob = require('glob') // for finding the right files
const Handlebars = require('handlebars') // for using handlebars

// getter function for directory name
function getDirname () {
	// replaces backwards slashes with forward slashes (Windows patch)
	return __dirname.replace(/\\/g, '/')
}

// it's basically the old file with /source/ replaced with /build/
function getBuildFilePathFromSourceFilePath (sourceFilePath) {
	// note that replace only replaces the first occurrence if the first argument
	//  is a string
	return sourceFilePath.replace(
		getDirname() + '/source/',
		getDirname() + '/build/'
	)
}

function getFileExtension (filePath) {
	return filePath.split('.').pop()
}

function isHtmlFile (filePath) {
	return getFileExtension(filePath) === 'html'
}

function isCssFile (filePath) {
	return getFileExtension(filePath) === 'css'
}

// create the target build/ folder if it doesn't exist yet
if (!fs.existsSync('./build/')){
	fs.mkdirSync('./build/')
	console.log('Created build folder')
}

// first we prepare all folders in the build folder
const sourceFolders = glob.sync(getDirname() + '/source/**/', {})
for (const sourceFolder of sourceFolders) {
	// identifies the new folder to be created
	const folderToCreate = getBuildFilePathFromSourceFilePath(sourceFolder)

	console.log('Preparing folder', folderToCreate)

	// create if it doesn't exists yet
	if (!fs.existsSync(folderToCreate)){
		fs.mkdirSync(folderToCreate)
		console.log('Created folder', folderToCreate)
	}
}

// second, we prepare all components
const componentSourceFiles = glob.sync(getDirname() + '/components/*.html', {})
const components = {} // creating components dictionary
for (const componentSourceFile of componentSourceFiles) {
	const componentName = componentSourceFile
		.split('/').pop() // get the actual filename
		.replace(/\.html$/, '') // remove .html at the end

	console.log('Found component', componentName)

	// Handlebars escapes the '<' and '>' characters by default, so we need to
	// explain that the strings are safe
	// API reference: http://handlebarsjs.com/reference.html
	components[componentName] = new Handlebars.SafeString(
		fs.readFileSync(componentSourceFile)
	)
}

// third, we compose all css files into a single one
console.log('Beginning CSS composition into style.css')
// find all css files inside css folder
const cssSourceFiles = glob.sync(getDirname() + '/source/css/*.css', {})
// turn them into strings
const cssString = cssSourceFiles.map(file => fs.readFileSync(file).toString())
// join all strings into one string
const cssConcatenated = cssString.join('\n')
// TODO: remove whitespace?
// write concatenated string to css file
fs.writeFileSync(getDirname() + '/build/css/style.css', cssConcatenated)
console.log('Composed all CSS files into style.css')

// finally, we transpile html files and copy non-html files
let sourceFiles = glob.sync(getDirname() + '/source/**/*', { nodir: true })
for (const sourceFile of sourceFiles) {
	// identifies the new folder to be created
	const fileToCreate = getBuildFilePathFromSourceFilePath(sourceFile)

	if (isHtmlFile(sourceFile)){
		// this is where we transpile!
		// https://github.com/wycats/handlebars.js/#usage

		// we need a string, so we use .toString()
		let workingFile = fs.readFileSync(sourceFile).toString()
		let template

		// repeated Handlebar replacement to allow for nesting
		while (workingFile.indexOf('{{') !== -1) {
			template = Handlebars.compile(workingFile)
			workingFile = template(components)
		}

		// write output
		fs.writeFileSync(fileToCreate, workingFile)
		console.log('Transpiled file', fileToCreate)

	} else if (isCssFile(sourceFile)) {
		console.log('Skipped CSS file', sourceFile)

	} else {
		fs.copyFileSync(sourceFile, fileToCreate)
		console.log('Copied file', fileToCreate)
	}
}

console.log('Success! Files built in build/')