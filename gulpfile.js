const {src, dest, watch, parallel, series} = require("gulp");

const concat = require("gulp-concat");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");
const tildeImporter = require('node-sass-tilde-importer');
const webpack = require('webpack-stream');
const babel = require("gulp-babel");


function build() {
    return src([
        "src/assets/css/style.min.css",
        "src/assets/fonts/**/*",
        "src/js/script.min.js",
        "src/*.html"
    ], {base: "src"})
        .pipe(dest("dist"));
}

function cleanDist() {
    return del("dist");
}


function images() {
    return src("src/assets/img/**/*")
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest("dist/img"));
}


function scripts() {
    return src([
        "src/js/script.js",
    ])
        .pipe(webpack({
            // Any configuration options...
        }))
        .pipe(babel({
            presets: ["@babel/preset-env"]
          }))
        .pipe(concat("script.min.js"))
        .pipe(uglify())
        .pipe(dest("src/js"))
        .pipe(browserSync.stream());
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
}

function watching() {
    watch(["src/*.html"]).on("change",browserSync.reload);
    watch(["src/js/**/*.js", "!src/js/script.min.js"],scripts);
}


exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;
exports.images = images;

exports.build = series(cleanDist, images, build);
exports.default = parallel(scripts ,browsersync, watching);