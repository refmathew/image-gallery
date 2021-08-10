const {dest,series,src,watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();

// Transpile sass into css
function sassTranspile(){
	return src('./src/sass/style.sass', {sourcemaps: true})
		.pipe(sass()
			.on('error', sass.logError))
		.pipe(postcss([autoprefixer()]))
		.pipe(dest('./src/css', {sourcemaps: '.'}));
}
// Minify and autoprefix css
function cssBuild(){
	return src('./src/css/style.css')
		.pipe(postcss([cssnano()]))
		.pipe(dest('./dist'));
}
// Initialize browserSync server
function browserSyncServe(cb){
	browserSync.init({
		server: {
			baseDir: '.'
		}
	});
	cb();
}
// Reload browserSync
function browserSyncReload(cb){
	browserSync.reload();
	cb();
}
// Watch changes in files
function watchFiles(){
	watch('index.html', { usePolling: true}, browserSyncReload);
	watch('./src/sass/style.sass', { usePolling: true}, series(sassTranspile, browserSyncReload));
	//watch('./src/js/app.js')
}

exports.build = cssBuild;
exports.default = series(browserSyncServe, watchFiles);
