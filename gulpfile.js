var gulp = require('gulp'),
    concat = require('gulp-concat'),//- 多个文件合并为一个；  
    cleanCSS = require('gulp-clean-css'),//- 压缩CSS为一行；  
    ugLify = require('gulp-uglify'),//压缩js  
    imageMin = require('gulp-imagemin'),//压缩图片  
    pngquant = require('imagemin-pngquant'), // 深度压缩  
    htmlMin = require('gulp-htmlmin'),//压缩html  
    changed = require('gulp-changed'),//检查改变状态  
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less')//压缩合并less  
    del = require('del')
    browserSync = require("browser-sync").create();//浏览器实时刷新  

删除dist下的所有文件  
gulp.task('delete', function (cb) {
    return del(['dist/*', '!dist/images'], cb);
})

压缩html  
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释  
        collapseWhitespace: true,//压缩HTML  
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"  
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"  
        minifyJS: true,//压缩页面JS  
        minifyCSS: true//压缩页面CSS  
    };
    gulp.src('src/*.html')
        .pipe(changed('dist', { hasChanged: changed.compareSha1Digest }))
        .pipe(htmlMin(options))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
});

实时编译less  
gulp.task('less', function () {
    gulp.src(['./src/less/*.less']) //多个文件以数组形式传入  
        .pipe(changed('dist/css', { hasChanged: changed.compareSha1Digest }))
        .pipe(less())//编译less文件  
        .pipe(concat('index.css'))//合并之后生成index.css  
        .pipe(cleanCSS())//压缩新生成的css  
        .pipe(gulp.dest('dist/css'))//将会在css下生成main.css  
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('less', function () {
    gulp.src(['./src/less/*.less']) //该任务针对的文件
        .pipe(sourcemaps.init())
        .pipe(changed('dist/css', { hasChanged: changed.compareSha1Digest }))
        .pipe(less()) //该任务调用的模块
        .pipe(cleanCSS())//压缩新生成的css  
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css')) //将会在src/css下生成index.css
        .pipe(browserSync.reload({ stream: true }));
});

压缩js  
gulp.task("script", function () {
    gulp.src(['src/js/*.js'])
        .pipe(changed('dist/js', { hasChanged: changed.compareSha1Digest }))
        .pipe(concat('index.js'))
        .pipe(ugLify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }));
});

压缩图片  
gulp.task('images', function () {
    gulp.src('./src/images/*.*')
        .pipe(changed('dist/images', { hasChanged: changed.compareSha1Digest }))
        .pipe(imageMin({
            progressive: true,// 无损压缩JPG图片  
            svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性  
            use: [pngquant()] // 使用pngquant插件进行深度压缩  
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true }));
});

启动热更新  
gulp.task('serve', ['delete'], function () {
    gulp.start('script', 'less', 'html');
    browserSync.init({
        port: 2017,
        server: {
            baseDir: ['dist'] 
        }
    });
    gulp.watch('src/js/*.js', ['script']);         //监控文件变化，自动更新  
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/images/*.*', ['images']);
});

gulp.task('default', ['serve']);  