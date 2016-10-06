/**
 * Assemble Helper Assets Manifest
 *
 * @author Eric King <eric@webdeveric.com>
 */

/**
 * assetsManifest helper
 *
 * @example
 * {{assetsManifest 'images/test.jpg'}}
 *
 * @example
 * {{assetsManifest 'images/not-found.jpg' default='images/found.jpg'}}
 *
 * @example
 * {{assetsManifest 'images/not-found.jpg' default='images/found.jpg' fullPath=true}}
 */
module.exports.register = function( Handlebars, options )
{
  'use strict';

  options = options || {};

  if ( ! options.manifestPath ) {
    throw new Error('manifestPath is not defined in options');
  }

  var AssetsManifest = require('./AssetsManifest');
  var manifest = new AssetsManifest( options );

  Handlebars.registerHelper( options.name || 'assetsManifest', function() {
    var key     = arguments.length > 1 ? arguments[ 0 ] : '';
    var options = arguments.length > 1 ? arguments[ 1 ] : arguments[ 0 ];

    return manifest.get( key, options.hash.default || key, options.hash.prefix );
  });
};
