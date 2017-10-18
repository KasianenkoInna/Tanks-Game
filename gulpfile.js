const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpBrowserify = require('gulp-browserify');
gulp.task('default', function () {
 gulp.src('index.js')
    .pipe(gulpBrowserify())
     .pipe(babel())
     .pipe(gulp.dest('public/dist'));
});
