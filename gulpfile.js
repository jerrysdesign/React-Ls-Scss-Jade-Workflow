var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livescript = require('gulp-livescript'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    ext_replace = require('gulp-ext-replace'),
    plumber = require('gulp-plumber'),
    gulpJade = require('gulp-jade'),
    reactify = require('reactify'),
    jadeInheritance = require('gulp-jade-inheritance'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename');

/**
  Liens vers les fichiers sources (en entrées);
*/
var connectDevRoot = 'builds/dev/' ;
var connectProdRoot = 'builds/prod/';

var lsSources = ['src/livescript/toJS/**/*.ls'],
    lsJsxSources = ['src/livescript/toJSX/**/*.ls'],
    sassSources = ['src/scss/**/*.scss'],
    jadeSources = ['src/jade/**/*.jade'],
    htmlSources = ['builds/dev/**/*.html'],
    jsonSources = ['builds/dev/js/**/*.json'],

    concatJsSources = ['builds/dev/js/scripts/**/*.js' ];

/**
  Liens vers les fichiers sources (en sortis);
  Variable de development
*/


var devOutDir = 'builds/dev/',
    lsJsxOut = 'src/temp/jsx-temp/',
    jsOut = devOutDir + 'js/scripts/',
    sassOut = devOutDir + 'css/',
    jadeOut = devOutDir,
    jsxOut =  devOutDir + 'js/components/';

var prodOutDir = 'builds/prod/',
    prodJsOut = prodOutDir + 'js',
    prodCssOut = prodOutDir + 'css',
    prodHtmlOut = prodOutDir ;

var compassConfig = {
  sass: 'src/scss',
  css: 'builds/dev/css',
  image: 'builds/dev/images',
  style: 'expanded',
  require: ['susy', 'modular-scale', 'breakpoint']
};

/**
 * Compile les fichier Livescript en JS
 *
 */

gulp.task('lsJSX', function(){
  return gulp.src(lsJsxSources)
  .pipe(plumber())
  .pipe(livescript({bare: true})).on('error', gutil.log)
  .pipe(gulp.dest(lsJsxOut));
});


gulp.task('lsJS', function(){
  return gulp.src(lsSources)
  .pipe(plumber())
  .pipe(livescript({bare: true})).on('error', gutil.log)
  .pipe(gulp.dest(jsOut));
});


/**
 * Change les extensions des fichier JS en JSX
 *
 */
gulp.task('change', ['lsJSX'] , function() {
  gulp.src(lsJsxOut + '**/*.js')
      .pipe(ext_replace('.jsx'))
      .pipe(gulp.dest(jsxOut))
});

gulp.task('jade', function() {
  return gulp.src(jadeSources)
    .pipe(changed(jadeOut, {extension: '.html'}))
    .pipe(gulpif(global.isWatching, cached('jade')))
    .pipe(jadeInheritance({basedir: 'src/jade/'}))
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(plumber())
    .pipe(gulpJade(
      {
        pretty: true
      }
     ))
    .pipe(gulp.dest(jadeOut))
    .pipe(connect.reload())
});
/**
 * Compile les fichiers SCSS en CSS
 *
 */

gulp.task('compass', function () {
  return gulp.src(sassSources)
  .pipe(plumber())
  .pipe(compass(compassConfig)).on('error', gutil.log)
  .pipe(gulp.dest(sassOut))
  .pipe(connect.reload())
});

/**
 * Lance la commande Conect et livereload
 *
 */
gulp.task('connect', function (){
  return connect.server({
    root: connectDevRoot ,
    livereload: true
  });
});

/**
 * Browserify + reactify -> changer en build pour pouvoir débeuger plus faclement
 *
 *
 */
gulp.task('reactify', function(){
  gulp.src(jsxOut + 'main.js', { read: false })
    // .pipe(plumber())
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.jsx']
    }))
    .pipe(gulp.dest(jsOut))
    .pipe(connect.reload())
});

/**
 * Recharge la page s'il y a des modifications
 *
 */

gulp.task('concat', function() {
  return gulp.src(concatJsSources)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(devOutDir + 'js/'))
    .pipe(rename("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(devOutDir + 'js/'))
    .pipe(connect.reload())
});


gulp.task('watch', function(){
  gulp.watch(lsSources , ['lsJS']);
  gulp.watch(lsJsxSources , ['lsJSX']);
  gulp.watch(lsJsxOut + '**/*.js', ['change']);
  gulp.watch(jadeSources, ['jade']);
  gulp.watch(jsxOut + '**/*.*', ['reactify']);
  gulp.watch(sassSources, ['compass']);
});

gulp.task('default', [ 'change', 'jade', 'lsJS', 'lsJSX', 'compass', 'connect' , 'reactify',  'watch']);