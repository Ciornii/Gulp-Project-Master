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
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const eslint = require('gulp-eslint');


// Define paths

const paths = {
    dist: {
        base: './dist/',
        css: './dist/styles',
        js: './dist/js',
        html: './dist/',
        assets: './dist/assets',
        img: './dist/assets/img',
        vendor: './dist/vendor'
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
        scss: './src/styles',
        node_modules: './node_modules/',
        vendor: './vendor'
    }
};

// Compile SCSS
gulp.task('scss', function () {
    return gulp.src([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0%, last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
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

gulp.task('js', function () {
    return gulp.src([paths.src.js + '/main.js'])
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream());
});

gulp.task('vendor', function () {
    return gulp.src(npmDist(), {
            base: paths.src.node_modules
        })
        .pipe(gulp.dest(paths.dist.vendor));
});

// Beautify CSS
gulp.task('beautify:css', function () {
    return gulp.src([
            paths.dev.css + '/style.css'
        ])
        .pipe(cssbeautify())
        .pipe(gulp.dest(paths.dev.css))
});

// Minify CSS
gulp.task('minify:css', function () {
    return gulp.src([
            paths.dist.css + '/style.css'
        ])
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.dist.css))
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
        .pipe(gulp.dest(paths.dist.html))
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
        .pipe(gulp.dest(paths.dist.base))
});

// Clean
gulp.task('clean:dist', function () {
    return del([paths.dist.base]);
});

// Compile and copy scss/css
gulp.task('copy:dist:css', function () {
    return gulp.src([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0%, last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css))
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
        .pipe(gulp.dest(paths.dist.base))
});

// Copy assets
gulp.task('copy:dist:assets', function () {
    return gulp.src(paths.src.assets)
        .pipe(gulp.dest(paths.dist.assets))
});

// Copy js
gulp.task('copy:dist:js', function () {
    return gulp.src(paths.src.js + '/main.js')
        .pipe(gulp.dest(paths.dist.js))
});

// Copy node_modules to vendor
gulp.task('copy:dist:vendor', function () {
    return gulp.src(npmDist(), {
            base: paths.src.node_modules
        })
        .pipe(gulp.dest(paths.dist.vendor));
});

// Copy Fonts
gulp.task('copy:dist:fonts', function () {
    return gulp.src(['src/assets/fonts/**/*'])
        .pipe(gulp.dest(paths.dist.assets + '/fonts'))
});

// minify js
gulp.task('minify:js', function () {
    return gulp.src([paths.src.js + '/**/*.js', paths.src.js + '/main.js'])
        .pipe(plumber())
        // .pipe(eslint())
        // .pipe(eslint.format())
        .pipe(webpack({
            mode: process.env.NODE_ENV,
            output: {
                filename: '[name].js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
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
    //.pipe(browserSync.stream());
})



// serve
gulp.task('serve', gulp.series('scss', 'html', 'index', 'assets', 'vendor', 'js', 'copy:dist:fonts', 'minify:js', function () {
    browserSync.init({
        server: paths.dist.base
    });

    gulp.watch([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'], gulp.series('scss'));
    gulp.watch([paths.src.js + '/**/*.js', paths.src.js + '/main.js'], gulp.series('js'));
    gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'));
    gulp.watch([paths.src.assets], gulp.series('assets'));
    gulp.watch([paths.src.vendor], gulp.series('vendor'));
}));

// build
gulp.task('build', gulp.series('clean:dist', 'copy:dist:css', 'copy:dist:html', 'copy:dist:html:index', 'copy:dist:assets', 'copy:dist:js', 'minify:css', 'minify:html', 'minify:html:index', 'copy:dist:vendor', 'copy:dist:fonts', 'minify:js', function () {
    browserSync.init({
        server: paths.dist.base
    });

    gulp.watch([paths.src.scss + '/scss/**/*.scss', paths.src.scss + '/style.scss'], gulp.series('scss'));
    gulp.watch([paths.src.js + '/**/*.js', paths.src.js + '/main.js'], gulp.series('js'));
    gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'));
    gulp.watch([paths.src.assets], gulp.series('assets'));
    gulp.watch([paths.src.vendor], gulp.series('vendor'));
}));

// Default
gulp.task('default', gulp.series('build'));