'use strict';

var fs    = require('fs');
var path  = require('path');

function AssetsManifest( options )
{
  options = options || {};

  if ( typeof options === 'string' ) {
    options = {
      manifestPath: options
    };
  }

  this._data   = {};
  this._loaded = false;

  this.manifestPath = options.manifestPath ?
    path.resolve( options.manifestPath ) :
    path.join( process.cwd(), 'manifest.json' );

  this.assetsPath = options.assetsPath ?
    path.resolve( options.assetsPath ) :
    path.dirname( this.manifestPath );

  this.load();
}

AssetsManifest.prototype.load = function()
{
  if ( this.manifestPath ) {
    try {
      var data = JSON.parse( fs.readFileSync( this.manifestPath ) );
      this._data = data;
      this._loaded = true;
    } catch ( e ) {
      this._loaded = false;
    }
  }

  return this._loaded;
};

AssetsManifest.prototype.has = function( key )
{
  return this._data && this._data.hasOwnProperty( key );
};

AssetsManifest.prototype.get = function( key, defaultValue, prependAssetsPath )
{
  var asset = this.has( key ) ? this._data[ key ] : (defaultValue || '');

  if ( typeof asset === 'string' && !!prependAssetsPath ) {
    asset = path.join(this.assetsPath, asset);
  }

  return asset;
};

module.exports = AssetsManifest;
