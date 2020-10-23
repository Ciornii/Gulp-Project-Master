var gulp = require('gulp'),
   gutil = require('gulp-util'),
   //sass           = require('gulp-sass'),
   browserSync = require('browser-sync'),
   concat = require('gulp-concat'),
   uglify = require('gulp-uglify'),
   cleanCSS = require('gulp-clean-css'),
   rename = require('gulp-rename'),
   del = require('del'),
   tinypng = require('gulp-tinypng'),
   cache = require('gulp-cache'),
   autoprefixer = require('gulp-autoprefixer'),
   ftp = require('vinyl-ftp'),
   notify = require('gulp-notify'),
   rsync = require('gulp-rsync'),
   gcmq = require('gulp-group-css-media-queries'),
   rigger = require('gulp-rigger'),
   vfs = require('vinyl-fs'),
   scss = require('gulp-sass');
//converter 	 = require('sass-convert');

/*global require*/

gulp.task('scss', function () {
   gulp
      .src('dev/sass/style.scss')
      .pipe(
         scss()
         // {"bundleExec": true}
      )

      .pipe(browserSync.reload({
         stream: true
      }))

      .pipe(gulp.dest('app/css'));
});

// gulp.task('replace-sass',function (){
// 	vfs.src('dev/sass/.scss')
//   .pipe(converter({
//     from: 'scss',
//     to: 'sass',
//   }))
//   .pipe(rename("media_mix"))
//   .pipe(vfs.dest('dev/sass/'));
// })
//var runSequence = require('run-sequence');
//var uglify = require('gulp-uglify');
//var pump = require('pump');
var removeHtmlComments = require('gulp-remove-html-comments');
//var strip = require('gulp-strip-comments');
//const del = require('del');
var replace = require('gulp-replace');
//var replace_two = require('gulp-replace-task');
//var replace_three = require('gulp-string-replace');
//var useref = require('gulp-useref');
//var replaceall = require("replaceall");
//var glob = require("glob");
// Скрипты проекта
// gulp.task('html' , function () {
//     gulp.src('dev/*.html')
//         .pipe(rigger())
//         .pipe(gulp.dest('app/'))
// });
// gulp.task('move',function() {
// 	return gulp.src([
// 		'dev/img/*',
// 		'dev/img/*/*',
// 	]).pipe(gulp.dest('app/img/'))
// })
gulp.task('html', function () {
   return gulp
      .src('dev/*.html') //Выберем файлы по нужному пути
      .pipe(rigger()) //Прогоним через rigger
      .pipe(gulp.dest('app/'))
      .pipe(browserSync.reload({
         stream: true
      })); //И перезагрузим наш сервер для обновлений
});
gulp.task('common-js', function () {
   return gulp
      .src(['dev/js/common.js'])
      .pipe(concat('common.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function () {
   return gulp
      .src([
         'node_modules/jquery/dist/jquery.min.js',
         'node_modules/owl.carousel/dist/owl.carousel.min.js',
         'dev/libs/jquery.nice-select.min.js',
         'dev/libs/wow.min.js',
         'dev/libs/be-lazy.js',
         'dev/libs/jquery.magnific-popup.min.js',
         'dev/libs/aos.js',
         'dev/libs/slick/slick.min.js',
         'dev/js/common.js'
      ])
      .pipe(concat('scripts.min.js'))
      .pipe(uglify()) // Минимизировать весь js (на выбор)
      .pipe(gulp.dest('app/js'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

gulp.task('browser-sync', function () {
   browserSync({
      server: {
         baseDir: 'app'
      },
      notify: false
      // tunnel: true,
      // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
   });
});

// gulp.task('scss', function() {
// 	return gulp.src('dev/sass/style.scss')
// 	.pipe(scss({outputStyle: 'expand'}).on("error", notify.onError()))
// 	.pipe(autoprefixer(['last 2 versions']))
// 	// Опционально, закомментировать при отладке
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(browserSync.reload({stream: true}));
// });

gulp.task('gmc', ['scss'], function () {
   gulp
      .src(['app/css/style.css'])
      .pipe(gcmq())
      .pipe(cleanCSS({
         compatibility: 'ie8'
      }))
      .pipe(gulp.dest('dist/css'));
});
gulp.task(
   'watch',
   ['removeapp', 'html', 'scss', 'js', 'imagemove', 'imagemin', 'fontsmove', 'browser-sync'],
   function () {
      gulp.watch('dev/sass/*.scss', ['scss']);
      gulp.watch(['libs/**/*.js', 'dev/js/common.js'], ['js']);
      gulp.watch(['dev/*/*.html', 'dev/*.html'], ['html']);
   }
);

gulp.task('imagemin', function () {
   return (
      gulp
      .src('dev/img/**/*')
      // .pipe(tinypng('6cdX1tpmG6zvq8mW77RzMWRRY6W7Tgrk'))
      .pipe(gulp.dest('dist/img'))
   );
});
gulp.task('imagemove', function () {
   return gulp.src('dev/img/**/*').pipe(gulp.dest('app/img'));
});

gulp.task('imagemove-dist', function () {
   return gulp.src('dev/img/**/*').pipe(gulp.dest('dist/img'));
});

gulp.task('fontsmove', function () {
   return gulp.src('dev/fonts/**/*').pipe(gulp.dest('app/fonts'));
});

gulp.task('build', ['removedist', 'gmc', 'js', 'removeCommentsHTML', 'imagemove-dist'], function () {
   var buildFiles = gulp.src(['app/*.html', 'app/.htaccess']).pipe(gulp.dest('dist'));

   // var buildCss = gulp.src([
   // 	'app/css/style.css',
   // 	]).pipe(gulp.dest('dist/css'));

   var buildJs = gulp.src(['app/js/scripts.min.js']).pipe(gulp.dest('dist/js'));

   var buildFonts = gulp.src(['app/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
});

gulp.task('changeCSS', function () {
   gulp
      .src(['./dist/css/*.css'])
      // '.\/assets\/imgs\/'
      .pipe(
         replace(/\.\/assets\/imgs\//g, () => {
            return '/img/';
         })
      )
      .pipe(
         replace(/\/assets\/imgs\//g, () => {
            return '/img/';
         })
      )
      // .pipe(replace(/\/assets\/fonts\//g,()=>{
      //   return  './assets/fonts/';
      // }) )
      .pipe(gulp.dest('./dist/costea_css'));
});

gulp.task('removeCommentsHTML', function () {
   return gulp
      .src('./dist/*.html')
      .pipe(removeHtmlComments())
      .pipe(gulp.dest('./dist'));
});

gulp.task('removedist', function () {
   return del.sync('dist');
});
gulp.task('removeapp', function () {
   return del.sync('app');
});
gulp.task('clearcache', function () {
   return cache.clearAll();
});

gulp.task('default', ['watch']);