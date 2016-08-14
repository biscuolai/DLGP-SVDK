"use strict";

var gulp = require('gulp'),
    plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css'),
    autoPrefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    notify = require('gulp-notify');
var watch = require('gulp-watch');

//// if node version is lower than v.0.1.2
require('es6-promise').polyfill();

//gulp.task('app.images', function () {
//    gulp.src('./wwwroot/images/**/*')
//      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//      .pipe(gulp.dest('./wwwroot/images/dist'));
//});

gulp.task('app.min.css', function () {
    gulp.src(['./wwwroot/css/site.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(autoPrefixer())
        .pipe(minifycss())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./wwwroot/css/dist'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./wwwroot/css/dist'))
        .pipe(notify('app.min.css task finished'))
});

gulp.task('vendor.min.css', function () {
    gulp.src(
        [
            './wwwroot/lib/font-awesome/css/font-awesome.css',
            './wwwroot/lib/bootstrap/dist/css/bootstrap.min.css',
            './wwwroot/lib/angular-chart.js/dist/angular-chart.min.css',
            './wwwroot/lib/bootstrap-dialog/dist/css/bootstrap-dialog.min.css'
        ]
        )
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(autoPrefixer())
        .pipe(minifycss())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('./wwwroot/css/dist'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./wwwroot/css/dist'))
        .pipe(notify('vendor.min.css task finished'))
});

gulp.task('app.min.js', function () {
    return gulp.src(
        [
            //'./wwwroot/js/**/*.js',
            './wwwroot/js/app.js',
            './wwwroot/js/app.routes.js',
            './wwwroot/js/app.constants.js',
            './wwwroot/js/app.run.js',
            './wwwroot/js/controllers/dashboardController.js',
            './wwwroot/js/controllers/ticketController.js',
            './wwwroot/js/controllers/masterController.js',
            './wwwroot/js/controllers/alertsController.js',
            './wwwroot/js/controllers/chartController.js',
            './wwwroot/js/directives/loading.js',
            './wwwroot/js/directives/widget-body.js',
            './wwwroot/js/directives/widget-footer.js',
            './wwwroot/js/directives/widget-header.js',
            './wwwroot/js/directives/widget.js',
            './wwwroot/js/services/ticketService.js',
            './wwwroot/js/controllers/datagridController.js',
            './wwwroot/js/services/authenticationService.js',
            './wwwroot/js/app.config.js',
            './wwwroot/js/services/loginService.js',
            './wwwroot/js/controllers/loginController.js',
            './wwwroot/js/controllers/homeController.js',
            './wwwroot/js/controllers/registerController.js',
            './wwwroot/js/controllers/logoffController.js',
            './wwwroot/js/directives/form-helpers.js',
            './wwwroot/js/services/messageService.js',
            './wwwroot/js/controllers/forgotPasswordController.js',
            './wwwroot/js/controllers/resetPasswordController.js',
            './wwwroot/js/services/fileUpload.js',
            './wwwroot/js/directives/route-refresh.js',
            './wwwroot/js/directives/mark-notification-as-read.js'
        ]
        )
      .pipe(plumber({
          errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
      }))
      .pipe(concat('app.min.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('./wwwroot/js/dist/'))
      .pipe(notify('app.min.js task finished'))
});

// Fonts
gulp.task('app.fonts', function () {
    return gulp.src([
                    './wwwroot/fonts/montserrat-regular-webfont.*',
                    './wwwroot/lib/bootstrap/fonts/glyphicons-halflings-regular.*',
                    './wwwroot/lib/font-awesome/fonts/fontawesome-webfont.*'
    ])
    .pipe(gulp.dest('./wwwroot/css/fonts'))
    .pipe(notify('app.fonts task finished'))
});

gulp.task('vendor.min.js', function () {
    return gulp.src(
        [
            './wwwroot/lib/angular/angular.js',
            './wwwroot/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './wwwroot/lib/angular-ui-router/release/angular-ui-router.min.js',
            './wwwroot/lib/angular-cookies/angular-cookies.min.js',
            './wwwroot/lib/jquery/dist/jquery.js',
            './wwwroot/lib/bootstrap/dist/js/bootstrap.js',
            './wwwroot/lib/angular-aria/angular-aria.min.js',
            './wwwroot/lib/angular-messages/angular-messages.min.js',
            './wwwroot/lib/angular-route/angular-route.min.js',
            './wwwroot/lib/angular-smart-table/dist/smart-table.min.js',
            './wwwroot/lib/Chart.js/Chart.js',
            './wwwroot/lib/angular-chart.js/dist/angular-chart.js',
            './wwwroot/lib/angular-resource/angular-resource.min.js',
            './wwwroot/lib/bootstrap-dialog/dist/js/bootstrap-dialog.min.js',
            './wwwroot/lib/ng-file-upload/ng-file-upload-shim.min.js',
            './wwwroot/lib/ng-file-upload/ng-file-upload.min.js'
        ]
        )
      .pipe(plumber({
          errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
      }))
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./wwwroot/js/dist/'))
      .pipe(notify('vendor.min.js task finished'))
});

gulp.task('watch', function () {
    gulp.watch('files', ['app.min.css', 'vendor.min.css', 'app.min.js', 'vendor.min.js', 'app.fonts', 'app.images']);
});

///// <binding AfterBuild='vendor.min' Clean='clean' />
//"use strict";

//var gulp = require("gulp"),
//    rimraf = require("rimraf"),
//    concat = require("gulp-concat"),
//    cssmin = require("gulp-cssmin"),
//    uglify = require("gulp-uglify");

//var paths = {
//    webroot: "./wwwroot/"
//};

//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.css = paths.webroot + "css/**/*.css";
//paths.minCss = paths.webroot + "css/**/*.min.css";
//paths.concatJsDest = paths.webroot + "js/site.min.js";
//paths.concatCssDest = paths.webroot + "css/site.min.css";

//gulp.task("clean:js", function (cb) {
//    rimraf(paths.concatJsDest, cb);
//});

//gulp.task("clean:css", function (cb) {
//    rimraf(paths.concatCssDest, cb);
//});

//gulp.task("clean", ["clean:js", "clean:css"]);

//gulp.task("min:js", function () {
//    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
//        .pipe(concat(paths.concatJsDest))
//        .pipe(uglify())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min:css", function () {
//    return gulp.src([paths.css, "!" + paths.minCss])
//        .pipe(concat(paths.concatCssDest))
//        .pipe(cssmin())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min", ["min:js", "min:css"]);

////gulp.task('vendor.min.js', function () {

////    return gulp.src([
////            // Angular
////            paths.webroot + 'js/lib/angular/angular.js',
////            paths.webroot + 'js/lib/angular-ui-router/release/angular-ui-router.js',
////            paths.webroot + 'js/lib/angular-resource/angular-resource.js',
////            paths.webroot + 'js/lib/angular-deferred-bootstrap/angular-deferred-bootstrap.js',
////            paths.webroot + 'js/lib/angular-ui-grid/ui-grid.js',
////            // JQuery
////            paths.webroot + 'js/lib/jquery/dist/jquery.js',
////            paths.webroot + 'js/lib/jquery-validation/dist/jquery.validate.js',
////            paths.webroot + 'js/lib/jquery-validation/dist/additional-methods.js',
////            paths.webroot + 'js/lib/jquery-validation-unobtrusive/dist/jquery-validation-unobtrusive.js',
////            // Bootstrap
////            paths.webroot + 'js/lib/bootstrap/dist/js/bootstrap.js',
////            // Angular Bootstrap
////            paths.webroot + 'js/lib/angular-bootstrap/ui-bootstrap.js'
////        ])
////        .pipe(concat(paths.webroot + 'dist/vendor.min.js'))
////        //.pipe(uglify())
////        .pipe(gulp.dest(paths.webroot + 'dist'));
////});

////gulp.task('vendor.min.css', function () {

////    return gulp.src([
////            paths.webroot + 'js/lib/bootstrap/dist/css/bootstrap.css',
////            paths.webroot + 'js/lib/angular-ui-grid/ui-grid.css'
////    ])
////        .pipe(concat(paths.webroot + 'dist/vendor.min.css'))
////        .pipe(cssmin())
////        .pipe(gulp.dest(paths.webroot + 'dist'));
////});

////gulp.task('vendor.min', ['vendor.min.js', 'vendor.min.css']);