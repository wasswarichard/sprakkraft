import gulp from 'gulp';
import connect from 'gulp-connect';
import open from 'gulp-open';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import del from 'del';
import handlebars from 'gulp-compile-handlebars';

const paths = {
  files: {
    src: ['src/pages/**/*.html', 'src/other/**/*'],
    dest: 'dist/'
  },
  styles: {
    src: 'src/scss/main.scss',
    dest: 'dist/'
  },
  sprakchat: {
    src: 'src/scss/sprakchat.scss',
    dest: 'dist/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/'
  },
  libraries: {
    src: 'src/js/libraries/**/*',
    dest: 'dist/'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/'
  },
  templates: {
    src: 'src/pages/**/*.handlebars',
    dest: 'dist/'
  }
};

const templateOpts = {
  batch: ['src/partials']
}

function copy(src, dest) {
  gulp.src(src)
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
}

function scss(src, dest, filename) {
  return gulp.src(src)
    .pipe(sass())
    .pipe(rename(filename + '.min.css'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
}

export const clean = () => del('dist');

export function files(cb) {
  copy(paths.files.src, paths.files.dest);
  copy(paths.libraries.src, paths.libraries.dest);
  copy(paths.assets.src, paths.assets.dest);
  cb();
}

export function styles(cb) {
  scss(paths.styles.src, paths.styles.dest, 'all');
  scss(paths.sprakchat.src, paths.sprakchat.dest, 'sprakchat');
  cb();
}

export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(connect.reload());
}

export function templates() {
  return gulp.src(paths.templates.src)
    .pipe(handlebars(null, templateOpts))
    .pipe(rename(path => path.extname = '.html'))
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(connect.reload());
}

export function watch(cb) {
  gulp.watch(paths.files.src, files);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  cb();
}

const port = 8000;

export function serve(cb) {
  connect.server({
    port: port,
    root: 'dist/',
    livereload: true
  });
  cb();
}

export function browser() {
  return gulp.src('dist/index.html')
    .pipe(open({ uri: 'http://localhost:' + port}));
}

const build = gulp.series(clean, files, templates, styles, scripts, gulp.parallel(serve, watch), browser);

export default build;
