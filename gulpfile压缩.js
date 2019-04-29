var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var spritesmith = require('gulp.spritesmith');

// var

// 定义一个任务
// gulp.task('jsmin', function() {
//   gulp.src('src/js/demo2.js')
//       .pipe(uglify())
//       .pipe(gulp.dest('dist/js'));
// });


/*
官方方法
在不使用文件流的情况下，向task的函数里传入一个名叫done的回调函数，以结束task
done回调函数的作用是在task完成时通知Gulp（而不是返回一个流），而task里的所有其他功能都纯粹依赖Node来实现。
*/
gulp.task('jsmin', done => {
  gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));
  done();
});


// 压缩css
gulp.task('cssmin', done => {
  gulp.src('src/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'));
  done();
});


// 把压缩html当成默认任务
// gulp.task('default', done => {
//   var options = {
//     removeComments: true, //清除HTML注释
//     collapseWhitespace: true, //压缩HTML
//     collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
//     removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
//     removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
//     removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
//     minifyJS: true, //压缩页面JS
//     minifyCSS: true //压缩页面CSS
//   };

//   gulp.src('src/*.html')
//       .pipe(htmlmin(options))
//       .pipe(gulp.dest('dist/'));
//   done();
// });


//制作雪碧图
gulp.task('sprite', done => {
  gulp.src('src/png/*.png')
    .pipe(spritesmith({
      imgName: 'images/sprite20190402.png', //保存合并后图片的地址
      cssName: 'css/sprite.css', //保存合并后对于css样式的地址
      padding: 20,
      algorithm: 'binary-tree'
    }))
    .pipe(gulp.dest('dist/'));
  done();
});


//Gulp 4最大的变化就是你不能像以前那样传递一个依赖任务列表。
//不用Gulp3的方式指定依赖任务，你需要使用gulp.series
gulp.task('default', gulp.series('jsmin', 'cssmin', 'sprite'));