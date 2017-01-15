const gulp = require('gulp');
const sass = require('gulp-sass');
const handlebars = require('gulp-compile-handlebars');
const data = require('./config/data');

const path = {
  templates: 'templates/**/*',
  partials: 'partials',
  scss: 'scss/*.scss'
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
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest(dest)));

gulp.task('html', () => gulp.src(path.templates)
    .pipe(handlebars(data, handlebar_options))
    .pipe(gulp.dest(dest)));


gulp.task('default', [
  'html',
  'scss'
]);

gulp.task('watch', () => gulp.watch(Object.values(path), [
  'default'
]));
