# Assemble Helper Assets Manifest

This package provides a [Handlebars](http://handlebarsjs.com/) helper that
[Assemble](http://assemble.io/) can use when building static sites.

## Installation

```shell
npm install webdeveric/assemble-helper-assets-manifest --save
```

## Setup

After you install this package, you need to tell Assemble about it.
You do that by adding the package name to the `helpers` array in your config.

You also need to specify `assetsManifest` so that the helper knows where
to look for your assets manifest file.

**Example config**

```js
assemble: {
  options: {
    helpers: [ 'assemble-helper-assets-manifest' ],
    assetsManifest: path.join(__dirname, 'manifest.json')
  }
}
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
