const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');


function scripts() {
	return src('src/js/main.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('src/js'))
		.pipe(browserSync.stream())

};

function styles() {
	return src('src/scss/index.scss')
		.pipe(autoprefixer())
		.pipe(concat('index.min.css'))
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(dest('src/css'))
		.pipe(browserSync.stream());
}

function watching() {
	browserSync.init({
		server: {
			baseDir: 'src/'
		}
	});
	watch(['src/scss/index.scss'], styles)
	watch(['src/js/main.js'], scripts)
	watch(['src/*.html']).on('change', browserSync.reload);
}

function cleanDist() {
	return src('dist')
		.pipe(clean());
}

function building() {
	return src([
		'src/css/index.min.css',
		'src/images/*.*',
		'src/js/main.min.js',
		'src/index.html'
	], { base: 'src' })
		.pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.building = building;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, watching);