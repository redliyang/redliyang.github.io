var gulp = require('gulp'), 
    changed = require('gulp-changed'),//检查改变状态  
    browserSync = require("browser-sync").create();//浏览器实时刷新  

// 压缩html  
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(changed('dist', { hasChanged: changed.compareSha1Digest }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
});

// 压缩js  
gulp.task("script", function () {
    gulp.src(['src/js/*.js'])
        .pipe(changed('dist/js', { hasChanged: changed.compareSha1Digest }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }));
});

// 压缩图片  
gulp.task('images', function () {
    gulp.src('./src/images/*.*')
        .pipe(changed('dist/images', { hasChanged: changed.compareSha1Digest }))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true }));
});


// 辅助热更新
gulp.task('serve', function () {
    gulp.start('script', 'html', 'images');
    browserSync.init({
        port: 2017,
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch('src/js/*.js', ['script']); //监控文件变化，自动更新  
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/images/*.*', ['images']);
});
gulp.task('default', ['serve']);  