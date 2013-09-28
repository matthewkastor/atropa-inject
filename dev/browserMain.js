var inject = require('../src/atropa-inject.js');

try {
    Object.keys(inject).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = inject[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-inject.js');
}

Object.keys(inject.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = inject.data[prop];
    }
);
