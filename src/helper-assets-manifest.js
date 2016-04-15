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

  if ( ! options.assetsManifest ) {
    throw new Error('assetsManifest is not defined in assemble:options');
  }

  var AssetsManifest = require('./AssetsManifest');
  var manifest = new AssetsManifest( options.assetsManifest );

  Handlebars.registerHelper('assetsManifest', function() {
    var key     = arguments.length ? arguments[ 0 ] : '';
    var options = arguments.length > 1 ? arguments[ 1 ] : arguments[ 0 ];
    var value   = manifest.get( key, options.hash.default || key, !!options.hash.fullPath );
    return value;
  });
};
