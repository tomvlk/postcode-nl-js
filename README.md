# Postcode.NL (Browser + Node)
Postcode.NL API Module for browser and NodeJS.


## Installation

### NodeJS or Browserify

Install the module with npm with the following command:
```bash
npm i --save postcode-nl
```

### Browser, Standalone
Using the browser you can choose to use the compiled JavaScript file or when
using Browserify you can use the normal node way.

```html
<script src="postcode-browser.js"></script>
```


## Loading

### NodeJS or Browserify

Just require the module, make sure you get the Postcode 'class' function.

```javascript
var Postcode = require('postcode-nl').Postcode;
```

### Browser, standalone

The class instance creator is already defined in the global.


## Usage

Make sure you create a new instance of the Postcode API with the following api:

```javascript
var api = new Postcode({
  key: 'application key',
  secret: 'application secret'
});
```

After creating your API instance the instance knows your credentials.

_Browser notice: Currently the API of Postcode.nl doesn't support JSONP, so usage in browser is limited. Creating an Proxy with your application itself would fix it._
_TODO: Create proxy support within the module._

### Fetching address data.

```javascript
api.address({
  postcode: '1234AA',
  houseNumber: 1
}, function (err, result) {
  // Error will be filled with an Error instance, or null when there is no error at all.
  // Result will contain the result of the API request. (The exact response could change).
});
```
