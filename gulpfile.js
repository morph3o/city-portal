const gulp = require('gulp');
const eslint = require('gulp-eslint');
const git = require('gulp-git');
const jest = require('jest-cli');

const jestConfig = {
  rootDir: '.',
};

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

gulp.task('test', ['lint'], (done) => {
  jest.runCLI({ config: jestConfig }, '.', () => done());
});

/* eslint no-unused-vars: "off" */
gulp.task('tdd', (done) => {
  gulp.watch(['!node_modules/**', '!node_modules', './client/**/*.js',
    './models/**/*.js', './routes/**/*.js', './__tests__/**/*.js'], ['test']);
});

gulp.task('commit', ['lint', 'add-files', 'add-tests', 'test'], () =>
  gulp.src(['!node_modules/**', '!node_modules', '!.idea', '**/*'])
    .pipe(git.commit('Added tdd task to gulp'))
);
