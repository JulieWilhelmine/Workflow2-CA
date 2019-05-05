var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpCopy = require('gulp-copy');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

gulp.task('copy', function() {
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("dist/*.css").on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('minify-images', function() {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/resized-images'))
});

gulp.task('default', ['copy', 'sass', 'serve', 'minify-css', 'minify-images'], function () {
  gulp.watch("sass/*.scss", ['sass']);
});
