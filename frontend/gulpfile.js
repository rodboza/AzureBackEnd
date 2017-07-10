const gulp = require('gulp')
const fs = require('fs-extra')
const util = require('gulp-util')

gulp.task('default', function() {
    fs.walk('gulpTasks').on('data', function (file) {
      if((/\.(js)$/i).test(file.path)) {
        require(file.path)
      }
    }).on('end', function () {
      gulp.start('build')
    })
})

gulp.task('build', function() {
  if(util.env.production) {
    gulp.start('deps', 'app')
  } else {
    gulp.start('deps', 'app', 'server')
  }
})
