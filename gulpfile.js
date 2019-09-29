var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    svgstore = require('gulp-svgstore'),
    posthtml = require('gulp-posthtml'),
    include = require('posthtml-include');

var path = {
  src: {
    html: 'src/*.html',
    styles: 'src/styles/*.scss',
    scripts: 'src/scripts/*.js',
    images: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
    svg: 'src/images/svg/'
  },

  build: {
    html: 'build/',
    styles: 'build/styles/',
    scripts: 'build/scripts/',
    images: 'build/images/',
    fonts: 'build/fonts/'
  },

  watch: {
    html: 'src/**/*.html',
    styles: 'src/styles/**/*.scss',
    scripts: 'src/scripts/**/*.js',
    images: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },

  clean: 'build'
};

gulp.task('clean:build', function () {
  return del(path.clean);
});

gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task('styles:build', function () {
  return gulp.src(path.src.styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      remove: true,
      cascade: false
    }))
    .pipe(gulp.dest(path.build.styles))
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.basename += '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.styles))
    .pipe(browserSync.stream());
});

gulp.task('scripts:build', function () {
  return gulp.src(path.src.scripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(path.build.scripts))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.scripts))
    .pipe(browserSync.stream());
});

gulp.task('imagemin:build', function () {
  return gulp.src(path.src.images)
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(path.build.images));
})

gulp.task('sprite:build', function () {
  return gulp.src(path.src.images + 'icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('path.build.images'));
});

gulp.task('copy:build', function () {
  return gulp.src([path.src.images, path.src.fonts], {base: 'src'})
    .pipe(gulp.dest('build'));
})

gulp.task('serve', function () {
  browserSync.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(path.src.styles);
  gulp.watch(path.src.scripts);
  gulp.watch(path.src.html);
});

gulp.task('build', gulp.series('clean:build', gulp.parallel('html:build', 'styles:build', 'scripts:build', 'copy:build', 'sprite:build')));
gulp.task('dev', gulp.series('build', 'serve'));
