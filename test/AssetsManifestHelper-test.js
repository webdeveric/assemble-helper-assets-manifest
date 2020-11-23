'use strict';

const path = require('path');
const assert = require('chai').assert;
const Handlebars = require('handlebars');
const AssetsManifestHelper = require('../src/helper-assets-manifest');

describe('AssetsManifestHelper', function() {
  before(function() {
    AssetsManifestHelper.register(Handlebars, {
      manifestPath: path.join(__dirname, 'fixtures', 'example-manifest.json'),
    });
  });

  after(function() {
    Handlebars.unregisterHelper('assetsManifest');
  });

  it('should have assetsManifest helper', function() {
    assert.equal('main-abc123.js', (Handlebars.compile('{{assetsManifest "main.js"}}'))());
  });

  it('should return default value when key is not found', function() {
    assert.equal('main.js', (Handlebars.compile('{{assetsManifest "not-found.js" default="main.js"}}'))());
  });

  it('should return default value if key is missing', function() {
    assert.equal('hello', (Handlebars.compile('{{assetsManifest default="hello"}}'))());
  });

  it('should return empty string key is missing', function() {
    assert.equal('', (Handlebars.compile('{{assetsManifest}}'))());
    assert.equal('', (Handlebars.compile('{{assetsManifest prefix=true}}'))());
  });

  describe('options.prefix', function() {
    it('should prepend the prefix', function() {
      assert.equal('', (Handlebars.compile('{{assetsManifest prefix="/assets/"}}'))());
    });
  });

  describe('options.manifestPath', function() {
    it('throws an error when missing', function() {
      assert.throws(function() {
        AssetsManifestHelper.register(Handlebars);
      });
    });
  });

  describe('options.name', function() {
    it('sets the helper name', function() {
      AssetsManifestHelper.register(Handlebars, {
        manifestPath: path.join(__dirname, 'fixtures', 'example-manifest.js'),
        name: 'foobar',
      });

      assert.isTrue(Object.hasOwnProperty.call(Handlebars.helpers, 'foobar'));
    });
  });

  describe('options.prefix', function() {
    it('sets the default prefix', function() {
      const prefix = '/assets/';

      AssetsManifestHelper.register(Handlebars, {
        manifestPath: path.join(__dirname, 'fixtures', 'example-manifest.json'),
        prefix: prefix,
      });

      assert.equal( prefix + 'main-abc123.js', (Handlebars.compile('{{assetsManifest "main.js"}}'))());
      assert.equal( prefix + 'main-abc123.js', (Handlebars.compile('{{assetsManifest "main.js" prefix=true}}'))());
      assert.equal( '/other-assets/main-abc123.js', (Handlebars.compile('{{assetsManifest "main.js" prefix="/other-assets/"}}'))());
      assert.equal( 'main-abc123.js', (Handlebars.compile('{{assetsManifest "main.js" prefix=false}}'))());
    });
  });
});
