/**
 * Assemble Helper Assets Manifest
 *
 * @author Eric King <eric@webdeveric.com>
 */

'use strict';

var AssetsManifest = require('./AssetsManifest');

module.exports.register = function( Handlebars, options )
{
  if ( ! options.assetsManifest ) {
    console.warn('assetsManifest is not defined in assemble:options');
  }

  var manifest = new AssetsManifest( options.assetsManifest );

  Handlebars.registerHelper('assetsManifest', function( key ) {
    return manifest.get( key, key );
  });
};
