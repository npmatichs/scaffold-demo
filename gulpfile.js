let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let babel = require('gulp-babel');
let browserSync = require('browser-sync');

// const scriptFiles = [
//     './app/js/main.js',
// ];

// gulp.task('scripts', () => (
//     gulp.src(scriptFiles)
//         .pipe(plumber({errorHandler: errorHandler}))
//         .pipe(concat('app.min.js'))
//         // .pipe(jshint())
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         // .pipe(ngAnnotate())
//         .pipe(gulp.dest('./app/js/'))
// ));

gulp.task('nodemon', function (cb) {
	var started = false;
	
	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('browser-sync', ['nodemon'], function () {
    return browserSync({
        browser: 'chrome',
        proxy: 'http://localhost:8080',
        // port: 8080
    });
});

gulp.task('reload', function() {
    return browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    watch(['./**/*.html', './**/*.pug', './app/js/controllers/**/*.js'], function () {
        return browserSync.reload();
    });

    watch(scriptFiles, () => {
        runSequence('reload');
        // runSequence('scripts', 'reload')
    })
});