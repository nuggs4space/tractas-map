'use strict';

let gulp              = require('gulp');
let babelify          = require('babelify');
let browserify        = require('browserify');
let autoprefixer      = require('gulp-autoprefixer');
let minifycss         = require('gulp-uglifycss');
let uglify            = require('gulp-uglify');
let imagemin          = require('gulp-imagemin');
let rename            = require('gulp-rename');
let concat            = require('gulp-concat');
let notify            = require('gulp-notify');
let sass              = require('gulp-sass');
let plumber           = require('gulp-plumber');
let sourcemaps        = require('gulp-sourcemaps');
let vinylSourceStream = require('vinyl-source-stream');
let svgmin            = require('gulp-svgmin');
let flatten           = require('gulp-flatten');
let sassGlob          = require('gulp-sass-glob');
let iconFont          = require('gulp-iconfont');
let consolidate       = require('gulp-consolidate');
let runSequence       = require('run-sequence');
let jsonSass          = require('gulp-json-sass');
let util              = require('gulp-util');
let del               = require('del');
let notifier          = require('node-notifier');
let twig              = require('gulp-twig');
let fs                = require('fs');

//////////////////////// Gulp Config ////////////////////////////
let config      = require('./gulp-config');
let buildDir    = config.paths.source;

// Entry point for SASS and JS modules. These files will be watched for changes
// to kick off the build process(es)
let sassRoot        = config.paths.source + 'sass/';
let mainScriptRoot  = config.paths.source + 'scripts/app.js';

// CSS/JS Dist directories belong in the project root. This is where all
// unminified and minified assets will live
let cssDist     = config.paths.distribution + 'css/';
let jsDist      = config.paths.distribution + 'js/';

// Images and SVG source directories
let imagesRoot  = config.paths.source + 'images/*';
let svgsRoot    = config.paths.source + 'svgs/*';
let imagesDist  = config.paths.distribution + 'images/';
let svgsDist    = config.paths.distribution + 'svgs/';

// Fonts and other random directories
let iconFontDist  = config.paths.distribution + 'fonts/';
let templatesRoot = config.paths.source + 'templates/';
let templatesDist = config.paths.themeRoot + 'partials/';

//////////////////////// CSS/SASS Tasks ////////////////////////////

// Removes old css before new css is moved to make sure the directory is clean
gulp.task('css-clean', () => {
  return del([cssDist]);
});

// Compiles css from sass
gulp.task('css-compile', () => {
  return gulp.src(sassRoot + '*.sass')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(cssDist + 'src'));
});

// Minifies css
gulp.task('css-minify', () => {
  return gulp.src(cssDist + 'src/*.css')
    .pipe(plumber())
    .pipe(minifycss())
    .pipe(rename( (path) => {
      path.extname = ".min.css"
    } ))
    .pipe(plumber.stop())
    .pipe(gulp.dest(cssDist + 'dist'))
});

// Clean, compile, and minify everything. Use in a watch task for best results.
gulp.task('css-build', () => {
  console.log('\n', "\x1b[31m", "  Building CSS Files", '\n');
  return runSequence('css-clean', 'css-compile', 'css-minify', () => {
    triggerNodeNotifer('Gulp', 'Finished css-build');
    return true;
  });
});

//////////////////////// JS Tasks ////////////////////////////

// Clear compiled and minified js files
gulp.task('js-clean', () => {
  return del([jsDist]);
});

// Compiles js and add ES6 support
gulp.task('js-compile', () => {
  return browserify(mainScriptRoot)
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .on('error', function(err) {
      notify().write(err);
      this.emit("end")
    })
    .pipe(vinylSourceStream('app.js'))
    .pipe(gulp.dest(jsDist + 'src'))
});

// Minified compiled js
gulp.task('js-minify', () => {
  return gulp.src(jsDist + 'src/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename( (path) => {
      path.extname = ".min.js"
    } ))
    .pipe(plumber.stop())
    .pipe(gulp.dest(jsDist + 'dist'))
});

// Clean, compile, and minify everything. Use in a watch task for best results.
gulp.task('js-build', () => {
  console.log('\n', "\x1b[32m", "  Compiling Javascript Files", '\n');
  return runSequence('js-clean', 'js-compile', 'js-minify', () => {
    triggerNodeNotifer('Gulp', 'Finished js-build');
    return true;
  });
});

//////////////////////// Image Related Tasks ////////////////////////////

