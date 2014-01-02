;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var atropa = {};

/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>

/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa;
atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],2:[function(require,module,exports){
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

},{"../src/atropa-inject.js":3}],3:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/**
 * Required module, the docs for it are in the <code>
 *  atropa-setAsOptionalArg/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-setAsOptionalArg/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-setAsOptionalArg/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header


atropa.requires(
    'inject',
    function () {
        "use strict";
        if(document.createElement === undefined) {
            return false;
        }
        return true;
    }
);

/**
 * Contains tools for injecting elements and assemblies.
 * into the page.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @namespace Contains tools for injecting elements and assemblies.
 * @requires atropa.data
 * @requires atropa.supportCheck
 * @requires atropa.setAsOptionalArg
 */
atropa.inject = {};
/**
 * Generic Element Injector.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} elementType The type of element to be injected.
 * @param {HTML DOM Document} docref Optional. A reference to the document to
 *  target, defaults to <code>document</code>.
 * @param {DOM Node} parentNod Optional. A reference to the parent node to
 *  target, defaults to <code>docref.body</code>.
 * @param {Object} attributes Optional. An object whose properties are names of
 *  HTML attributes, defaults to <code>{}</code>. The value of these properties
 *  are to be strings representing the values of the HTML attributes as they are
 *  to be applied to the injected element.
 * @example Example attributes object :
 *
 * attributesObj = {
 *     "id" : "elementID",
 *     "class" : "classy"
 * };
 * @param {Function} onloadHandler Optional. If the element being injected will
 *  fire a load event, this function will be called. Defaults to
 *  <code>function () {}</code>.
 * @param {Function} callback Optional. This function will be called just before
 *  the element is to be appended to the page. The callback will receive the
 *  element in its current state for any additional processing to be done prior
 *  to it's attachment on callback completion. Defaults to
 *  <code>function () {}</code>.
 * @return {HTML Element} Returns a reference to the HTML Element created and
 *  injected.
 * @see <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
 * http://www.w3.org/Security/wiki/Same_Origin_Policy</a>
 * @example
 *  // this will inject a div element into the document body.
 *  var el = atropa.inject.element ('div');
 *  
 *  // This will inject a div with the id "myId" into the element referenced by
 *  // "container"
 *  var el = atropa.inject.element (
 *      'div', document, container, { 'id': 'myId' }, null, null
 *  );
 *  
 *  // this will inject a div into the document of an iframe referenced with "fdoc"
 *  // Just before the div is injected the callback will be called and the element
 *  // may be augmented. When the callback returns the element will be injected.
 *  var fdoc = document.getElementById('someFrame').contentWindow.document;
 *  
 *  var el = atropa.inject.element (
 *      'div', fdoc, fdoc.body, { 'id': 'myId' },
 *      null,
 *      function (myDiv) {
 *          myDiv.textContent = 'I could have attached event handlers';
 *      }
 *  );
 *  
 *  // this will inject an iframe into the document
 *  // once the iframe's document has finished loading the onload handler will be
 *  // called. If the document and the iframe are on the same domain, scripts on
 *  // the frame and the parent document will be able to commuincate with each
 *  // other.
 *  function iframeHasLoaded (message) {
 *      console.log(message);
 *  }
 *  
 *  var el = atropa.inject.element (
 *      'iframe', document, document.body,
 *      { 'id': 'myId', 'src' : 'http://localhost' },
 *      function () {
 *          iframeHasLoaded('hey look at that, the frame is ready!');
 *          // what could I do with the frame? anything I want!
 *      },
 *      null
 *  );
 */
