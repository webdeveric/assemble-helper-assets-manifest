var path = require('path');
var assert = require('chai').assert;
var AssetsManifest = require('../src/AssetsManifest');

describe('AssetsManifest', function() {
  var exampleManifest = path.join(__dirname, 'fixtures', 'example-manifest.json');

  describe('#constructor()', function () {
    it('should accept a file path as the first argument', function () {
      var manifest = new AssetsManifest( exampleManifest );
      assert.equal(exampleManifest, manifest.manifestPath);
    });

    it('should accept an options object as the first argument', function () {
      var manifest = new AssetsManifest({
        manifestPath: exampleManifest
      });
      assert.equal(exampleManifest, manifest.manifestPath);
    });
  });

  describe('#load()', function () {
    it('should return true when able to load', function () {
      var manifest = new AssetsManifest( exampleManifest );
      assert.isTrue(manifest.load());
    });

    it('should return false if manifestPath is missing', function () {
      var manifest = new AssetsManifest();
      delete manifest.manifestPath;
      assert.isFalse(manifest.load());
    });

    it('should return false when unable to load', function () {
      var manifest = new AssetsManifest();
      assert.isFalse(manifest.load());
    });
  });

  describe('#has()', function () {
    it('should return boolean', function () {
      var manifest = new AssetsManifest( exampleManifest );
      assert.isTrue(manifest.has('main.js'));
      assert.isFalse(manifest.has('photo.jpg'));
    });
  });

  describe('#get()', function () {
    var manifest = new AssetsManifest( exampleManifest );
    var rawManifest = require( exampleManifest );
    var prefix = '/assets/';

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

      it('should return ' + prefix + rawManifest[ key ] + ' with prefix when getting ' + key, function () {
        assert.equal( prefix + rawManifest[ key ], manifest.get( key, '', prefix ) );
      });
    });
  });
});
