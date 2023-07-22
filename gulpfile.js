const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob-use-forward");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");

// ブラウザの自動更新
const browserSync = require("browser-sync");
const browserSyncOption = {
    notify: false,
    server: "./",
};

const browserSyncFunc = () => {
    browserSync.init(browserSyncOption);
};
const browserSyncReload = (done) => {
    browserSync.reload();
    done();
};

// Sassのコンパイル
const compileSass = (done) => {
    src("./src/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>"),
            })
        )
        .pipe(
            sass({
                indentType: "tab", // インデントの種類を指定（tabまたはspace）
                indentWidth: 1, // インデントの幅を指定
            })
        )
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("./"))
        .pipe(dest("assets/css"))
        .pipe(
            notify({
                message: "コンパイル成功です!!", // 文字は好きなものに変更できる
                onLast: true,
            })
        );

    done();
};

// 画像の圧縮
const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");

const imagemin = (done) => {
    src("src/images/*")
        .pipe(
            imageMin([
                pngquant({
                    quality: [0.6, 0.7],
                    speed: 1,
                }),
                mozjpeg({ quality: 65 }),
                imageMin.svgo(),
                imageMin.optipng(),
                imageMin.gifsicle({ optimizationLevel: 3 }),
            ])
        )
        .pipe(dest("assets/images"));
    done();
};

// ファイルの更新を監視する
const watchSassFiles = () => {
    watch("src/sass/**/*.scss", series(compileSass, browserSyncReload));
    watch("src/images/*", series(imagemin, browserSyncReload));
    watch("./**/*.html", series(browserSyncReload));
};

// npx gulp で実行される
exports.default = series(parallel(imagemin, compileSass), parallel(watchSassFiles, browserSyncFunc));
