# Asp.net Core with angular2 template project

1. Create asp.net 5 project: ASP.NET 5 template-> Web Application
2. Install angular2 related NPM packages : reference quick start from http://angular.io 
3. add gulp task to copy npm packages to wwwroot/lib
```javascript
  var config = {
    libBase: 'node_modules',
    lib: [
      require.resolve('es6-shim/es6-shim.min.js'),
      require.resolve('systemjs/dist/system-polyfills.js'),
      require.resolve('systemjs/dist/system.src.js'),
      require.resolve('rxjs/bundles/Rx.js'),
      require.resolve('angular2/bundles/angular2-polyfills.js'),
      require.resolve('angular2/bundles/angular2.dev.js'),
      require.resolve('angular2/bundles/router.dev.js'),
      require.resolve('angular2/bundles/http.dev.js'),
    ]
  };

  gulp.task('build.lib', function () {
    return gulp.src(config.lib, { base: config.libBase })
      .pipe(gulp.dest(paths.webroot + 'lib'));
  });
```

4. modify Views/Home/Index.cshtml to angular boostrap page loader.
