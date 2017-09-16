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

gulp.task('build', () => 
run('node ./node_modules/react-scripts/scripts/build.js ').exec()
    .pipe(gulp.dest('output'))
)

gulp.task('default', ['dev:server']);