// Clear compiled and minified image files
gulp.task('image-clean', () => {
  return del([imagesDist]);
});

// Minified images
gulp.task('image-minify', () => {
  return gulp.src(imagesRoot)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(plumber.stop())
    .pipe(gulp.dest(imagesDist))
});

// Runs image build tasks in order
gulp.task('image-build', () => {
  console.log('\n', "\x1b[33m", "  Minifying Image Files", '\n');
  return runSequence('image-clean', 'image-minify', () => {
    triggerNodeNotifer('Gulp', 'Finished image-build');
    return true;
  });
});

//////////////////////// SVG Tasks ////////////////////////////

// Clear compiled and minified svg files
gulp.task('svg-clean', () => {
  return del([svgsDist]);
});

// Minified images
gulp.task('svg-minify', () => {
  return gulp.src(svgsRoot)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(plumber.stop())
    .pipe(gulp.dest(svgsDist))
});

// Runs svg build tasks in order
gulp.task('svg-build', () => {
  console.log('\n', "\x1b[34m", "  Minifying SVG Files", '\n');
  return runSequence('svg-clean', 'svg-minify', () => {
    triggerNodeNotifer('Gulp', 'Finished svg-build');
    return true;
  });
});

//////////////////////// Web Fonts ////////////////////////////

// Compile icon font using all svgs available. This task will assume that all
// svgs used in the project will be converted to a font. This makes life simple.
// This task also generates a icon.scss file which contains all the glyph
// references to the newly built fonts. So, the css-build task needs to be run
// to properly generate css files.
gulp.task('font-compile', () => {
  return gulp.src(svgsRoot)
  .pipe(iconFont({
    fontName: config.iconFontName,
    normalize: true,
    formats: ['woff', 'woff2'],
  }))
  .on('glyphs', function(glyphs, options) {
    gulp.src(config.paths.iconFontTemplate)
      .pipe(consolidate('lodash', {
        glyphs: glyphs.map( function ( glyph ) {
          return { name: glyph.name, codepoint: glyph.unicode[ 0 ].charCodeAt( 0 ) };
        }),
        fontName: config.iconFontName,
        fontPath: iconFontDist
      }))
      .pipe(rename('_icons.scss'))
      .pipe(gulp.dest(sassRoot + 'global')); // Generates the glyps SCSS file
  })
  .pipe(gulp.dest(iconFontDist));
});

// Remove icons.scss file to force regenerate new glyphs
// Remove fonts/* files to force regenerate new fonts
gulp.task('font-clean', () => {
  del(sassRoot + '_icons.scss');
  del(iconFontDist);
  return true;
});

// Clean and build fonts from SVGs
gulp.task('font-build', () => {
  console.log('\n', "\x1b[33m", "  Building Fonts", '\n');
  return runSequence('svg-build', 'font-clean', 'font-compile', 'css-build', () => {
    triggerNodeNotifer('Gulp', 'Finished font-build');
    return true;
  });
});

//////////////////////// Other Tasks ////////////////////////////
gulp.task('sass-config', ()=> {
  gulp.src(config.paths.sassConfigFile)
    .pipe(jsonSass({
      sass: true
    }))
    .pipe(gulp.dest(sassRoot + 'global'))
});

//////////////////////// Styleguide /////////////////////////////
gulp.task('styleguide', () => {
  let twigData = {};
  let data = JSON.parse(fs.readFileSync(config.paths.sassConfigFile));
  twigData.data = data;

  return gulp.src(templatesRoot + 'styleguide.twig')
    .pipe(twig(twigData))
    .pipe(rename( (path) => {
      path.extname = ".php"
    } ))
    .pipe(gulp.dest(templatesDist))
});

//////////////////////// Default Tasks ////////////////////////////
gulp.task('watch', () => {
  console.log('\n', "\x1b[35m", "  Watching for changes...", '\n');
  gulp.watch('./build/theme-assets/sass/**/*.sass',  ()=> { runSequence('css-build') });
  gulp.watch('./build/theme-assets/sass/**/*.scss',  ()=> { runSequence('css-build') });
  gulp.watch('./build/theme-assets/scripts/**/*.js', ()=> { runSequence('js-build') });
});

gulp.task('default', ['watch']);

//////////////////////// Helper Functions ////////////////////////////
// Wrapper function for tirgger the node notify functionality
function triggerNodeNotifer( title, message ) {
  if( notifier ) {
    notifier.notify({
      'title'   : title,
      'message' : message,
    });
  }
}
