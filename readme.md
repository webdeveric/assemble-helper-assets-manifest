# Assemble Helper Assets Manifest

This package provides a [custom helper](http://assemble.io/docs/Custom-Helpers.html) for
[Handlebars](http://handlebarsjs.com/) that [Assemble](http://assemble.io/) can use.

## Installation

```shell
npm install webdeveric/assemble-helper-assets-manifest --save
```

## Setup with Assemble

After you install this package, you need to tell Assemble about it.
You do that by adding the package name to the `helpers` array in your config.

You also need to specify `assetsManifest` so that the helper knows where
to look for your assets manifest file.

**Example config**

```js
assemble: {
  options: {
    helpers: [ 'assemble-helper-assets-manifest' ],
    manifestPath: path.join(__dirname, 'manifest.json')
  }
}
```

## Setup with Handlebars

```js
var Handlebars = require('handlebars');
var AssetsManifestHelper = require('assemble-helper-assets-manifest');

AssetsManifestHelper.register(Handlebars, {
  manifestPath: path.join(process.cwd(), 'public', 'assets', 'manifest.json'),
  prefix: '/assets/'
});
```

## Using the Handlebars helper

```hbs
<img src="{{assetsManifest 'images/photo.jpg'}}" />
```

```hbs
{{#each images}}
  <img src="{{assetsManifest this.src}}" />
{{/each}}
```
