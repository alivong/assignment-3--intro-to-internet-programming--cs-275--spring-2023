const {src, dest, watch, series} = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssCompressor = require(`gulp-clean-css`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let lintCSS = () => {
    return src(`styles/main.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJS = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};


let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/styles`));
};

let compressJS = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let serve = () => {
    browserSync({
        notify: true,
        server: {
            baseDir: [
                `temp`
            ]
        }
    });

    watch(`styles/*.css`)
        .on(`change`, reload, lintCSS);

    watch(`scripts/*.js`)
        .on(`change`, reload, lintJS);
};

let copyProcessedAssestsforDev = () => {
    return src([
        `styles/main.css`
    ])
        .pipe(dest(`temp/styles`));
};

let copyUnprocessedAssestsforDev = () => {
    return src([
        `index.html`
    ], {dot: true})
        .pipe(dest(`temp`));
};

exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.transpileJS = transpileJS;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.serve = serve;
exports.copyProcessedAssestsforDev = copyProcessedAssestsforDev;
exports.copyUnprocessedAssestsforDev = copyUnprocessedAssestsforDev;
exports.default = series (
    lintCSS,
    lintJS,
    transpileJS,
    copyProcessedAssestsforDev,
    copyUnprocessedAssestsforDev,
    serve
);
exports.build = series (
    compressHTML,
    compressCSS,
    compressJS
);
