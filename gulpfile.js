"use strict";
var gulp 				 = require("gulp");
var sass 				 = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var clean        = require('gulp-clean');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync').create();



gulp.task('default', ['watch']);


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
        // notify: false
    });
});

// Задача 'sass' выполняет сборку наших стилей.
gulp.task("sass", function() {
  return gulp.src("app/sass/main.scss")
  	.pipe(plumber({ // plumber - плагин для отловли ошибок.
			errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
				return {
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init()) //История изменения стилей, которая помогает нам при отладке в devTools.
    .pipe(sass()) //Компиляция sass.
		.pipe(autoprefixer({ //Добавление autoprefixer.
			browsers: ['last 2 versions']
		}))
		.pipe(cleanCSS())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({stream: true}))
});



gulp.task('libs', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});


//Задача для удаление папки build.
gulp.task('clean', function() {
	return gulp.src('build/')
		.pipe(clean());
});



gulp.task('build', ['clean'], function() {

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('build/js'));
	var buildCss = gulp.src('app/css/**/*').pipe(gulp.dest('build/css'));
	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('build/fonts'));
	var buildImg = gulp.src('app/img/**/*').pipe(gulp.dest('build/img'));
	var buildHtml = gulp.src('app/*.html').pipe(gulp.dest('build/'));

});



gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});





