/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/

var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    connect = require('gulp-connect');

var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

//mac chrome: "Google chrome",
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

//将图片拷贝到目标目录
gulp.task('copy:img', function (done) {
    gulp.src(['src/img/**/*']).pipe(gulp.dest('dist/img')).on('end', done);
});

//压缩合并css, css中既有自己写的.scss, 也有引入第三方库的.css
gulp.task('scssmin', function (done) {
    gulp.src(['src/css/*.scss', 'src/css/*.css'])
        .pipe(scss().on('error', scss.logError))
        //这里可以加css sprite 让每一个css合并为一个雪碧图
        //.pipe(spriter({}))
        // .pipe(concat('*.css'))     //合并文件
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
    gulp.src('dist/css/*.css')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/app/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/app'))
        .on('end', done)
        .pipe(connect.reload());
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:img', 'scssmin'], function (done) {
    var timestamp = +new Date();
    gulp.src('dist/css/*.css')
    //     .pipe(spriter({
    //         spriteSheet: 'dist/img/spritesheet' + timestamp + '.png',
    //         pathToSpriteSheetFromCSS: '../img/spritesheet' + timestamp + '.png',
    //         spritesmithOptions: {
    //             padding: 10
    //         }
    //     }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['scssmin', 'build-js', 'fileinclude','copy:img'])
        .on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/app'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default', ['copy:img', 'fileinclude', 'md5:css', 'md5:js']);

//开发
gulp.task('dev', ['connect', 'copy:img', 'fileinclude', 'scssmin', 'build-js', 'watch', 'open']);
