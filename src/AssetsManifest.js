'use strict';

var path  = require('path');
var assign = require('object-assign');

function AssetsManifest( options )
{
  options = options || {};

  if ( typeof options === 'string' ) {
    options = {
      manifestPath: options
    };
  }

  this.assets = Object.create(null);
  this.loaded = false;
  this.prefix = options.prefix || '';

  this.manifestPath = options.manifestPath ?
    path.resolve( options.manifestPath ) :
    path.join( process.cwd(), 'manifest.json' );

  this.load();
}

AssetsManifest.prototype.load = function()
{
  this.loaded = false;

  if ( this.manifestPath ) {
    try {
      this.assets = assign(Object.create(null), require( this.manifestPath ) );
      this.loaded = true;
    } catch (err) { // eslint-disable-line
    }
  }

  return this.loaded;
};

AssetsManifest.prototype.has = function( key )
{
  return this.assets && Object.prototype.hasOwnProperty.call( this.assets, key );
};

AssetsManifest.prototype.get = function( key, defaultValue, prefix )
{
  defaultValue = defaultValue || '';

  if ( ! key ) {
    return defaultValue;
  }

  if ( prefix === true ) {
    prefix = this.prefix;
  } else if ( prefix === false ) {
    prefix = '';
  } else if ( prefix === undefined ) {
    prefix = this.prefix;
  }

  var asset = this.has( key ) ? this.assets[ key ] : defaultValue;

  return typeof asset === 'string' && prefix ? prefix + asset : asset;
};

module.exports = AssetsManifest;
