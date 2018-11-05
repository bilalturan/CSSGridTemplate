var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
sass.compiler   = require('node-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server:{
            baseDir: "./"
        }
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch(['./js/**/*.js', './*.html']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/**/styles.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);