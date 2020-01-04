export function getJsonFromUrl(url) {
  if(!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
		var item = part.split("=");
		const nextURIComponent = decodeURIComponent(item[1]);
		// Try to parse to int.
		try {
			result[item[0]] = parseInt(nextURIComponent);
			if (isNaN(result[item[0]])) throw new TypeError('NaN');
		} catch(e) {
			result[item[0]] = nextURIComponent;
		}
  });
  return result;
}

export function paramsObjToUrl(params) {
	return (Object.keys(params).map((paramKey) => `${paramKey}=${params[paramKey]}`).join('&'));
}