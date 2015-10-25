'use strict';

var gulp       = require('gulp');
var sass       = require('gulp-sass');
var uglify     = require('gulp-uglify');
var watch      = require('gulp-watch');

var browserify = require('browserify');
var bs         = require('browser-sync');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');

gulp.task('sass', function() {
  return gulp.src('src/css/**/*.+(scss|sass)')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('browserify', function() {
  return browserify('./src/js/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/'));
});

gulp.task('bs', function() {
  bs({
    server: {
      baseDir: './',
    },
    open: false, // don't open browser
    notify: false // don't show browserSync notification/ad
  });
});

gulp.task('watch', ['bs'], function() {
  gulp.watch('src/css/**/*.+(scss|sass)', ['sass']);
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('dist/app.js', bs.reload);
  gulp.watch('index.html', bs.reload);
});

gulp.task('default', ['watch']);
