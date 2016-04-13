var path = require('path');
var assert = require('assert');
var AssetsManifest = require('../src/AssetsManifest');

describe('AssetsManifest', function() {
  var exampleManifest = path.join(__dirname, 'example-manifest.json');

  describe('#load()', function () {
    it('should return true when able to load', function () {
      var manifest = new AssetsManifest( exampleManifest );
      assert.equal(true, manifest.load());
    });

    it('should return false when unable to load', function () {
      var manifest = new AssetsManifest();
      assert.equal(false, manifest.load());
    });
  });

  describe('#get()', function () {
    var manifest = new AssetsManifest( exampleManifest );
    var rawManifest = require( exampleManifest );

    it('should return an empty string when key is not found', function () {
      assert.equal('', manifest.get('fake key') );
    });

    it('should return defaultValue when key is not found', function () {
      var defaultValue = 'test';
      assert.equal( defaultValue, manifest.get('fake key', defaultValue ) );
    });

    Object.getOwnPropertyNames(rawManifest).forEach(function( key ) {
      it('should return ' + rawManifest[ key ] + ' when getting ' + key, function () {
        assert.equal( rawManifest[ key ], manifest.get( key ) );
      });
    });
  });
});
