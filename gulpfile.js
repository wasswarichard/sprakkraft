var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

handlebars.Handlebars.registerHelper('next', function(context, idx, options){
    if (context[idx + 1]){
        return options.fn(context[idx + 1])
    }else{
        return "";
    }
    
});
 
 // compile index.handlebars with data from  content.js
gulp.task('default', function () {
    var templateData = {
       contact: "<h3>Contact us</h3><p>We welcome you and all your inquiries, suggestions and feedback.</p>"
   };
    options = {};
 
    return gulp.src('./src/pages/index.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
});


 gulp.task('watch', function(){
     gulp.watch(['index.handlebars'], ['handlebars'])
 });


 //gulp.task('default', ['handlebars', 'watch']);