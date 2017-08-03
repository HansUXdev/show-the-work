var gulp     	= require('gulp');
var fs 			= require('fs');
var exec 		= require('child_process').exec;
 
// 1. Clone repos
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
}

gulp.task('default', commit)