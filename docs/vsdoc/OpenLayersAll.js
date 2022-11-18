
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary>Container for all Glorious classes, functions, etc.</summary>
        /// <returns type="atropa"/>
      
        /// <field name="data" type="">Container for gobal data related to the classes and functions.</field>
        data : {}, 
      
        /// <field name="inject" type="">Contains tools for injecting elements and assemblies.
        /// into the page.</field>
        inject : {}, 
                
        supportCheck: function(className, errorMessage) {
            /// <summary>Checks whether this class has been marked as unsupported and throws an 
            ///  error if it has.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="errorMessage" type="String">Optional. A custom error message. Defaults to
            ///  atropa.data[className].error</param>
        }, 
        
        requires: function(className, requirementFn, errorMessage) {
            /// <summary>Pushes a requirement check into atropa.data.requirements. The test
            ///  tests whether the class is supported in this environment. Sets
            ///  atropa.data[className]&apos;s support to unsupported and error to errorMessage
            ///  if the requirementFn returns false. The requirement checks will all be run
            ///  after the library has loaded.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="requirementFn" type="Function">A function to test whether or not the class
            ///  is supported in this environment. If supported, returns true otherwise
            ///  return false.</param>
            /// <param name="errorMessage" type="String">The error message to use when this class or its
            ///  methods are called in unsupported environments. Defaults to:
            ///  &apos;The atropa.&apos; + className + &apos; class is unsupported in this environment.&apos;;</param>
        }, 
        
        setAsOptionalArg: function(defaultVal, optionalArg) {
            /// <summary>Set default values for optional function parameters.</summary>
            /// <param name="defaultVal" type="Mixed">The default value to set.</param>
            /// <param name="optionalArg" type="Mixed">A reference to the optional argument.</param>
            /// <returns type="Mixed">Returns the default value supplied when the optional
            /// argument is undefined or null. Otherwise, the supplied optional argument
            /// is returned.</returns>
        }
        
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);

  

  
/* vsdoc for atropa.data */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.data = {
        /// <summary>Container for gobal data related to the classes and functions.</summary>
        /// <returns type="atropa.data"/>
                
    };

    var $x = window.atropa.data;
    $x.__namespace = "true";
    $x.__typeName = "atropa.data";
})(this);

  

  
/* vsdoc for atropa.inject */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.inject = {
        /// <summary>Contains tools for injecting elements and assemblies.
        /// /// into the page.</summary>
        /// <returns type="atropa.inject"/>
                
        element: function(elementType, docref, parentNod, attributes, onloadHandler, callback) {
            /// <summary>Generic Element Injector.</summary>
            /// <param name="elementType" type="String">The type of element to be injected.</param>
            /// <param name="docref" type="HTML DOM Document">Optional. A reference to the document to
            ///  target, defaults to &lt;code&gt;document&lt;/code&gt;.</param>
            /// <param name="parentNod" type="DOM Node">Optional. A reference to the parent node to
            ///  target, defaults to &lt;code&gt;docref.body&lt;/code&gt;.</param>
            /// <param name="attributes" type="Object">Optional. An object whose properties are names of
            ///  HTML attributes, defaults to &lt;code&gt;{}&lt;/code&gt;. The value of these properties
            ///  are to be strings representing the values of the HTML attributes as they are
            ///  to be applied to the injected element.</param>
            /// <param name="onloadHandler" type="Function">Optional. If the element being injected will
            ///  fire a load event, this function will be called. Defaults to
            ///  &lt;code&gt;function () {}&lt;/code&gt;.</param>
            /// <param name="callback" type="Function">Optional. This function will be called just before
            ///  the element is to be appended to the page. The callback will receive the
            ///  element in its current state for any additional processing to be done prior
            ///  to it&apos;s attachment on callback completion. Defaults to
            ///  &lt;code&gt;function () {}&lt;/code&gt;.</param>
            /// <returns type="HTML Element">Returns a reference to the HTML Element created and
            ///  injected.</returns>
        }, 
        
        hiddenFrame: function(id, srcUrl, docref, onloadHandler, parentNod, callback) {
            /// <summary>Hidden Iframe Injector.</summary>
            /// <param name="id" type="String">The id of the element to be injected.</param>
            /// <param name="srcUrl" type="String">The URL to load in the iframe.</param>
            /// <param name="docref" type="HTML DOM Document">Optional. Reference to the document to
            ///  inject the iframe in. Defaults to document.</param>
            /// <param name="onloadHandler" type="Function">Optional. The onload handler for the iframe.</param>
            /// <param name="parentNod" type="DOM Node">Optional. Referenct to the parent node to
            ///  append the iframe to. Defaults to docref.body</param>
            /// <param name="callback" type="Function">Optional. Callback function for preprocessing
            ///  the iframe prior to injection. Called with a reference to the iframe.</param>
            /// <returns type="HTML Element">Returns a reference to the HTML Element created and
            ///  injected.</returns>
        }, 
        
        script: function(id, srcUrl, docref, callback) {
            /// <summary>Script Injector.</summary>
            /// <param name="id" type="String">The id of the element to be injected.</param>
            /// <param name="srcUrl" type="String">The URL where the script is located.</param>
            /// <param name="docref" type="HTML DOM Document">Optional. The document to inject the
            ///  script into. Defaults to document.</param>
            /// <param name="callback" type="Function">Optional. A function to execute once the script
            ///  has loaded. Defaults to function () {};</param>
            /// <returns type="HTML Element">Returns a reference to the HTML Element created and
            ///  injected.</returns>
        }
        
    };

    var $x = window.atropa.inject;
    $x.__namespace = "true";
    $x.__typeName = "atropa.inject";
})(this);

  

