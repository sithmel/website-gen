const gulp = require('gulp');
const sass = require('gulp-sass');
const handlebars = require('gulp-compile-handlebars');
const data = require('./config/data');
const browserify = require('browserify');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const nodeSassImporter = require('node-sass-package-importer');

const path = {
  templates: 'templates/**/*',
  partials: 'partials',
  scss: 'scss/*.scss',
  clientjs: 'js/main.js'
};

const dest = 'docs';

const handlebar_options = {
  batch: [path.partials],
  helpers : {
    capitals : function(str){
      return str.toUpperCase();
    }
  }
};

/*
* tasks
*/

gulp.task('scss', () => gulp.src(path.scss)
  .pipe(sass({
    outputStyle: 'compressed',
    importer: nodeSassImporter
  }).on('error', sass.logError))
  .pipe(gulp.dest(dest)));

gulp.task('html', () => gulp.src(path.templates)
    .pipe(handlebars(data, handlebar_options))
    .pipe(gulp.dest(dest)));

gulp.task('build:js', () =>
  browserify(path.clientjs)
    .bundle()
    .pipe(source(path.clientjs))
    .pipe(rename({ dirname: '' }))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(dest)));

gulp.task('default', [
  'html',
  'scss',
  'build:js'
]);

gulp.task('watch', () => gulp.watch(Object.values(path), [
  'default'
]));
