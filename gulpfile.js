const gulp = require('gulp');
const umd = require('gulp-umd');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require("babelify");


gulp.task('build', function() {
    const bundleOptions = {
        debug: false,
        entries: ["./index.js"],
    };

    return browserify(bundleOptions)
        .transform(babelify.configure({
            presets: ["es2015"],
            plugins: ["transform-function-bind", "transform-class-properties"],
            ignore: ['**/node_modules/**','*.min.js']
        }))
        .bundle()
        .pipe(source("htmlEscape.js"))
        .pipe(buffer())
        .pipe(umd())
        .pipe(gulp.dest('./dist'))
        .pipe(concat('htmlEscape.min.js'))
        .pipe(uglify({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('default', gulp.series('build'));