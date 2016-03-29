var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var path = require('path');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglifyjs');
 
gulp.task('uglify', function() {
  return gulp.src('./build/mrFeedback.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});
 
gulp.task('less', function () {
  return gulp.src('./build/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-js', function() {
  return gulp.src('./build/mrFeedback.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['less','uglify',]);