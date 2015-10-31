var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
  entryFile: './src/launcher.js',
  outputDir: './dist/',
  outputFile: 'app.js'
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); this.emit('end') })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', function() {
  return bundle();
});

gulp.task('sass', function() {
  return gulp.src('./style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
});

gulp.task('build', ['build-persistent', 'sass'], function() {
  process.exit(0);
});

function runBrowserSync() {
  browserSync({
    server: {
      baseDir: './'
    },
    online: false,
    open: false
  })
}

gulp.task('watch', ['clean', 'build-persistent', 'sass'], function() {
  runBrowserSync()

  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });

  gulp.watch("./style/**/*.scss", ['sass']);
  gulp.watch("index.html").on('change', browserSync.reload);
});

// WEB SERVER
gulp.task('serve', function () {
  runBrowserSync()
});
