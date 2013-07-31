(function(){var global = this;
/*!
 * debug
 * Copyright(c) 2012 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  localStorage.debug = name;

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

// persist

if (window.localStorage) debug.enable(localStorage.debug);function require(p, parent){ var path = require.resolve(p) , mod = require.modules[path]; if (!mod) throw new Error('failed to require "' + p + '" from ' + parent); if (!mod.exports) { mod.exports = {}; mod.call(mod.exports, mod, mod.exports, require.relative(path), global); } return mod.exports;}require.modules = {};require.resolve = function(path){ var orig = path , reg = path + '.js' , index = path + '/index.js'; return require.modules[reg] && reg || require.modules[index] && index || orig;};require.register = function(path, fn){ require.modules[path] = fn;};require.relative = function(parent) { return function(p){ if ('debug' == p) return debug; if ('.' != p.charAt(0)) return require(p); var path = parent.split('/') , segs = p.split('/'); path.pop(); for (var i = 0; i < segs.length; i++) { var seg = segs[i]; if ('..' == seg) path.pop(); else if ('.' != seg) path.push(seg); } return require(path.join('/'), parent); };};require.register("urlify.js", function(module, exports, require, global){
function extend(base) {
	for(var i = 1; i < arguments.length; i++) {
		var extension = arguments[i];
		if(typeof extension === 'object')
			for(var key in extension)
				base[key] = extension[key];
	}
	return base;
}

var regExpPattern= new RegExp(
	'(\\' + [
		'/', '.', '*', '+', '?', '|',
		'(', ')', '[', ']', '{', '}', '\\'
		].join('|\\') + ')', 'g'
);

function trim(text, seq) {
	var pattern = seq.replace(regExpPattern, '\\$1');
	return text
		.replace(new RegExp("^"+pattern), "")
		.replace(new RegExp(pattern+"$"), "")
		.replace(new RegExp("("+pattern+"){2,}", "g"), seq);
}

var setImmediate = function(cb) { cb(); };
if(typeof process !== 'undefined' && typeof process.nextTick === 'function') {
	setImmediate = process.nextTick;
}

var whitespace = /\s/g;
var nonAlphaNum = /[^a-z0-9-]/gi;

var umlautsWithE = {
	'Ä': 'Ae',
	"ä": "ae",
	'Ö': 'Oe',
	"ö": "oe",
	"ü": "ue",
	'Ü': 'Ue'
};

var szToSs = {
	'ß': 'ss'
};

var accents = {
	'À': 'A',
	'Á': 'A',
	'Â': 'A',
	'Ã': 'A',
	'Ä': 'A',
	'Å': 'AA',
	'Æ': 'AE',
	'Ç': 'C',
	'Č': 'C',
	'Ď': 'D',
	'È': 'E',
	'É': 'E',
	'Ě': 'E',
	'Ê': 'E',
	'Ë': 'E',
	'Ì': 'I',
	'Í': 'I',
	'Î': 'I',
	'Ï': 'I',
	'Ð': 'D',
	'Ł': 'L',
	'Ň': 'N',
	'Ñ': 'N',
	'Ò': 'O',
	'Ó': 'O',
	'Ô': 'O',
	'Õ': 'O',
	'Ö': 'O',
	'Ř': 'R',
	'Š': 'S',
	'Ť': 'T',
	'Ø': 'OE',
	'Ù': 'U',
	'Ú': 'U',
	'Ü': 'U',
	'Û': 'U',
	'Ý': 'Y',
	'Ž': 'Z',
	'Þ': 'Th',
	'ß': 'sz',
	'à': 'a',
	'á': 'a',
	'â': 'a',
	'ã': 'a',
	'ä': 'a',
	'å': 'aa',
	'æ': 'ae',
	'ç': 'c',
	'č': 'c',
	'ď': 'd',
	'è': 'e',
	'é': 'e',
	'ê': 'e',
	'ě': 'e',
	'ë': 'e',
	'ì': 'i',
	'í': 'i',
	'î': 'i',
	'ï': 'i',
	'ð': 'd',
	'ł': 'l',
	'ñ': 'n',
	'ń': 'n',
	'ň': 'n',
	'ò': 'o',
	'ó': 'o',
	'ô': 'o',
	'õ': 'o',
	'ō': 'o',
	'ö': 'o',
	'ø': 'oe',
	'ř': 'r',
	'š': 's',
	'ś': 's',
	'ť': 't',
	'ù': 'u',
	'ú': 'u',
	'û': 'u',
	'ū': 'u',
	'ü': 'u',
	'ý': 'y',
	'þ': 'th',
	'ÿ': 'y',
	'ż': 'z',
	'ž': 'z',
	'Œ': 'OE',
	'œ': 'oe',
	'&': 'and',
	'ı': 'i',
	'ş': 's',
	'ğ': 'g',
	'Ş': 'S',
	'Ğ': 'g',
	'İ': 'I'
};

var cyrillic = {
	'а':'a',
	'б':'b',
	'в':'v',
	'г':'g',
	'д':'d',
	'е':'e',
	'ё':'yo',
	'ж':'zh',
	'з':'z',
	'и':'i',
	'й':'j',
	'к':'k',
	'л':'l',
	'м':'m',
	'н':'n',
	'о':'o',
	'п':'p',
	'р':'r',
	'с':'s',
	'т':'t',
	'у':'u',
	'ф':'f',
	'х':'h',
	'ц':'c',
	'ч':'ch',
	'ш':'sh',
	'щ':'sh',
	'ъ':'',
	'ы':'y',
	'ь':'',
	'э':'e',
	'ю':'yu',
	'я':'ya',
	'А':'A',
	'Б':'B',
	'В':'V',
	'Г':'G',
	'Д':'D',
	'Е':'E',
	'Ё':'Yo',
	'Ж':'Zh',
	'З':'Z',
	'И':'I',
	'Й':'J',
	'К':'K',
	'Л':'L',
	'М':'M',
	'Н':'N',
	'О':'O',
	'П':'P',
	'Р':'R',
	'С':'S',
	'Т':'T',
	'У':'U',
	'Ф':'F',
	'Х':'H',
	'Ц':'C',
	'Ч':'Ch',
	'Ш':'Sh',
	'Щ':'Sh',
	'Ъ':'',
	'Ы':'Y',
	'Ь':'',
	'Э':'E',
	'Ю':'Yu',
	'Я':'Ya'
};

function apply(str, map) {
	var result = []
	for(var i = 0; i < str.length; i++) {
		var repl = map[str[i]];
		result.push(repl === undefined ? str[i] : repl)
	}
	return result.join("");
}

exports.create = function(options) {
	var defaults = extend({
		addEToUmlauts:false,
		szToSs:true,
		spaces:"_",
		toLower:false,
		nonPrintable:"_",
		trim:false,
		extendString:false,
		failureOutput:"non-printable"
	}, options);

	var urlify = function(string, options, cb) {
		if(string == '')
			return '';
		if(typeof options === 'function') {
			cb = options;
			options = undefined;
		}

		if(cb) {
			var callee = arguments.callee;
			setImmediate(function() {
				cb(callee.call(0, string, options));
			});
			return;
		}

		options = extend({}, defaults, options);
		if(options.szToSs === true)
			string = apply(string, szToSs);
		if(options.addEToUmlauts === true)
			string = apply(string, umlautsWithE)
		string = apply(string, accents);
		string = apply(string, cyrillic);

		string = string.replace(nonAlphaNum, function(occ) {
			return occ.search(whitespace) !== -1
				? options.spaces
				: options.nonPrintable;
		});
		if(options.trim !== false) {
			string = trim(string, options.nonPrintable);
			string = trim(string, options.spaces);
		}
		if(string == "")
			return options.failureOutput;
		return (options.toLower === true) ? string.toLowerCase() : string;
	}

	if(defaults.extendString === true)
		String.prototype.urlify = function(options) {
			return urlify(this, options)
		};
	return urlify;
}

});var exp = require('urlify');if ("undefined" != typeof module) module.exports = exp;else Urlify = exp;
})();
