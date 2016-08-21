const gulp = require('gulp');
const eslint = require('gulp-eslint');
const git = require('gulp-git');

gulp.task('lint', () =>
  gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint({ fix: true }))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
);

gulp.task('add-tests', ['lint'], () =>
  gulp.src(['!node_modules/**', '!node_modules', './__tests__/*'])
    .pipe(git.add())
);

gulp.task('add-files', ['lint'], () =>
  gulp.src(['!node_modules/**', '!node_modules', '**/*'])
    .pipe(git.add())
);

gulp.task('commit', ['lint', 'add-files', 'add-tests'], () =>
  gulp.src('./git-test/*')
    .pipe(git.commit('initial commit', { args: '--all' }))
);

gulp.task('default', ['lint'], () => {

});
