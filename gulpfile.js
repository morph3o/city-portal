/* eslint strict: "off" */
'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const git = require('gulp-git');
const prompt = require('gulp-prompt');
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

gulp.task('commit', ['lint', 'add-files', 'add-tests', 'test'], () => {
  let message;
  return gulp.src(['!node_modules/**', '!node_modules', '!.idea', '**/*'])
    .pipe(prompt.prompt({
      type: 'input',
      name: 'commit',
      message: 'Please enter commit message...',
    }, (res) => {
      if (res.commit && res.commit !== '') {
        gulp.src(['!node_modules/**', '!node_modules', '!.idea', '**/*'])
          .pipe(git.commit(res.commit));
      } else {
        throw Error('A message should be entered');
      }
    }));
});

gulp.task('push master', ['lint', 'test'], () => {
  git.push('origin', 'master', (err) => {
    if (err) throw err;
  });
});

gulp.task('push develop', ['lint', 'test'], () => {
  git.push('origin', 'develop', (err) => {
    if (err) throw err;
  });
});
