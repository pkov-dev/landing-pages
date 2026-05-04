import fs from 'fs'
export const gitignore = () => {
	if (!fs.existsSync('.gitignore')) {
		fs.writeFile('./.gitignore', '', cb)
		fs.appendFile('./.gitignore', 'phpmailer/\r\n', cb)
		fs.appendFile('./.gitignore', 'package-lock.json\r\n', cb)
		fs.appendFile('./.gitignore', 'flsStartTemplate/\r\n', cb)
		fs.appendFile('./.gitignore', 'node_modules/\r\n', cb)
		fs.appendFile('./.gitignore', '.gitignore\r\n', cb)
		// fs.appendFile('./.gitignore', 'dist/\r\n', cb)
		fs.appendFile('./.gitignore', 'Source/\r\n', cb)
		fs.appendFile('./.gitignore', 'version.json\r\n', cb)
		fs.appendFile('./.gitignore', app.buildFolder + '\r\n', cb)
		fs.appendFile('./.gitignore', '**/*.zip\r\n', cb)
		fs.appendFile('./.gitignore', '**/*.rar\r\n', cb)
		fs.appendFile('./.gitignore', 'src/\r\n', cb)
		fs.appendFile('./.gitignore', 'config/\r\n', cb)
		fs.appendFile('./.gitignore', 'gulpfile.js\r\n', cb)
		fs.appendFile('./.gitignore', 'package.json\r\n', cb)
		//if (projectName !== 'flsStart') del('./.git/');
	}
	return app.gulp.src(`${app.path.srcFolder}`)
}
function cb() {}
