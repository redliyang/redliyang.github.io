var gulp = require('gulp'),
    changed = require('gulp-changed'),//检查改变状态  
    browserSync = require("browser-sync").create();//浏览器实时刷新  

// 热更新
gulp.task('serve', function () {
    gulp.start('script', 'less', 'html');
    browserSync.init({
        port: 2017,
        server: {
            baseDir: ['demo']
        }
    });
    gulp.watch('demo/js/*.js', ['script']); //监控文件变化，自动更新  
    gulp.watch('demo/less/**/*.less', ['less']);
    gulp.watch('demo/*.html', ['html']);
    gulp.watch('demo/images/*.*', ['images']);
});
gulp.task('default', ['serve']);  