atropa.inject.element = function (
    elementType, docref, parentNod, attributes, onloadHandler, callback
) {
    "use strict";
    atropa.supportCheck('inject');
    
    var el,
    x;
    docref = atropa.setAsOptionalArg(document, docref);
    parentNod = atropa.setAsOptionalArg(docref.body, parentNod);
    attributes = atropa.setAsOptionalArg({}, attributes);
    onloadHandler = atropa.setAsOptionalArg(atropa.nop, onloadHandler);
    callback = atropa.setAsOptionalArg(atropa.nop, callback);
    
    el = docref.createElement(elementType);
    for (x in attributes) {
        if (attributes.hasOwnProperty(x)) {
            el.setAttribute(x, attributes[x]);
        }
    }
    el.addEventListener('load', onloadHandler, true);
    callback(el);
    parentNod.appendChild(el);
    return el;
};
/**
 * Hidden Iframe Injector.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} id The id of the element to be injected.
 * @param {String} srcUrl The URL to load in the iframe.
 * @param {HTML DOM Document} docref Optional. Reference to the document to
 *  inject the iframe in. Defaults to document.
 * @param {Function} onloadHandler Optional. The onload handler for the iframe.
 * @param {DOM Node} parentNod Optional. Referenct to the parent node to
 *  append the iframe to. Defaults to docref.body
 * @param {Function} callback Optional. Callback function for preprocessing
 *  the iframe prior to injection. Called with a reference to the iframe.
 * @return {HTML Element} Returns a reference to the HTML Element created and
 *  injected.
 * @see atropa.inject.element
 * @see <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
 * http://www.w3.org/Security/wiki/Same_Origin_Policy</a>
 * @example
 *  el = atropa.inject.hiddenFrame(
 *      'injectHiddenFrame3',
 *      'http://localhost/',
 *      null,
 *      function () {
 *          console.log('hey look at that, the frame is ready!');
 *      },
 *      null,
 *      null
 *  );
 */
atropa.inject.hiddenFrame = function (
    id, srcURL, docref, onloadHandler, parentNod, callback
) {
    "use strict";
    atropa.supportCheck('inject');
    
    return atropa.inject.element(
        'iframe',
        docref,
        parentNod,
        {
            "id" : id,
            "src" : srcURL,
            "width" : "0px",
            "height" : "0px",
            "border" : "0px"
        },
        onloadHandler,
        callback
    );
};
/**
 * Script Injector.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} id The id of the element to be injected.
 * @param {String} srcUrl The URL where the script is located.
 * @param {HTML DOM Document} docref Optional. The document to inject the
 *  script into. Defaults to document.
 * @param {Function} callback Optional. A function to execute once the script
 *  has loaded. Defaults to function () {};
 * @return {HTML Element} Returns a reference to the HTML Element created and
 *  injected.
 * @see atropa.inject.element
 * @see <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
 * http://www.w3.org/Security/wiki/Same_Origin_Policy</a>
 * @example
 *  // Given a script "dummy.js" located at "http://localhost/dummy.js"
 *  // you can fetch the script and execute functions from within it
 *  // as soon as it has loaded into the page.
 *  
 *  // contents of "dummy.js"
 *  function dummy() {
 *      return 'dummy';
 *  }
 *  
 *  // injecting "dummy.js" into any page. The script tag isn't restricted by
 *  // the same origin policy. Host your script anywhere and inject it to any
 *  // page on the net that you want to.
 *  el = atropa.inject.script(
 *      'injectScript',
 *      'http://localhost/',
 *      document,
 *      function () {
 *          console.log(dummy());
 *      }
 *  );
 *  // you may also load scripts into iframes by replacing the third parameter
 *  // with a reference to the iframe's document object.
 */
atropa.inject.script = function (id, srcURL, docref, callback) {
    "use strict";
    atropa.supportCheck('inject');
    
    var attributes,
    elementType,
    parentNod = null,
    onloadHandler,
    el;
    attributes = {
        "id" : id,
        "type" : "text/javascript",
        "src" : srcURL
    };
    elementType = 'script';
    onloadHandler = callback;
    el = atropa.inject.element(
        elementType, docref, parentNod, attributes, onloadHandler);
    return el;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":1,"atropa-setAsOptionalArg":4}],4:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Set default values for optional function parameters.
 * @example
 * <pre>
 *   // To set a default value for an optional parameter
 *   function(optionalArg) {
 *       var defaultVal = 'hello there!';
 *       optionalArg = atropa.setAsOptionalArg(defaultVal, optionalArg);
 *       return optionalArg;
 *   }
 * </pre>
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} defaultVal The default value to set.
 * @param {Mixed} optionalArg A reference to the optional argument.
 * @returns {Mixed} Returns the default value supplied when the optional
 * argument is undefined or null. Otherwise, the supplied optional argument
 * is returned.
 */
