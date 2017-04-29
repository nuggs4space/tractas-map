# F5 The front-end build framework

The Framework Framework Framework Framework Framework. The goal of this build tool is to help
build frontend while being backend platform agnostic. So, use this on WordPress, Drupal, Custom...Webgen....


## Getting Started

TL;DR
```
npm install
gulp
```

First, ensure node is the latest and greatest version. Then, run `npm install`. This should install all the binaries you need in order to start gulp.

Next you will need to establish some paths in the `gulp-config.json` file. Edit the file and change the following path variables as you see fit. The "distribution", "themeRoot" path is what you'll want to look out for. The "distribution" should be used for final theme assets. "themeRoot" should point to your WordPress theme folder or Drupal theme folder. There are some other goodies in this file that you will want to edit later.

```
"paths" : {
  "distribution"      : "./web/CHANGE/",
  "themeRoot"         : "./web/CHANGE/",
  "source"            : "./build/theme-assets/",
  "iconFontTemplate"  : "./build/theme-assets/fonts/iconFontTemplate.tmpl",
  "sassConfigFile"    : "./build/theme-assets/site-variables.json"
},
```

## Gulp Tasks

Ah, the fun stuff. This gulpfile follows this general template;
* Concat/Compile files
* Minify Files
* Deposit files into production folder

### CSS
The CSS build process uses SASS for pre-processing and autoprefixer for post-processing. Autoprefixer is great because it automatically vendor prefixes for you based on the last 2 versions of every browser :).

```
// Individual Tasks
css-clean
css-compile
css-minify

// Full Build
css-build
```

The output of css-build will produce an unminified and minified CSS file in the distrubution folder `css/src` and `css/dist`.

### JavaScript Tasks

The JS build process uses [browserify](https://github.com/substack/node-browserify#usage) to help build modules and babelify to transpile your ES6 code into ES5 (until all browsers support ES6). It also concatenates all your JS modules into a single file.

```
// Individual Tasks
js-clean
js-compile
js-minify

// Full Build
js-build
```

#### A note on browserify

Browserify lets you do really cool stuff. It actually eliminates the need for bower as a front end package dependency. You can require JavaScript modules which you've installed with `npm` like this...

```
let $           = require('jquery');
let Backbone    = require('backbone');
let _           = require('underscore');
```

You'll also be able to write your own modules and use `require` to include them as dependencies. Horray for re-useable modules!

### Image and SVG Minification Tasks

You should place all SVG and Image.* assets in their respective `svgs` and `images` directory so the build process can minify them for prdouction use.

```
// Individual Tasks
image-clean
image-minify
svg-clean
svg-minify

// Full Build Tasks
image-build
svg-build
```

### Icon Font

This task does a couple of things. It ouputs the following;

* Icon webfonts in the production folder
* _icons.scss file with base styling

The _icons.scss is automatically generatd using a template file with is included and pathed in the `gulp-config.json`.

 It will also create a base styles for them automatically using the iconfont template. This template is included in the repo and pathed in the `gulp-config.json` file. Change it as needed.

```
// Individual Tasks
font-clean
font-compile

// Full Build - This task will also run svg-build and  css-build
font-build
```

### Sass Config Task

Builds a sass variables file from a json file. Configure the path for this file in the `gulp-config.json`.  This task is handy because it allows you to theme a site using a JSON file. Use this file to define breakpoints, fonts, and other variables.

```
// Only one Task for this
sass-config
```

THE JSON should be structured like the following...
```
{
  "colors": {
    "primary": ["#7cb82f", "#333333", "#ffffff"],
    "secondary": ["#3b95c3", "#ea961c", "#f2385a", "#000000", "#f0f0f0"],
    "tertiary": ["#9b49ac", "#723609", "#64676b", "#242424", "#dce0e0"]
  },
  "breakpoints": {
    "mobile": "641px",
    "tablet": "1025px",
    "wide": "1921px"
  },
  "fonts": {
    "primary": "'Open Sans'",
    "secondary": "'Roboto Slab'",
    "header1": "'Eagle Bd'",
    "header2": "'Eagle Bk'"
  }
}
```

### And Finally the Default Task

Once your project is all set up, you'll be mainly using the watch task to monitor JS and SASS/SCSS file changes. JS/CSS is automatically generated on file changes but every other task should be run manually.

Most tasks have a notification which triggers after your task is finished.

```
gulp
```
