const
    {src, dest} = require('gulp'),
    terser      = require('gulp-terser'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename')

module.exports = function scripts() {
    return src('assets/scripts/*.js')
        .pipe(plumber())
        .pipe(terser())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('public/scripts'))
}