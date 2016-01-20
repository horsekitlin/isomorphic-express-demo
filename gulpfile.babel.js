// generated on 2015-08-15 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import webpack from 'webpack-stream';
import config from './webpack.config.js';
import server from 'gulp-develop-server';

gulp.task('react-bundle', () => {
    return gulp.src('./app/main.jsx')
    .pipe(webpack(config))
    .pipe(gulp.dest('./server/public'));
});

gulp.task('default', ['react-bundle'], () => {
    server.listen({
    env : {
        DEBUG : 'http'
    },
    path : './index.js',
    });
    gulp.watch('./app/**/*', ['react-bundle']);
    gulp.watch('./server/**/**/*').on('change', function(err){
        server.restart();
    });
});
