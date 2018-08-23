var browserify = require('browserify');
var vm = require('vm');
var test = require('tap').test;

test('External should work fine', (t) => {
    t.plan(1);

    process.chdir('./src/');

    var b = browserify({ basedir: '.' });
    b.external(['page']);
    b.require([
        'pdfkit', 
        { 
            file: './index.js', 
            expose: 'pdf-service' 
        }
    ]);

    b.bundle(function (err, src) {
//        console.log(src.toString('utf8'));
        if (err) return t.fail(err);
        vm.runInNewContext(
            '' + src
            + 'require("pdf-service");',
            { t: t }
        );
    });
});
