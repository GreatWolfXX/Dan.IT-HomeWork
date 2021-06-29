const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


const cleanFolder = () => {
    return gulp
        .src('./dist', {read: false, allowEmpty: true})
        .pipe(clean());
}

const addResetCSS = () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(gulp.dest('./dist/css'))
}

const compileToCss = () => {
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

const js = () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('./dist/js'))

}

const html = () => {
    return gulp
        .src('./index.html')
        .pipe(gulp.dest('./dist'));
}

const img = () => {
    return gulp
        .src('./src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
}

const browsersSyncInit = () => {
    return browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}

gulp.task('cleanFolder', cleanFolder);
gulp.task("addResetCSS", addResetCSS)
gulp.task('browsersSync', browsersSyncInit);
gulp.task('dev:html', html);
gulp.task('dev:img', img);
gulp.task('dev:css', compileToCss);
gulp.task('dev:js', js);

gulp.task('watch', () => {
    gulp.watch('./index.html', html).on('change', browserSync.reload);
    gulp.watch('./src/sass/**/*.scss', compileToCss);
    gulp.watch('./src/js/*.js', js);
    gulp.watch('./src/img/**', img);
})

gulp.task("build", gulp.series('cleanFolder', 'dev:html', 'dev:img', 'addResetCSS', 'dev:css', 'dev:js'));

gulp.task('dev', gulp.parallel('build', 'browsersSync', 'watch'));