atropa.setAsOptionalArg = function (defaultVal, optionalArg) {
    "use strict";
    if (optionalArg === undefined || optionalArg === null) {
        optionalArg = defaultVal;
    }
    return optionalArg;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":1}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1oZWFkZXJcXHNyY1xcYXRyb3BhLWhlYWRlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWluamVjdFxcZGV2XFxicm93c2VyTWFpbi5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWluamVjdFxcc3JjXFxhdHJvcGEtaW5qZWN0LmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtc2V0QXNPcHRpb25hbEFyZ1xcc3JjXFxhdHJvcGEtc2V0QXNPcHRpb25hbEFyZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGF0cm9wYSA9IHt9O1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuXHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYTtcclxuYXRyb3BhID0ge307XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGlzIGNsYXNzIGhhcyBiZWVuIG1hcmtlZCBhcyB1bnN1cHBvcnRlZCBhbmQgdGhyb3dzIGFuIFxyXG4gKiAgZXJyb3IgaWYgaXQgaGFzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgT3B0aW9uYWwuIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UuIERlZmF1bHRzIHRvXHJcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yXHJcbiAqL1xyXG5hdHJvcGEuc3VwcG9ydENoZWNrID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgZXJyb3JNZXNzYWdlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGNsYXNzTmFtZSA9IFN0cmluZyhjbGFzc05hbWUpO1xyXG4gICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3I7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcclxuICAgIFxyXG4gICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID09PSAndW5zdXBwb3J0ZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBQdXNoZXMgYSByZXF1aXJlbWVudCBjaGVjayBpbnRvIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy4gVGhlIHRlc3RcclxuICogIHRlc3RzIHdoZXRoZXIgdGhlIGNsYXNzIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBTZXRzXHJcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdJ3Mgc3VwcG9ydCB0byB1bnN1cHBvcnRlZCBhbmQgZXJyb3IgdG8gZXJyb3JNZXNzYWdlXHJcbiAqICBpZiB0aGUgcmVxdWlyZW1lbnRGbiByZXR1cm5zIGZhbHNlLiBUaGUgcmVxdWlyZW1lbnQgY2hlY2tzIHdpbGwgYWxsIGJlIHJ1blxyXG4gKiAgYWZ0ZXIgdGhlIGxpYnJhcnkgaGFzIGxvYWRlZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXF1aXJlbWVudEZuIEEgZnVuY3Rpb24gdG8gdGVzdCB3aGV0aGVyIG9yIG5vdCB0aGUgY2xhc3NcclxuICogIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBJZiBzdXBwb3J0ZWQsIHJldHVybnMgdHJ1ZSBvdGhlcndpc2VcclxuICogIHJldHVybiBmYWxzZS5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGlzIGNsYXNzIG9yIGl0c1xyXG4gKiAgbWV0aG9kcyBhcmUgY2FsbGVkIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGVmYXVsdHMgdG86XHJcbiAqICAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICsgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XHJcbiAqL1xyXG5hdHJvcGEucmVxdWlyZXMgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCByZXF1aXJlbWVudEZuLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYodHlwZW9mIGNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEucmVxdWlyZXMgcmVxdWlyZXMgdGhlIGNsYXNzIG5hbWUgdG8gYmUgJyArXHJcbiAgICAgICAgICAgICAgICAnc3BlY2lmaWVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdID0ge307XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0eXBlb2YgcmVxdWlyZW1lbnRGbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZW1lbnRGbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICtcclxuICAgICAgICAgICAgICAgICAgICAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRlc3QgPSByZXF1aXJlbWVudEZuKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvciA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRlc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnB1c2goY2hlY2spO1xyXG59O1xyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cclxuICovXHJcbmF0cm9wYS5kYXRhID0ge307XHJcblxyXG5hdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMgPSBbXTtcclxuXHJcbmF0cm9wYS5ub3AgPSBmdW5jdGlvbiBub3AgKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcblxyXG4iLCJ2YXIgaW5qZWN0ID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1pbmplY3QuanMnKTtcclxuXHJcbnRyeSB7XHJcbiAgICBPYmplY3Qua2V5cyhpbmplY3QpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gaW5qZWN0W3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICBhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLWluamVjdC5qcycpO1xyXG59XHJcblxyXG5PYmplY3Qua2V5cyhpbmplY3QuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSBpbmplY3QuZGF0YVtwcm9wXTtcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qKlxyXG4gKiBSZXF1aXJlZCBtb2R1bGUsIHRoZSBkb2NzIGZvciBpdCBhcmUgaW4gdGhlIDxjb2RlPlxyXG4gKiAgYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcvZG9jczwvY29kZT4gZGlyZWN0b3J5IHdoZXJlIHRoaXMgbW9kdWxlIFxyXG4gKiAgaXMgbG9jYXRlZC5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnL2RvY3MvanNkb2MvaW5kZXguaHRtbFwiPlxyXG4gKiAuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcvZG9jcy9qc2RvYy9pbmRleC5odG1sPC9hPixcclxuICogIHVubGVzcyB5b3UgaW5zdGFsbGVkIHRoaXMgZGVwZW5kZW5jeSBtYW51YWxseS5cclxuICovXHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcblxyXG5hdHJvcGEucmVxdWlyZXMoXHJcbiAgICAnaW5qZWN0JyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBpZihkb2N1bWVudC5jcmVhdGVFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuKTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWlucyB0b29scyBmb3IgaW5qZWN0aW5nIGVsZW1lbnRzIGFuZCBhc3NlbWJsaWVzLlxyXG4gKiBpbnRvIHRoZSBwYWdlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQG5hbWVzcGFjZSBDb250YWlucyB0b29scyBmb3IgaW5qZWN0aW5nIGVsZW1lbnRzIGFuZCBhc3NlbWJsaWVzLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcclxuICogQHJlcXVpcmVzIGF0cm9wYS5zdXBwb3J0Q2hlY2tcclxuICogQHJlcXVpcmVzIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLmluamVjdFwiPnRlc3RzPC9hPlxyXG4gKi9cclxuYXRyb3BhLmluamVjdCA9IHt9O1xyXG4vKipcclxuICogR2VuZXJpYyBFbGVtZW50IEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IGVsZW1lbnRUeXBlIFRoZSB0eXBlIG9mIGVsZW1lbnQgdG8gYmUgaW5qZWN0ZWQuXHJcbiAqIEBwYXJhbSB7SFRNTCBET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHRvXHJcbiAqICB0YXJnZXQsIGRlZmF1bHRzIHRvIDxjb2RlPmRvY3VtZW50PC9jb2RlPi5cclxuICogQHBhcmFtIHtET00gTm9kZX0gcGFyZW50Tm9kIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IG5vZGUgdG9cclxuICogIHRhcmdldCwgZGVmYXVsdHMgdG8gPGNvZGU+ZG9jcmVmLmJvZHk8L2NvZGU+LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlcyBPcHRpb25hbC4gQW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIG5hbWVzIG9mXHJcbiAqICBIVE1MIGF0dHJpYnV0ZXMsIGRlZmF1bHRzIHRvIDxjb2RlPnt9PC9jb2RlPi4gVGhlIHZhbHVlIG9mIHRoZXNlIHByb3BlcnRpZXNcclxuICogIGFyZSB0byBiZSBzdHJpbmdzIHJlcHJlc2VudGluZyB0aGUgdmFsdWVzIG9mIHRoZSBIVE1MIGF0dHJpYnV0ZXMgYXMgdGhleSBhcmVcclxuICogIHRvIGJlIGFwcGxpZWQgdG8gdGhlIGluamVjdGVkIGVsZW1lbnQuXHJcbiAqIEBleGFtcGxlIEV4YW1wbGUgYXR0cmlidXRlcyBvYmplY3QgOlxyXG4gKlxyXG4gKiBhdHRyaWJ1dGVzT2JqID0ge1xyXG4gKiAgICAgXCJpZFwiIDogXCJlbGVtZW50SURcIixcclxuICogICAgIFwiY2xhc3NcIiA6IFwiY2xhc3N5XCJcclxuICogfTtcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25sb2FkSGFuZGxlciBPcHRpb25hbC4gSWYgdGhlIGVsZW1lbnQgYmVpbmcgaW5qZWN0ZWQgd2lsbFxyXG4gKiAgZmlyZSBhIGxvYWQgZXZlbnQsIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQuIERlZmF1bHRzIHRvXHJcbiAqICA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT4uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGp1c3QgYmVmb3JlXHJcbiAqICB0aGUgZWxlbWVudCBpcyB0byBiZSBhcHBlbmRlZCB0byB0aGUgcGFnZS4gVGhlIGNhbGxiYWNrIHdpbGwgcmVjZWl2ZSB0aGVcclxuICogIGVsZW1lbnQgaW4gaXRzIGN1cnJlbnQgc3RhdGUgZm9yIGFueSBhZGRpdGlvbmFsIHByb2Nlc3NpbmcgdG8gYmUgZG9uZSBwcmlvclxyXG4gKiAgdG8gaXQncyBhdHRhY2htZW50IG9uIGNhbGxiYWNrIGNvbXBsZXRpb24uIERlZmF1bHRzIHRvXHJcbiAqICA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT4uXHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICAvLyB0aGlzIHdpbGwgaW5qZWN0IGEgZGl2IGVsZW1lbnQgaW50byB0aGUgZG9jdW1lbnQgYm9keS5cclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoJ2RpdicpO1xyXG4gKiAgXHJcbiAqICAvLyBUaGlzIHdpbGwgaW5qZWN0IGEgZGl2IHdpdGggdGhlIGlkIFwibXlJZFwiIGludG8gdGhlIGVsZW1lbnQgcmVmZXJlbmNlZCBieVxyXG4gKiAgLy8gXCJjb250YWluZXJcIlxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnZGl2JywgZG9jdW1lbnQsIGNvbnRhaW5lciwgeyAnaWQnOiAnbXlJZCcgfSwgbnVsbCwgbnVsbFxyXG4gKiAgKTtcclxuICogIFxyXG4gKiAgLy8gdGhpcyB3aWxsIGluamVjdCBhIGRpdiBpbnRvIHRoZSBkb2N1bWVudCBvZiBhbiBpZnJhbWUgcmVmZXJlbmNlZCB3aXRoIFwiZmRvY1wiXHJcbiAqICAvLyBKdXN0IGJlZm9yZSB0aGUgZGl2IGlzIGluamVjdGVkIHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBhbmQgdGhlIGVsZW1lbnRcclxuICogIC8vIG1heSBiZSBhdWdtZW50ZWQuIFdoZW4gdGhlIGNhbGxiYWNrIHJldHVybnMgdGhlIGVsZW1lbnQgd2lsbCBiZSBpbmplY3RlZC5cclxuICogIHZhciBmZG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvbWVGcmFtZScpLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcbiAqICBcclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoXHJcbiAqICAgICAgJ2RpdicsIGZkb2MsIGZkb2MuYm9keSwgeyAnaWQnOiAnbXlJZCcgfSxcclxuICogICAgICBudWxsLFxyXG4gKiAgICAgIGZ1bmN0aW9uIChteURpdikge1xyXG4gKiAgICAgICAgICBteURpdi50ZXh0Q29udGVudCA9ICdJIGNvdWxkIGhhdmUgYXR0YWNoZWQgZXZlbnQgaGFuZGxlcnMnO1xyXG4gKiAgICAgIH1cclxuICogICk7XHJcbiAqICBcclxuICogIC8vIHRoaXMgd2lsbCBpbmplY3QgYW4gaWZyYW1lIGludG8gdGhlIGRvY3VtZW50XHJcbiAqICAvLyBvbmNlIHRoZSBpZnJhbWUncyBkb2N1bWVudCBoYXMgZmluaXNoZWQgbG9hZGluZyB0aGUgb25sb2FkIGhhbmRsZXIgd2lsbCBiZVxyXG4gKiAgLy8gY2FsbGVkLiBJZiB0aGUgZG9jdW1lbnQgYW5kIHRoZSBpZnJhbWUgYXJlIG9uIHRoZSBzYW1lIGRvbWFpbiwgc2NyaXB0cyBvblxyXG4gKiAgLy8gdGhlIGZyYW1lIGFuZCB0aGUgcGFyZW50IGRvY3VtZW50IHdpbGwgYmUgYWJsZSB0byBjb21tdWluY2F0ZSB3aXRoIGVhY2hcclxuICogIC8vIG90aGVyLlxyXG4gKiAgZnVuY3Rpb24gaWZyYW1lSGFzTG9hZGVkIChtZXNzYWdlKSB7XHJcbiAqICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAqICB9XHJcbiAqICBcclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoXHJcbiAqICAgICAgJ2lmcmFtZScsIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5LFxyXG4gKiAgICAgIHsgJ2lkJzogJ215SWQnLCAnc3JjJyA6ICdodHRwOi8vbG9jYWxob3N0JyB9LFxyXG4gKiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICogICAgICAgICAgaWZyYW1lSGFzTG9hZGVkKCdoZXkgbG9vayBhdCB0aGF0LCB0aGUgZnJhbWUgaXMgcmVhZHkhJyk7XHJcbiAqICAgICAgICAgIC8vIHdoYXQgY291bGQgSSBkbyB3aXRoIHRoZSBmcmFtZT8gYW55dGhpbmcgSSB3YW50IVxyXG4gKiAgICAgIH0sXHJcbiAqICAgICAgbnVsbFxyXG4gKiAgKTtcclxuICovXHJcbmF0cm9wYS5pbmplY3QuZWxlbWVudCA9IGZ1bmN0aW9uIChcclxuICAgIGVsZW1lbnRUeXBlLCBkb2NyZWYsIHBhcmVudE5vZCwgYXR0cmlidXRlcywgb25sb2FkSGFuZGxlciwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ2luamVjdCcpO1xyXG4gICAgXHJcbiAgICB2YXIgZWwsXHJcbiAgICB4O1xyXG4gICAgZG9jcmVmID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZG9jdW1lbnQsIGRvY3JlZik7XHJcbiAgICBwYXJlbnROb2QgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2NyZWYuYm9keSwgcGFyZW50Tm9kKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyh7fSwgYXR0cmlidXRlcyk7XHJcbiAgICBvbmxvYWRIYW5kbGVyID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25sb2FkSGFuZGxlcik7XHJcbiAgICBjYWxsYmFjayA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGF0cm9wYS5ub3AsIGNhbGxiYWNrKTtcclxuICAgIFxyXG4gICAgZWwgPSBkb2NyZWYuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcbiAgICBmb3IgKHggaW4gYXR0cmlidXRlcykge1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KHgpKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSh4LCBhdHRyaWJ1dGVzW3hdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkSGFuZGxlciwgdHJ1ZSk7XHJcbiAgICBjYWxsYmFjayhlbCk7XHJcbiAgICBwYXJlbnROb2QuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59O1xyXG4vKipcclxuICogSGlkZGVuIElmcmFtZSBJbmplY3Rvci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGVsZW1lbnQgdG8gYmUgaW5qZWN0ZWQuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzcmNVcmwgVGhlIFVSTCB0byBsb2FkIGluIHRoZSBpZnJhbWUuXHJcbiAqIEBwYXJhbSB7SFRNTCBET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gUmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB0b1xyXG4gKiAgaW5qZWN0IHRoZSBpZnJhbWUgaW4uIERlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmxvYWRIYW5kbGVyIE9wdGlvbmFsLiBUaGUgb25sb2FkIGhhbmRsZXIgZm9yIHRoZSBpZnJhbWUuXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IHBhcmVudE5vZCBPcHRpb25hbC4gUmVmZXJlbmN0IHRvIHRoZSBwYXJlbnQgbm9kZSB0b1xyXG4gKiAgYXBwZW5kIHRoZSBpZnJhbWUgdG8uIERlZmF1bHRzIHRvIGRvY3JlZi5ib2R5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBDYWxsYmFjayBmdW5jdGlvbiBmb3IgcHJlcHJvY2Vzc2luZ1xyXG4gKiAgdGhlIGlmcmFtZSBwcmlvciB0byBpbmplY3Rpb24uIENhbGxlZCB3aXRoIGEgcmVmZXJlbmNlIHRvIHRoZSBpZnJhbWUuXHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSBhdHJvcGEuaW5qZWN0LmVsZW1lbnRcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICBlbCA9IGF0cm9wYS5pbmplY3QuaGlkZGVuRnJhbWUoXHJcbiAqICAgICAgJ2luamVjdEhpZGRlbkZyYW1lMycsXHJcbiAqICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3QvJyxcclxuICogICAgICBudWxsLFxyXG4gKiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICogICAgICAgICAgY29uc29sZS5sb2coJ2hleSBsb29rIGF0IHRoYXQsIHRoZSBmcmFtZSBpcyByZWFkeSEnKTtcclxuICogICAgICB9LFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgbnVsbFxyXG4gKiAgKTtcclxuICovXHJcbmF0cm9wYS5pbmplY3QuaGlkZGVuRnJhbWUgPSBmdW5jdGlvbiAoXHJcbiAgICBpZCwgc3JjVVJMLCBkb2NyZWYsIG9ubG9hZEhhbmRsZXIsIHBhcmVudE5vZCwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ2luamVjdCcpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gYXRyb3BhLmluamVjdC5lbGVtZW50KFxyXG4gICAgICAgICdpZnJhbWUnLFxyXG4gICAgICAgIGRvY3JlZixcclxuICAgICAgICBwYXJlbnROb2QsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImlkXCIgOiBpZCxcclxuICAgICAgICAgICAgXCJzcmNcIiA6IHNyY1VSTCxcclxuICAgICAgICAgICAgXCJ3aWR0aFwiIDogXCIwcHhcIixcclxuICAgICAgICAgICAgXCJoZWlnaHRcIiA6IFwiMHB4XCIsXHJcbiAgICAgICAgICAgIFwiYm9yZGVyXCIgOiBcIjBweFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbmxvYWRIYW5kbGVyLFxyXG4gICAgICAgIGNhbGxiYWNrXHJcbiAgICApO1xyXG59O1xyXG4vKipcclxuICogU2NyaXB0IEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHNyY1VybCBUaGUgVVJMIHdoZXJlIHRoZSBzY3JpcHQgaXMgbG9jYXRlZC5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBUaGUgZG9jdW1lbnQgdG8gaW5qZWN0IHRoZVxyXG4gKiAgc2NyaXB0IGludG8uIERlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBPcHRpb25hbC4gQSBmdW5jdGlvbiB0byBleGVjdXRlIG9uY2UgdGhlIHNjcmlwdFxyXG4gKiAgaGFzIGxvYWRlZC4gRGVmYXVsdHMgdG8gZnVuY3Rpb24gKCkge307XHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSBhdHJvcGEuaW5qZWN0LmVsZW1lbnRcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICAvLyBHaXZlbiBhIHNjcmlwdCBcImR1bW15LmpzXCIgbG9jYXRlZCBhdCBcImh0dHA6Ly9sb2NhbGhvc3QvZHVtbXkuanNcIlxyXG4gKiAgLy8geW91IGNhbiBmZXRjaCB0aGUgc2NyaXB0IGFuZCBleGVjdXRlIGZ1bmN0aW9ucyBmcm9tIHdpdGhpbiBpdFxyXG4gKiAgLy8gYXMgc29vbiBhcyBpdCBoYXMgbG9hZGVkIGludG8gdGhlIHBhZ2UuXHJcbiAqICBcclxuICogIC8vIGNvbnRlbnRzIG9mIFwiZHVtbXkuanNcIlxyXG4gKiAgZnVuY3Rpb24gZHVtbXkoKSB7XHJcbiAqICAgICAgcmV0dXJuICdkdW1teSc7XHJcbiAqICB9XHJcbiAqICBcclxuICogIC8vIGluamVjdGluZyBcImR1bW15LmpzXCIgaW50byBhbnkgcGFnZS4gVGhlIHNjcmlwdCB0YWcgaXNuJ3QgcmVzdHJpY3RlZCBieVxyXG4gKiAgLy8gdGhlIHNhbWUgb3JpZ2luIHBvbGljeS4gSG9zdCB5b3VyIHNjcmlwdCBhbnl3aGVyZSBhbmQgaW5qZWN0IGl0IHRvIGFueVxyXG4gKiAgLy8gcGFnZSBvbiB0aGUgbmV0IHRoYXQgeW91IHdhbnQgdG8uXHJcbiAqICBlbCA9IGF0cm9wYS5pbmplY3Quc2NyaXB0KFxyXG4gKiAgICAgICdpbmplY3RTY3JpcHQnLFxyXG4gKiAgICAgICdodHRwOi8vbG9jYWxob3N0LycsXHJcbiAqICAgICAgZG9jdW1lbnQsXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZyhkdW1teSgpKTtcclxuICogICAgICB9XHJcbiAqICApO1xyXG4gKiAgLy8geW91IG1heSBhbHNvIGxvYWQgc2NyaXB0cyBpbnRvIGlmcmFtZXMgYnkgcmVwbGFjaW5nIHRoZSB0aGlyZCBwYXJhbWV0ZXJcclxuICogIC8vIHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGlmcmFtZSdzIGRvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5pbmplY3Quc2NyaXB0ID0gZnVuY3Rpb24gKGlkLCBzcmNVUkwsIGRvY3JlZiwgY2FsbGJhY2spIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHZhciBhdHRyaWJ1dGVzLFxyXG4gICAgZWxlbWVudFR5cGUsXHJcbiAgICBwYXJlbnROb2QgPSBudWxsLFxyXG4gICAgb25sb2FkSGFuZGxlcixcclxuICAgIGVsO1xyXG4gICAgYXR0cmlidXRlcyA9IHtcclxuICAgICAgICBcImlkXCIgOiBpZCxcclxuICAgICAgICBcInR5cGVcIiA6IFwidGV4dC9qYXZhc2NyaXB0XCIsXHJcbiAgICAgICAgXCJzcmNcIiA6IHNyY1VSTFxyXG4gICAgfTtcclxuICAgIGVsZW1lbnRUeXBlID0gJ3NjcmlwdCc7XHJcbiAgICBvbmxvYWRIYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudChcclxuICAgICAgICBlbGVtZW50VHlwZSwgZG9jcmVmLCBwYXJlbnROb2QsIGF0dHJpYnV0ZXMsIG9ubG9hZEhhbmRsZXIpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogU2V0IGRlZmF1bHQgdmFsdWVzIGZvciBvcHRpb25hbCBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiA8cHJlPlxyXG4gKiAgIC8vIFRvIHNldCBhIGRlZmF1bHQgdmFsdWUgZm9yIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxyXG4gKiAgIGZ1bmN0aW9uKG9wdGlvbmFsQXJnKSB7XHJcbiAqICAgICAgIHZhciBkZWZhdWx0VmFsID0gJ2hlbGxvIHRoZXJlISc7XHJcbiAqICAgICAgIG9wdGlvbmFsQXJnID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZGVmYXVsdFZhbCwgb3B0aW9uYWxBcmcpO1xyXG4gKiAgICAgICByZXR1cm4gb3B0aW9uYWxBcmc7XHJcbiAqICAgfVxyXG4gKiA8L3ByZT5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IGRlZmF1bHRWYWwgVGhlIGRlZmF1bHQgdmFsdWUgdG8gc2V0LlxyXG4gKiBAcGFyYW0ge01peGVkfSBvcHRpb25hbEFyZyBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9uYWwgYXJndW1lbnQuXHJcbiAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgZGVmYXVsdCB2YWx1ZSBzdXBwbGllZCB3aGVuIHRoZSBvcHRpb25hbFxyXG4gKiBhcmd1bWVudCBpcyB1bmRlZmluZWQgb3IgbnVsbC4gT3RoZXJ3aXNlLCB0aGUgc3VwcGxpZWQgb3B0aW9uYWwgYXJndW1lbnRcclxuICogaXMgcmV0dXJuZWQuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcIj50ZXN0czwvYT5cclxuICovXHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gZnVuY3Rpb24gKGRlZmF1bHRWYWwsIG9wdGlvbmFsQXJnKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGlmIChvcHRpb25hbEFyZyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbmFsQXJnID09PSBudWxsKSB7XHJcbiAgICAgICAgb3B0aW9uYWxBcmcgPSBkZWZhdWx0VmFsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbmFsQXJnO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iXX0=
;