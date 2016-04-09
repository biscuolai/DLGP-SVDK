/// <binding AfterBuild='vendor.min' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

//gulp.task('vendor.min.js', function () {

//    return gulp.src([
//            // Angular
//            paths.webroot + 'js/lib/angular/angular.js',
//            paths.webroot + 'js/lib/angular-ui-router/release/angular-ui-router.js',
//            paths.webroot + 'js/lib/angular-resource/angular-resource.js',
//            paths.webroot + 'js/lib/angular-deferred-bootstrap/angular-deferred-bootstrap.js',
//            paths.webroot + 'js/lib/angular-ui-grid/ui-grid.js',
//            // JQuery
//            paths.webroot + 'js/lib/jquery/dist/jquery.js',
//            paths.webroot + 'js/lib/jquery-validation/dist/jquery.validate.js',
//            paths.webroot + 'js/lib/jquery-validation/dist/additional-methods.js',
//            paths.webroot + 'js/lib/jquery-validation-unobtrusive/dist/jquery-validation-unobtrusive.js',
//            // Bootstrap
//            paths.webroot + 'js/lib/bootstrap/dist/js/bootstrap.js',
//            // Angular Bootstrap
//            paths.webroot + 'js/lib/angular-bootstrap/ui-bootstrap.js'
//        ])
//        .pipe(concat(paths.webroot + 'dist/vendor.min.js'))
//        //.pipe(uglify())
//        .pipe(gulp.dest(paths.webroot + 'dist'));
//});

//gulp.task('vendor.min.css', function () {

//    return gulp.src([
//            paths.webroot + 'js/lib/bootstrap/dist/css/bootstrap.css',
//            paths.webroot + 'js/lib/angular-ui-grid/ui-grid.css'
//    ])
//        .pipe(concat(paths.webroot + 'dist/vendor.min.css'))
//        .pipe(cssmin())
//        .pipe(gulp.dest(paths.webroot + 'dist'));
//});

//gulp.task('vendor.min', ['vendor.min.js', 'vendor.min.css']);