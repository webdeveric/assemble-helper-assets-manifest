var path = require('path');
var assert = require('assert');
var AssetsManifest = require('../src/AssetsManifest');

describe('AssetsManifest', function() {
  var exampleManifest = path.join(__dirname, 'example-manifest.json');

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

    describe('#assetsPath', function () {
      it('should have assetsPath', function () {
        var manifest = new AssetsManifest({
          manifestPath: exampleManifest,
          assetsPath: './'
        });
        assert.equal(path.resolve('./'), manifest.assetsPath);
      });

      it('should have default assetsPath', function () {
        var manifest = new AssetsManifest({ manifestPath: exampleManifest });
        assert.equal(path.dirname(exampleManifest), manifest.assetsPath);
      });
    });
  });

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

  describe('#has()', function () {
    it('should return boolean', function () {
      var manifest = new AssetsManifest( exampleManifest );
      assert.equal(true, manifest.has('main.js'));
      assert.equal(false, manifest.has('photo.jpg'));
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
