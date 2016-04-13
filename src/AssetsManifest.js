'use strict';

var fs = require('fs');

function AssetsManifest( path )
{
  this._path   = path;
  this._data   = {};
  this._loaded = false;
}

AssetsManifest.prototype.load = function()
{
  if ( this._path ) {
    try {
      fs.accessSync( this._path, fs.R_OK );
      var data = JSON.parse( fs.readFileSync( this._path ).toString() );
      this._data = data;
      this._loaded = true;
    } catch ( e ) {
      this._loaded = false;
    }
  }

  return this._loaded;
};

AssetsManifest.prototype.get = function( key, defaultValue )
{
  if ( ! this._loaded ) {
    this.load();
  }

  if ( defaultValue === undefined ) {
    defaultValue = '';
  }

  return this._data && this._data.hasOwnProperty( key ) ? this._data[ key ] : defaultValue;
};

module.exports = AssetsManifest;
