import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import rimraf        from 'rimraf';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import fs            from 'fs';

// Load all Gulp plugins into one variable
const $ = plugins();

// var gulp     	= require('gulp');
// var fs 			= require('fs');
var exec 		= require('child_process').exec;
 
const PATHS = {
	entries: [
		"./js/test.js",
		"./js/test-2.js"
	],
	dist: "dist/",
};




// 1. commit changes as they happen.
// 
// - - - - - - - - - - - - - - 
function commit(cb){
	var command = `git status && git add -A && git commit -m "changed these files" && git push`
    // Run the command
    exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    }); 
    gulp.watch("gulpfile.js").on('all', commit);
}

function watch() {
	console.log("test");
  // gulp.watch("./gulpfile.js").on('all', commit);
  // gulp.watch('src/assets/scss/**/*.scss').on('all', sass);
  gulp.watch('PATHS.entries').on('all', gulp.series(javascript));
}



let webpackConfig = {
  rules: [
    {
      test: /.js$/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }
  ]
}

function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream({module: webpackConfig}, webpack2))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

gulp.task('javascript', javascript)

gulp.task('default',
  gulp.series( 
  	commit,
  	watch
  )
);

// console.log("change");