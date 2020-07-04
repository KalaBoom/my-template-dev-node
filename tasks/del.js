// Удаляет все файлы в build
const del = require('del')

module.exports = function clean(cb) {
    return del(['public/styles/*.css', 'public/scripts/*.js']).then(() => {
        cb()
    })
}