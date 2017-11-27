export function URLProtocolFilter(...validProtocols) {
	
	function isValidURL(url){
		try {	
			const a = document.createElement('a');
			a.href = url;
			const href = a.href;
			return validProtocols.some(protocol =>
				href.indexOf(protocol + ':') === 0
			);
		} catch (error) {
			return false;
		}
	}
	
	return function filter(url, defaultValue){
		if (isValidURL(url)) return url;
		else return defaultValue || "";
	}
	
};