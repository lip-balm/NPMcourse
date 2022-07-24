const gulp = require('gulp');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const jshint = require('gulp-jshint');

gulp.task('processHTML', () => {
    gulp.src('index.html')
      .pipe(gulp.dest('dist'));
  });




		gulp.task('processJS', () => {
			gulp.src('*.js')
					.pipe(jshint({
							esversion: 6
					}))
					.pipe(jshint.reporter('default'))
					.pipe(babel({
							presets: ['env']
					}))
					.pipe(uglify())
					.pipe(gulp.dest('dist'));
	});

	gulp.task('babelPolyfill', () => {
  gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

gulp.task('babelPolyfill', () => {
	gulp.src('node_modules/babel-polyfill/browser.js')
			.pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

gulp.task('default', (callback) => {
	runSequence(['processHTML', 'processJS', 'babelPolyfill'], 'watch', callback);
});

gulp.task('watch', ['browserSync'], () => {
	gulp.watch('*.js', ['processJS']);
	gulp.watch('*.html', ['processHTML']);

	gulp.watch('dist/*.js', browserSync.reload);
	gulp.watch('dist/*.html', browserSync.reload);
});

gulp.task('browserSync', () => {
	browserSync.init({
			server: './dist',
			port: 8080,
			ui: {
					port: 8081
			}
	});
});