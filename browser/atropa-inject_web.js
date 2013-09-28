;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var atropa = {};

/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>

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
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.inject">tests</a>
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
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.setAsOptionalArg">tests</a>
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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1oZWFkZXJcXHNyY1xcYXRyb3BhLWhlYWRlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWluamVjdFxcZGV2XFxicm93c2VyTWFpbi5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWluamVjdFxcc3JjXFxhdHJvcGEtaW5qZWN0LmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtc2V0QXNPcHRpb25hbEFyZ1xcc3JjXFxhdHJvcGEtc2V0QXNPcHRpb25hbEFyZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXRyb3BhID0ge307XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhO1xyXG5hdHJvcGEgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXHJcbiAqICBlcnJvciBpZiBpdCBoYXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcclxuICovXHJcbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcclxuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgXHJcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxyXG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcclxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXHJcbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xyXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxyXG4gKiAgcmV0dXJuIGZhbHNlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXHJcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcclxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICovXHJcbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcclxuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLmRhdGEgPSB7fTtcclxuXHJcbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xyXG5cclxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuXHJcbiIsInZhciBpbmplY3QgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLWluamVjdC5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKGluamVjdCkuZm9yRWFjaChcclxuICAgICAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBpZighYXRyb3BhW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGFbcHJvcF0gPSBpbmplY3RbcHJvcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG59IGNhdGNoIChpZ25vcmUpIHtcclxuICAgIGF0cm9wYSA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtaW5qZWN0LmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKGluamVjdC5kYXRhKS5maWx0ZXIoXHJcbiAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wICE9PSAncmVxdWlyZW1lbnRzJztcclxuICAgIH1cclxuKS5mb3JFYWNoKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBhdHJvcGEuZGF0YVtwcm9wXSA9IGluamVjdC5kYXRhW3Byb3BdO1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuXHJcbmF0cm9wYS5yZXF1aXJlcyhcclxuICAgICdpbmplY3QnLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5zIHRvb2xzIGZvciBpbmplY3RpbmcgZWxlbWVudHMgYW5kIGFzc2VtYmxpZXMuXHJcbiAqIGludG8gdGhlIHBhZ2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5zIHRvb2xzIGZvciBpbmplY3RpbmcgZWxlbWVudHMgYW5kIGFzc2VtYmxpZXMuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuZGF0YVxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnN1cHBvcnRDaGVja1xyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEuaW5qZWN0XCI+dGVzdHM8L2E+XHJcbiAqL1xyXG5hdHJvcGEuaW5qZWN0ID0ge307XHJcbi8qKlxyXG4gKiBHZW5lcmljIEVsZW1lbnQgSW5qZWN0b3IuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZWxlbWVudFR5cGUgVGhlIHR5cGUgb2YgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgdG9cclxuICogIHRhcmdldCwgZGVmYXVsdHMgdG8gPGNvZGU+ZG9jdW1lbnQ8L2NvZGU+LlxyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBwYXJlbnROb2QgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgbm9kZSB0b1xyXG4gKiAgdGFyZ2V0LCBkZWZhdWx0cyB0byA8Y29kZT5kb2NyZWYuYm9keTwvY29kZT4uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzIE9wdGlvbmFsLiBBbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZXMgb2ZcclxuICogIEhUTUwgYXR0cmlidXRlcywgZGVmYXVsdHMgdG8gPGNvZGU+e308L2NvZGU+LiBUaGUgdmFsdWUgb2YgdGhlc2UgcHJvcGVydGllc1xyXG4gKiAgYXJlIHRvIGJlIHN0cmluZ3MgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZXMgb2YgdGhlIEhUTUwgYXR0cmlidXRlcyBhcyB0aGV5IGFyZVxyXG4gKiAgdG8gYmUgYXBwbGllZCB0byB0aGUgaW5qZWN0ZWQgZWxlbWVudC5cclxuICogQGV4YW1wbGUgRXhhbXBsZSBhdHRyaWJ1dGVzIG9iamVjdCA6XHJcbiAqXHJcbiAqIGF0dHJpYnV0ZXNPYmogPSB7XHJcbiAqICAgICBcImlkXCIgOiBcImVsZW1lbnRJRFwiLFxyXG4gKiAgICAgXCJjbGFzc1wiIDogXCJjbGFzc3lcIlxyXG4gKiB9O1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmxvYWRIYW5kbGVyIE9wdGlvbmFsLiBJZiB0aGUgZWxlbWVudCBiZWluZyBpbmplY3RlZCB3aWxsXHJcbiAqICBmaXJlIGEgbG9hZCBldmVudCwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZC4gRGVmYXVsdHMgdG9cclxuICogIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPi5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgT3B0aW9uYWwuIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQganVzdCBiZWZvcmVcclxuICogIHRoZSBlbGVtZW50IGlzIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBwYWdlLiBUaGUgY2FsbGJhY2sgd2lsbCByZWNlaXZlIHRoZVxyXG4gKiAgZWxlbWVudCBpbiBpdHMgY3VycmVudCBzdGF0ZSBmb3IgYW55IGFkZGl0aW9uYWwgcHJvY2Vzc2luZyB0byBiZSBkb25lIHByaW9yXHJcbiAqICB0byBpdCdzIGF0dGFjaG1lbnQgb24gY2FsbGJhY2sgY29tcGxldGlvbi4gRGVmYXVsdHMgdG9cclxuICogIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPi5cclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIC8vIHRoaXMgd2lsbCBpbmplY3QgYSBkaXYgZWxlbWVudCBpbnRvIHRoZSBkb2N1bWVudCBib2R5LlxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50ICgnZGl2Jyk7XHJcbiAqICBcclxuICogIC8vIFRoaXMgd2lsbCBpbmplY3QgYSBkaXYgd2l0aCB0aGUgaWQgXCJteUlkXCIgaW50byB0aGUgZWxlbWVudCByZWZlcmVuY2VkIGJ5XHJcbiAqICAvLyBcImNvbnRhaW5lclwiXHJcbiAqICB2YXIgZWwgPSBhdHJvcGEuaW5qZWN0LmVsZW1lbnQgKFxyXG4gKiAgICAgICdkaXYnLCBkb2N1bWVudCwgY29udGFpbmVyLCB7ICdpZCc6ICdteUlkJyB9LCBudWxsLCBudWxsXHJcbiAqICApO1xyXG4gKiAgXHJcbiAqICAvLyB0aGlzIHdpbGwgaW5qZWN0IGEgZGl2IGludG8gdGhlIGRvY3VtZW50IG9mIGFuIGlmcmFtZSByZWZlcmVuY2VkIHdpdGggXCJmZG9jXCJcclxuICogIC8vIEp1c3QgYmVmb3JlIHRoZSBkaXYgaXMgaW5qZWN0ZWQgdGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIGFuZCB0aGUgZWxlbWVudFxyXG4gKiAgLy8gbWF5IGJlIGF1Z21lbnRlZC4gV2hlbiB0aGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgZWxlbWVudCB3aWxsIGJlIGluamVjdGVkLlxyXG4gKiAgdmFyIGZkb2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29tZUZyYW1lJykuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICogIFxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnZGl2JywgZmRvYywgZmRvYy5ib2R5LCB7ICdpZCc6ICdteUlkJyB9LFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgZnVuY3Rpb24gKG15RGl2KSB7XHJcbiAqICAgICAgICAgIG15RGl2LnRleHRDb250ZW50ID0gJ0kgY291bGQgaGF2ZSBhdHRhY2hlZCBldmVudCBoYW5kbGVycyc7XHJcbiAqICAgICAgfVxyXG4gKiAgKTtcclxuICogIFxyXG4gKiAgLy8gdGhpcyB3aWxsIGluamVjdCBhbiBpZnJhbWUgaW50byB0aGUgZG9jdW1lbnRcclxuICogIC8vIG9uY2UgdGhlIGlmcmFtZSdzIGRvY3VtZW50IGhhcyBmaW5pc2hlZCBsb2FkaW5nIHRoZSBvbmxvYWQgaGFuZGxlciB3aWxsIGJlXHJcbiAqICAvLyBjYWxsZWQuIElmIHRoZSBkb2N1bWVudCBhbmQgdGhlIGlmcmFtZSBhcmUgb24gdGhlIHNhbWUgZG9tYWluLCBzY3JpcHRzIG9uXHJcbiAqICAvLyB0aGUgZnJhbWUgYW5kIHRoZSBwYXJlbnQgZG9jdW1lbnQgd2lsbCBiZSBhYmxlIHRvIGNvbW11aW5jYXRlIHdpdGggZWFjaFxyXG4gKiAgLy8gb3RoZXIuXHJcbiAqICBmdW5jdGlvbiBpZnJhbWVIYXNMb2FkZWQgKG1lc3NhZ2UpIHtcclxuICogICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICogIH1cclxuICogIFxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnaWZyYW1lJywgZG9jdW1lbnQsIGRvY3VtZW50LmJvZHksXHJcbiAqICAgICAgeyAnaWQnOiAnbXlJZCcsICdzcmMnIDogJ2h0dHA6Ly9sb2NhbGhvc3QnIH0sXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBpZnJhbWVIYXNMb2FkZWQoJ2hleSBsb29rIGF0IHRoYXQsIHRoZSBmcmFtZSBpcyByZWFkeSEnKTtcclxuICogICAgICAgICAgLy8gd2hhdCBjb3VsZCBJIGRvIHdpdGggdGhlIGZyYW1lPyBhbnl0aGluZyBJIHdhbnQhXHJcbiAqICAgICAgfSxcclxuICogICAgICBudWxsXHJcbiAqICApO1xyXG4gKi9cclxuYXRyb3BhLmluamVjdC5lbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgZWxlbWVudFR5cGUsIGRvY3JlZiwgcGFyZW50Tm9kLCBhdHRyaWJ1dGVzLCBvbmxvYWRIYW5kbGVyLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHZhciBlbCxcclxuICAgIHg7XHJcbiAgICBkb2NyZWYgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2N1bWVudCwgZG9jcmVmKTtcclxuICAgIHBhcmVudE5vZCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRvY3JlZi5ib2R5LCBwYXJlbnROb2QpO1xyXG4gICAgYXR0cmlidXRlcyA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKHt9LCBhdHRyaWJ1dGVzKTtcclxuICAgIG9ubG9hZEhhbmRsZXIgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhhdHJvcGEubm9wLCBvbmxvYWRIYW5kbGVyKTtcclxuICAgIGNhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgY2FsbGJhY2spO1xyXG4gICAgXHJcbiAgICBlbCA9IGRvY3JlZi5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuICAgIGZvciAoeCBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHgsIGF0dHJpYnV0ZXNbeF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWRIYW5kbGVyLCB0cnVlKTtcclxuICAgIGNhbGxiYWNrKGVsKTtcclxuICAgIHBhcmVudE5vZC5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn07XHJcbi8qKlxyXG4gKiBIaWRkZW4gSWZyYW1lIEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHNyY1VybCBUaGUgVVJMIHRvIGxvYWQgaW4gdGhlIGlmcmFtZS5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBSZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHRvXHJcbiAqICBpbmplY3QgdGhlIGlmcmFtZSBpbi4gRGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9ubG9hZEhhbmRsZXIgT3B0aW9uYWwuIFRoZSBvbmxvYWQgaGFuZGxlciBmb3IgdGhlIGlmcmFtZS5cclxuICogQHBhcmFtIHtET00gTm9kZX0gcGFyZW50Tm9kIE9wdGlvbmFsLiBSZWZlcmVuY3QgdG8gdGhlIHBhcmVudCBub2RlIHRvXHJcbiAqICBhcHBlbmQgdGhlIGlmcmFtZSB0by4gRGVmYXVsdHMgdG8gZG9jcmVmLmJvZHlcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgT3B0aW9uYWwuIENhbGxiYWNrIGZ1bmN0aW9uIGZvciBwcmVwcm9jZXNzaW5nXHJcbiAqICB0aGUgaWZyYW1lIHByaW9yIHRvIGluamVjdGlvbi4gQ2FsbGVkIHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGlmcmFtZS5cclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIGF0cm9wYS5pbmplY3QuZWxlbWVudFxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIGVsID0gYXRyb3BhLmluamVjdC5oaWRkZW5GcmFtZShcclxuICogICAgICAnaW5qZWN0SGlkZGVuRnJhbWUzJyxcclxuICogICAgICAnaHR0cDovL2xvY2FsaG9zdC8nLFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZygnaGV5IGxvb2sgYXQgdGhhdCwgdGhlIGZyYW1lIGlzIHJlYWR5IScpO1xyXG4gKiAgICAgIH0sXHJcbiAqICAgICAgbnVsbCxcclxuICogICAgICBudWxsXHJcbiAqICApO1xyXG4gKi9cclxuYXRyb3BhLmluamVjdC5oaWRkZW5GcmFtZSA9IGZ1bmN0aW9uIChcclxuICAgIGlkLCBzcmNVUkwsIGRvY3JlZiwgb25sb2FkSGFuZGxlciwgcGFyZW50Tm9kLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHJldHVybiBhdHJvcGEuaW5qZWN0LmVsZW1lbnQoXHJcbiAgICAgICAgJ2lmcmFtZScsXHJcbiAgICAgICAgZG9jcmVmLFxyXG4gICAgICAgIHBhcmVudE5vZCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIiA6IGlkLFxyXG4gICAgICAgICAgICBcInNyY1wiIDogc3JjVVJMLFxyXG4gICAgICAgICAgICBcIndpZHRoXCIgOiBcIjBweFwiLFxyXG4gICAgICAgICAgICBcImhlaWdodFwiIDogXCIwcHhcIixcclxuICAgICAgICAgICAgXCJib3JkZXJcIiA6IFwiMHB4XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9ubG9hZEhhbmRsZXIsXHJcbiAgICAgICAgY2FsbGJhY2tcclxuICAgICk7XHJcbn07XHJcbi8qKlxyXG4gKiBTY3JpcHQgSW5qZWN0b3IuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBlbGVtZW50IHRvIGJlIGluamVjdGVkLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3JjVXJsIFRoZSBVUkwgd2hlcmUgdGhlIHNjcmlwdCBpcyBsb2NhdGVkLlxyXG4gKiBAcGFyYW0ge0hUTUwgRE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIFRoZSBkb2N1bWVudCB0byBpbmplY3QgdGhlXHJcbiAqICBzY3JpcHQgaW50by4gRGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBBIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb25jZSB0aGUgc2NyaXB0XHJcbiAqICBoYXMgbG9hZGVkLiBEZWZhdWx0cyB0byBmdW5jdGlvbiAoKSB7fTtcclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIGF0cm9wYS5pbmplY3QuZWxlbWVudFxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIC8vIEdpdmVuIGEgc2NyaXB0IFwiZHVtbXkuanNcIiBsb2NhdGVkIGF0IFwiaHR0cDovL2xvY2FsaG9zdC9kdW1teS5qc1wiXHJcbiAqICAvLyB5b3UgY2FuIGZldGNoIHRoZSBzY3JpcHQgYW5kIGV4ZWN1dGUgZnVuY3Rpb25zIGZyb20gd2l0aGluIGl0XHJcbiAqICAvLyBhcyBzb29uIGFzIGl0IGhhcyBsb2FkZWQgaW50byB0aGUgcGFnZS5cclxuICogIFxyXG4gKiAgLy8gY29udGVudHMgb2YgXCJkdW1teS5qc1wiXHJcbiAqICBmdW5jdGlvbiBkdW1teSgpIHtcclxuICogICAgICByZXR1cm4gJ2R1bW15JztcclxuICogIH1cclxuICogIFxyXG4gKiAgLy8gaW5qZWN0aW5nIFwiZHVtbXkuanNcIiBpbnRvIGFueSBwYWdlLiBUaGUgc2NyaXB0IHRhZyBpc24ndCByZXN0cmljdGVkIGJ5XHJcbiAqICAvLyB0aGUgc2FtZSBvcmlnaW4gcG9saWN5LiBIb3N0IHlvdXIgc2NyaXB0IGFueXdoZXJlIGFuZCBpbmplY3QgaXQgdG8gYW55XHJcbiAqICAvLyBwYWdlIG9uIHRoZSBuZXQgdGhhdCB5b3Ugd2FudCB0by5cclxuICogIGVsID0gYXRyb3BhLmluamVjdC5zY3JpcHQoXHJcbiAqICAgICAgJ2luamVjdFNjcmlwdCcsXHJcbiAqICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3QvJyxcclxuICogICAgICBkb2N1bWVudCxcclxuICogICAgICBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKGR1bW15KCkpO1xyXG4gKiAgICAgIH1cclxuICogICk7XHJcbiAqICAvLyB5b3UgbWF5IGFsc28gbG9hZCBzY3JpcHRzIGludG8gaWZyYW1lcyBieSByZXBsYWNpbmcgdGhlIHRoaXJkIHBhcmFtZXRlclxyXG4gKiAgLy8gd2l0aCBhIHJlZmVyZW5jZSB0byB0aGUgaWZyYW1lJ3MgZG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmluamVjdC5zY3JpcHQgPSBmdW5jdGlvbiAoaWQsIHNyY1VSTCwgZG9jcmVmLCBjYWxsYmFjaykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdpbmplY3QnKTtcclxuICAgIFxyXG4gICAgdmFyIGF0dHJpYnV0ZXMsXHJcbiAgICBlbGVtZW50VHlwZSxcclxuICAgIHBhcmVudE5vZCA9IG51bGwsXHJcbiAgICBvbmxvYWRIYW5kbGVyLFxyXG4gICAgZWw7XHJcbiAgICBhdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIFwiaWRcIiA6IGlkLFxyXG4gICAgICAgIFwidHlwZVwiIDogXCJ0ZXh0L2phdmFzY3JpcHRcIixcclxuICAgICAgICBcInNyY1wiIDogc3JjVVJMXHJcbiAgICB9O1xyXG4gICAgZWxlbWVudFR5cGUgPSAnc2NyaXB0JztcclxuICAgIG9ubG9hZEhhbmRsZXIgPSBjYWxsYmFjaztcclxuICAgIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50KFxyXG4gICAgICAgIGVsZW1lbnRUeXBlLCBkb2NyZWYsIHBhcmVudE5vZCwgYXR0cmlidXRlcywgb25sb2FkSGFuZGxlcik7XHJcbiAgICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBTZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIG9wdGlvbmFsIGZ1bmN0aW9uIHBhcmFtZXRlcnMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxwcmU+XHJcbiAqICAgLy8gVG8gc2V0IGEgZGVmYXVsdCB2YWx1ZSBmb3IgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXHJcbiAqICAgZnVuY3Rpb24ob3B0aW9uYWxBcmcpIHtcclxuICogICAgICAgdmFyIGRlZmF1bHRWYWwgPSAnaGVsbG8gdGhlcmUhJztcclxuICogICAgICAgb3B0aW9uYWxBcmcgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkZWZhdWx0VmFsLCBvcHRpb25hbEFyZyk7XHJcbiAqICAgICAgIHJldHVybiBvcHRpb25hbEFyZztcclxuICogICB9XHJcbiAqIDwvcHJlPlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFZhbCBUaGUgZGVmYXVsdCB2YWx1ZSB0byBzZXQuXHJcbiAqIEBwYXJhbSB7TWl4ZWR9IG9wdGlvbmFsQXJnIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25hbCBhcmd1bWVudC5cclxuICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBkZWZhdWx0IHZhbHVlIHN1cHBsaWVkIHdoZW4gdGhlIG9wdGlvbmFsXHJcbiAqIGFyZ3VtZW50IGlzIHVuZGVmaW5lZCBvciBudWxsLiBPdGhlcndpc2UsIHRoZSBzdXBwbGllZCBvcHRpb25hbCBhcmd1bWVudFxyXG4gKiBpcyByZXR1cm5lZC5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1wiPnRlc3RzPC9hPlxyXG4gKi9cclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSBmdW5jdGlvbiAoZGVmYXVsdFZhbCwgb3B0aW9uYWxBcmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgaWYgKG9wdGlvbmFsQXJnID09PSB1bmRlZmluZWQgfHwgb3B0aW9uYWxBcmcgPT09IG51bGwpIHtcclxuICAgICAgICBvcHRpb25hbEFyZyA9IGRlZmF1bHRWYWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uYWxBcmc7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiJdfQ==
;