
/**
 * Some things foo.
 *
 * @package <%= moduleName %>
 * @copyright <%= date.year %> <%= company %>
 */

angular.module('<%= moduleName %>')
  .factory('<%= providerNs %>Foo', function() {
    'use strict';
    var exports = {};

    /**
     * What is this bar made of?
     *
     * @return {String} The stuff this bar is made of
     */
    exports.thisBarIsMadeOf = function() {
      return 'foo';
    };

    return exports;
  });
