const gulp = require('gulp');
const umd = require('gulp-umd');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


gulp.task('build', function() {
    return gulp.src(['./HtmlEscape.js'])
        .pipe(umd())
        .pipe(gulp.dest('dist'))
        .pipe(concat('HtmlEscape.min.js'))
        .pipe(uglify({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('default', gulp.series('build'));