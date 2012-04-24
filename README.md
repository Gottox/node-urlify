### URLify

This node library simplifies converting utf8 strings to ASCII strings which can be used as readable URL-segments

Warning: __alpha__ This means: This tools is already usable, but there may be
incomplete tests and more important: The API may change in future releases.

## Installation

```
# npm install urlify
```

## Usage

``` javascript
var urlify = require('urlify').create(options)
```

* ```options``` (optional) is a config map and can contain the following:
  * ```addEToUmlauts``` default: ```false```
    replaces 'ä', 'ö', and 'ü' with 'ae', 'oe', and 'ue' instead of 'a', 'o', and 'u'
  * ```szToSs``` default: ```true```
    if true replaces 'ß' with 'ss', otherwise with 'sz'
  * ```spaces``` default: ```"_"```
    replaces whitespace characters with this character.
  * ```nonPrintable``` default: ```"_"```
    replaces other non-ASCII characters with this character.
  * ```trim``` default: ```false```
    replaces multiple whitespaces/non-ASCII characters by one placeholder
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
var urlify = require('quotefm').create({addEToUmlauts:true, szToSs:false, spaces:"_", nonPrintable:"_", trim:true});

urlify("das eiskalte Händchen")
// das_eiskalte_Haendchen 

urlify("das eiskalte Händchen", { addEToUmlauts:false })
// das_eiskalte_Handchen 

urlify("Heiße Suppe")
// Heisze_Suppe

urlify("Heiße Suppe", { szToSs:true })
// Heisse_Suppe

urlify("Soon!")
// Soon

urlify("This is very important!!! Please read!!!")
// This_is_very_important_Please_read
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
