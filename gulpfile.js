const gulp = require('gulp');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const run = require('gulp-run');

gulp.task('dev:server', () => {
  nodemon({
      script: 'server/index.js',
      ext: 'js' ,
      ignore: ['gulp*', 'assets*']
  });
});

gulp.task('default', ['dev:server']);