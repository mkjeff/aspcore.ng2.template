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

5. use angular/router for '/home' SPA
    - <a href="http://blog.mgechev.com/2015/12/30/angular2-router-dynamic-route-config-definition-creation/"> Dynamic Route Configuration </a>
        > Change route config at runtime
        > Dynamic load component: Component-proxy or AsyncRoute
    - <a href="https://auth0.com/blog/2015/05/14/creating-your-first-real-world-angular-2-app-from-authentication-to-calling-an-api-and-everything-in-between/">Custom router-outlet for auth protected route</a> 
     
6. add OpenIddict to support OAuth

#### To-Do: add Login component for SPA client login 
