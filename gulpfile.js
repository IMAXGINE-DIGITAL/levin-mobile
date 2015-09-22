var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var uglifyjs = require('gulp-uglify');
var concat = require('gulp-concat');
var through2 = require('through2');
var path = require('path');
var cwd = process.cwd();

function webpackBundle(watch) {
    webpackConfig.watch = !!watch;

    return gulp.src('./src/main.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./'));
}

gulp.task('webpack', ['imagelist'], function () {
    return webpackBundle(false);
});

function imagelist(filepath) {
    var list = [];

    return through2.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb();
            return;
        }
        
        if (file.stat.isFile() && !file.path.match(/\.ignore$/)) {
            list.push(path.relative(cwd, file.path));
        }

        cb();
    }, function(cb) {
        var fileContent = 'export default ' + JSON.stringify(list);
        var file = new gutil.File();

        file.path = filepath;
        file.contents = new Buffer(fileContent);

        this.push(file);

        cb();
    });
}

gulp.task('imagelist', function () {
    return gulp.src(['./images/**/*'])
        .pipe(imagelist('imagelist.js'))
        .pipe(gulp.dest('./src/'))
});

gulp.task('watch', function() {
    var bundle = webpackBundle(true);
    var images = gulp.watch(['./images/**/*'], ['imagelist']);
    return Promise.all([bundle, images]);
});

gulp.task('dist', ['imagelist', 'webpack'], function() {
    return gulp.src(['./src/promisePolyfill.js', './temp/levin.js'])
        .pipe(concat('levin.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['imagelist', 'webpack']);