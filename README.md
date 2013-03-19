[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=Gottox&url=https://github.com/Gottox/node-urlify&title=node-urlify&language=&tags=github&category=software)


### URLify

This node library simplifies converting utf8 strings to ASCII strings which can be used as readable URL-segments

If you're happily using node-urlify, please leave an entry at [the wiki](https://github.com/Gottox/node-urlify/wiki/Whos-using-node-urlify%3F). Thank you!

## Installation

### Node
```
# npm install urlify
```

### Browser

```
# git clone git://github.com/Gottox/node-urlify.git
# cd node-urlify
# make build
```

This compiles a [browserbuild](https://github.com/LearnBoost/browserbuild)
version to dist/urlify.js


## Usage

### Node

``` javascript
var urlify = require('urlify').create(options);
urlify(text);
```

### Browser

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script type="text/javascript" src="dist/urlify.js"></script>
	</head>
	<body>
		<script type="text/javascript">
			var urlify = Urlify.create(options);
			document.write(urlify(text));
		</script>
	</body>
</html>
```

* ```options``` (optional) is a config map and can contain the following:
  * ```addEToUmlauts``` default: ```false```
    replaces 'ä', 'ö', and 'ü' with 'ae', 'oe', and 'ue' instead of 'a', 'o', and 'u'.
  * ```szToSs``` default: ```true```
    if true replaces 'ß' with 'ss', otherwise with 'sz'.
  * ```spaces``` default: ```"_"```
    replaces whitespace characters with this character.
  * ```toLower``` default: ```false```
    converts all uppercase ASCII characters to lowercase.
  * ```nonPrintable``` default: ```"_"```
    replaces other non-ASCII characters with this character.
  * ```trim``` default: ```false```
    replaces multiple whitespaces/non-ASCII characters by one placeholder.
  * ```failureOutput``` default: ```"non-printable"```
    returned result if output is reduced to an empty string.
  * ```extendString``` default: ```false```
    If true, extends String object with urlify method.
    So after calling the constructor, you can use ```"Hello World".urlify()```
* returns: a configured function: ``` function(string, options)```
  * ```string``` may a string to be urlified
  * ```options``` overwrite above options. ```extendString``` has no effect.

If ```extendString``` is ```true```, you may also use ```"Hello World".urlify()```
to urlify strings.

## Example

``` javascript
var urlify = require('urlify').create({
  addEToUmlauts:true,
  szToSs:true,
  spaces:"_",
  nonPrintable:"_",
  trim:true
});

urlify("das eiskalte Händchen")
// 'das_eiskalte_Haendchen'

urlify("das eiskalte Händchen", { addEToUmlauts:false })
// 'das_eiskalte_Handchen'

urlify("Heiße Suppe")
// 'Heisse_Suppe'

urlify("Heiße Suppe", { szToSs:false })
// 'Heisze_Suppe'

urlify("Soon!")
// 'Soon'

urlify("This is very important!!! Please read!!!")
// 'This_is_very_important_Please_read'
```

## Tests

The tests are based on expect.js by learnBoost.

To run the tests in node use
``` bash
make test
```
To run them in your browser use

``` bash
make test-browser
<browser> http://127.0.0.1:3000
```
