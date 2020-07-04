const
    {src, dest}  = require('gulp'),
    clean        = require('gulp-clean-css'),
    plumber      = require('gulp-plumber'),
    toCSS        = require('gulp-sass'),
    rename       = require('gulp-rename'),
    shorthand    = require('gulp-shorthand'),
    autoprefixer = require('gulp-autoprefixer')

module.exports = function styles() {
    return src('assets/scss/*.scss')
        .pipe(plumber())
        .pipe(toCSS())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(clean({
            debug: true,
            compatibility: '*',
            level: 2
        }, details => {
            console.log(`${details.name}: Original:${details.stats.originalSize} - Min:${details.stats.minifiedSize}`)
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('public/styles'))
}