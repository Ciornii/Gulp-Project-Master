var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var del = require('del');
const htmlmin = require('gulp-htmlmin');
const cssbeautify = require('gulp-cssbeautify');
var gulp = require('gulp');
const npmDist = require('gulp-npm-dist');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const eslint = require('gulp-eslint');
var rename = require("gulp-rename");


// Define paths

const paths = {
    dist: {
        base: './dist/',
        css: './dist/styles',
        js: './dist/js',
        html: './dist/',
        assets: './dist/assets',
        img: './dist/assets/img',
    },
    base: {
        base: './',
        node: './node_modules'
    },
    src: {
        base: './src/',
        css: './src/styles',
        js: './src/js',
        html: './src/html/pages/**/*.html',
        assets: './src/assets/**/*.*',
        partials: './src/html/partials/**/*.html',
        scss: './src/styles'
    }
};

// Compile SCSS
gulp.task('scss', function () {
    return gulp.src([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'])
        .pipe(wait(500))
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0%, last 2 versions']
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
});

gulp.task('index', function () {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/html/partials/',
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.dist.base))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src([paths.src.html])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/html/partials/',
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.dist.html))
        .pipe(browserSync.stream());
});

gulp.task('assets', function () {
    return gulp.src([paths.src.assets])
        .pipe(gulp.dest(paths.dist.assets))
        .pipe(browserSync.stream());
});

// Beautify CSS
gulp.task('beautify:css', function () {
    return gulp.src([
            paths.dev.css + '/style.css'
        ])
        .pipe(cssbeautify())
        .pipe(gulp.dest(paths.dist.css));
});

// Minify CSS
gulp.task('minify:css', function () {
    return gulp.src([
            paths.dist.css + '/style.css'
        ])
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.dist.css));
});

// Minify Html
gulp.task('minify:html', function () {
    return gulp.src([paths.dist.html + '/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/html/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('minify:html:index', function () {
    return gulp.src([paths.dist.base + '*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/html/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.base));
});

// Clean
gulp.task('clean:dist', function () {
    return del([paths.dist.base]);
});

// Compile and copy scss/css
gulp.task('copy:dist:css', function () {
    return gulp.src([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'])
        .pipe(wait(500))
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0%, last 2 versions']
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css));
});

// Copy Html
gulp.task('copy:dist:html', function () {
    return gulp.src([paths.src.html])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/html/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.html));
});

// Copy index
gulp.task('copy:dist:html:index', function () {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/html/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.base));
});

// Copy assets
gulp.task('copy:dist:assets', function () {
    return gulp.src(paths.src.assets)
        .pipe(gulp.dest(paths.dist.assets));
});

// Copy Fonts
gulp.task('copy:dist:fonts', function () {
    return gulp.src(['src/assets/fonts/**/*'])
        .pipe(gulp.dest(paths.dist.assets + '/fonts'));
});

// Minify js
gulp.task('minify:js', function () {
    return gulp.src([
            paths.src.js + '/**/*.js',
            paths.src.js + '/main.js'
        ])
        .pipe(plumber())
        // .pipe(eslint())
        // .pipe(eslint.format())
        .pipe(webpack({
            mode: process.env.NODE_ENV,
            output: {
                filename: '[name].js',
            },
            devtool: "source-map",
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', {
                                debug: true,
                                corejs: 3,
                                useBuiltIns: "usage"
                            }]]
                        }
                    }
                }]
            },
            plugins: [
                new CircularDependencyPlugin(),
                new DuplicatePackageCheckerPlugin()
            ]
        }))
        .pipe(gulp.dest(paths.dist.js))
        .on("end", browserSync.reload);
})

// JS libs and plugins
gulp.task('js:libs', function () {
    return gulp
        .src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/owl.carousel/dist/owl.carousel.min.js',
            'node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest([paths.dist.js]))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// serve
gulp.task('serve', gulp.series('scss', 'html', 'index', 'assets', 'copy:dist:fonts', 'js:libs', 'minify:js',
    function () {
        browserSync.init({
            server: paths.dist.base
        });

        gulp.watch([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'], gulp.series('scss'));
        gulp.watch([paths.src.js + '/modules/*.js', paths.src.js + '/*.js', paths.src.js + '/main.js'], gulp.series('minify:js'));
        gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'));
        gulp.watch([paths.src.assets], gulp.series('assets'));
    }));

// build
gulp.task('build', gulp.series('clean:dist', 'copy:dist:css', 'copy:dist:html', 'copy:dist:html:index', 'copy:dist:assets', 'minify:css', 'minify:html', 'minify:html:index', 'copy:dist:fonts', 'js:libs', 'minify:js', function () {
    browserSync.init({
        server: paths.dist.base
    });

    gulp.watch([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'], gulp.series('scss'));
    gulp.watch([paths.src.js + '/modules/*.js', paths.src.js + '/*.js', paths.src.js + '/main.js'], gulp.series('minify:js'));
    gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'));
    gulp.watch([paths.src.assets], gulp.series('assets'));
}));

// Default
gulp.task('default', gulp.series('build'));