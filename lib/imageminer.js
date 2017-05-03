const {src, dest} = require('vinyl-fs');
const gulpImagemin = require('gulp-imagemin');
const hash = require('gulp-hash');
const gulpIf = require('gulp-if');
const chalk = require('chalk');

module.exports = (from, to, options) => {

  options = options || {};
  const manifest = options.manifest || 'assets-manifest.json';

  return src(from)
    .on('error', err => {
      console.log(chalk.red(err.message));
      process.exit(1);
    })
    .pipe(gulpIf(!!options.hash, hash()))
    .pipe(gulpImagemin())
    .pipe(gulpIf(!!options.hash, dest(to)))
    .pipe(gulpIf(!!options.hash, hash.manifest(manifest)))
    .pipe(dest(to));
};
