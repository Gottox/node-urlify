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
	'È': 'E',
	'É': 'E',
	'Ê': 'E',
	'Ë': 'E',
	'Ì': 'I',
	'Í': 'I',
	'Î': 'I',
	'Ï': 'I',
	'Ð': 'D',
	'Ł': 'L',
	'Ñ': 'N',
	'Ò': 'O',
	'Ó': 'O',
	'Ô': 'O',
	'Õ': 'O',
	'Ö': 'O',
	'Ø': 'OE',
	'Ù': 'U',
	'Ú': 'U',
	'Ü': 'U',
	'Û': 'U',
	'Ý': 'Y',
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
	'è': 'e',
	'é': 'e',
	'ê': 'e',
	'ë': 'e',
	'ì': 'i',
	'í': 'i',
	'î': 'i',
	'ï': 'i',
	'ð': 'd',
	'ł': 'l',
	'ñ': 'n',
	'ń': 'n',
	'ò': 'o',
	'ó': 'o',
	'ô': 'o',
	'õ': 'o',
	'ō': 'o',
	'ö': 'o',
	'ø': 'oe',
	'ś': 's',
	'ù': 'u',
	'ú': 'u',
	'û': 'u',
	'ū': 'u',
	'ü': 'u',
	'ý': 'y',
	'þ': 'th',
	'ÿ': 'y',
	'ż': 'z',
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

	var urlify = function(string, options) {
		if(string == '')
			return '';
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
