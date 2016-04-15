var path = require('path');
var assert = require('assert');
var Handlebars = require('handlebars');

describe('assetsManifest helper', function() {

  before(function() {
    require('../src/helper-assets-manifest').register(Handlebars, {
      assetsManifest: path.join(__dirname, 'example-manifest.json')
    });
  });

  it('should have assetsManifest helper', function() {
    assert.equal('main-abc123.js', (Handlebars.compile('{{assetsManifest "main.js"}}'))());
  });

  it('should return default value when key is not found', function() {
    assert.equal('main.js', (Handlebars.compile('{{assetsManifest "not-found.js" default="main.js"}}'))());
  });

  it('should return the full path', function() {
    assert.equal(
      path.join(__dirname, 'main-abc123.js'),
      (Handlebars.compile('{{assetsManifest "main.js" fullPath=true}}'))()
    );
  });

});
