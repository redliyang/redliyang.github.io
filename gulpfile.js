let gulp = require('gulp')
let changed = require('gulp-changed')
let browserSync = require('browser-sync').create()

// //删除dist下的所有文件
// gulp.task('delete', function (cb) {
//     return del(['dist/*', '!dist/images'], cb);
// })

// //压缩html
// gulp.task('html', function () {
//     var options = {
//         removeComments: true,//清除HTML注释
//         collapseWhitespace: true,//压缩HTML
//         removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
//         removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
//         minifyJS: true,//压缩页面JS
//         minifyCSS: true//压缩页面CSS
//     };
//     gulp.src('src/*.html')
//         .pipe(changed('dist', { hasChanged: changed.compareSha1Digest }))
//         .pipe(htmlMin(options))
//         .pipe(gulp.dest('dist'))
//         .pipe(browserSync.reload({ stream: true }));
// });

// //实时编译less
// // gulp.task('less', function () {
// //     gulp.src(['./src/less/*.less']) //多个文件以数组形式传入
// //         .pipe(changed('dist/css', { hasChanged: changed.compareSha1Digest }))
// //         .pipe(less())//编译less文件
// //         .pipe(concat('index.css'))//合并之后生成index.css
// //         .pipe(cleanCSS())//压缩新生成的css
// //         .pipe(gulp.dest('dist/css'))//将会在css下生成main.css
// //         .pipe(browserSync.reload({ stream: true }));
// // });

// gulp.task('less', function () {
//     gulp.src(['./src/less/*.less']) //该任务针对的文件
//         .pipe(sourcemaps.init())
//         .pipe(changed('dist/css', { hasChanged: changed.compareSha1Digest }))
//         .pipe(less()) //该任务调用的模块
//         .pipe(cleanCSS())//压缩新生成的css
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('dist/css')) //将会在src/css下生成index.css
//         .pipe(browserSync.reload({ stream: true }));
// });

// //压缩js
// gulp.task("script", function () {
//     gulp.src(['src/js/*.js'])
//         .pipe(changed('dist/js', { hasChanged: changed.compareSha1Digest }))
//         .pipe(concat('index.js'))
//         .pipe(ugLify())
//         .pipe(gulp.dest('dist/js'))
//         .pipe(browserSync.reload({ stream: true }));
// });

// // 压缩图片
// gulp.task('images', function () {
//     gulp.src('./src/images/*.*')
//         .pipe(changed('dist/images', { hasChanged: changed.compareSha1Digest }))
//         .pipe(imageMin({
//             progressive: true,// 无损压缩JPG图片
//             svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
//             use: [pngquant()] // 使用pngquant插件进行深度压缩
//         }))
//         .pipe(gulp.dest('dist/images'))
//         .pipe(browserSync.reload({ stream: true }));
// });

// //启动热更新
// gulp.task('serve', ['delete'], function () {
//     gulp.start('script', 'less', 'html');
//     browserSync.init({
//         port: 2017,
//         server: {
//             baseDir: ['dist']
//         }
//     });
//     gulp.watch('src/js/*.js', ['script'])
//     gulp.watch('src/less/**/*.less', ['less'])
//     gulp.watch('src/*.html', ['html'])
//     gulp.watch('src/images/*.*', ['images'])
// });

gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(changed('dist', { hasChanged: changed.compareSha1Digest }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('script', function () {
    gulp.src(['src/js/*.js'])
        .pipe(changed('dist/js', { hasChanged: changed.compareSha1Digest }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('serve', function () {
    gulp.start('script', 'html')
    browserSync.init({
        port: 2018,
        server: {
            baseDir: ['dist']
        }
    })
    gulp.watch('src/js/*.js', ['script'])
    gulp.watch('src/less/**/*.less', ['less'])
    gulp.watch('src/*.html', ['html'])
    gulp.watch('src/images/*.*', ['images'])
})

gulp.task('default', ['serve'])

// {
//     "name": "gulp",
//         "version": "1.0.0",
//             "description": "auto",
//                 "main": "gulpfile.js",
//                     "scripts": {
//         "test": "echo \"Error: no test specified\" && exit 1"
//     },
//     "author": "liYang",
//         "license": "ISC",
//             "dependencies": {
//         "browser-sync": "^2.18.8",
//             "del": "^2.2.2",
//                 "gulp": "^3.9.1",
//                     "gulp-changed": "^2.0.0",
//                         "gulp-clean-css": "^3.9.0",
//                             "gulp-concat": "^2.6.1",
//                                 "gulp-filter": "^5.0.1",
//                                     "gulp-htmlmin": "^3.0.0",
//                                         "gulp-imagemin": "^3.2.0",
//                                             "gulp-less": "^3.2.0",
//                                                 "gulp-pngquant": "^1.0.12",
//                                                     "gulp-uglify": "^2.1.2",
//                                                         "gulp-postcss": "^6.0.0",
//                                                             "gulp-sourcemaps": "^2.6.0",
//                                                                 "imagemin-pngquant": "^5.0.0",
//                                                                     "autoprefixer": "^5.2.0",
//                                                                         "cssnext": "^1.8.4",
//                                                                             "jshint": "^2.9.5"
//     },
//     "devDependencies": {
//         "gulp-less": "^3.4.0"
//     }
// }
