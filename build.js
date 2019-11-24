// this is the build script
// it takes files from source/ and transpiles them into build/
// it takes components from components/ and substitutes them into all .html
//  files in source that use the handlbar syntax of {{ ... }}
// all non-html files are simply copied

const fs = require('fs') // for manipulation of files
const glob = require('glob') // for finding the right files
const Handlebars = require('handlebars') // for using handlebars

// it's basically the old file with /source/ replaced with /build/
function getBuildFilePathFromSourceFilePath (sourceFilePath) {
	// note that replace only replaces the first occurence if the first argument
	//  is a string
	return sourceFilePath.replace(
		__dirname + '/source/',
		__dirname + '/build/'
	)
}

function isHtmlFile (filePath) {
	return filePath.slice(-5) === '.html'
}

// create the target build/ folder if it doesn't exist yet
if (!fs.existsSync('./build/')){
	fs.mkdirSync('./build/')
	console.log('Created build folder')
}

// first we prepare all folders in the build folder
const sourceFolders = glob.sync(__dirname + '/source/**/', {})
for (const sourceFolder of sourceFolders) {
	// identifies the new folder to be created
	const folderToCreate = getBuildFilePathFromSourceFilePath(sourceFolder)

	console.log('Preparing folder ', folderToCreate)

	// create if it doesn't exists yet
	if (!fs.existsSync(folderToCreate)){
		fs.mkdirSync(folderToCreate)
		console.log('Created folder ', folderToCreate)
	}
}

// second, we prepare all components
const componentSourceFiles = glob.sync(__dirname + '/components/*.html', {})
const components = {} // this is where the components will go
for (const componentSourceFile of componentSourceFiles) {
	const componentName = componentSourceFile
		.split('/').pop() // get the actual filename
		.replace(/\.html$/, '') // remove .html at the end

	console.log('Found component ', componentName)

	// Handlebars escapes the '<' and '>' characters by default, so we need to
	// explain that the strings are safe
	// API reference: http://handlebarsjs.com/reference.html
	components[componentName] = new Handlebars.SafeString(
		fs.readFileSync(componentSourceFile)
	)
}

// third, we transpile html files and copy non-html files
let sourceFiles = glob.sync(__dirname + '/source/**/*', { nodir: true })
for (const sourceFile of sourceFiles) {
	// identifies the new folder to be created
	const fileToCreate = getBuildFilePathFromSourceFilePath(sourceFile)

	if (isHtmlFile(sourceFile)){
		// this is where we transpile!

		// we need a string, so we use .toString()
		const source = fs.readFileSync(sourceFile).toString()

		// this is motivated by their README file
		// https://github.com/wycats/handlebars.js/#usage
		const template = Handlebars.compile(source)
		const result = template(components)

		// write output
		fs.writeFileSync(fileToCreate, result)

		console.log('Transpiled file ', fileToCreate)
	} else {
		fs.copyFileSync(sourceFile, fileToCreate)
		console.log('Copied file ', fileToCreate)
	}
}

console.log('Success! Files built in build/')
