var hostUrl;
var exportablePlayerProperties = {
	'medium': {
		'width': 300,
		'height': 389,
		'loginUrl': '/account/login?view=player',
		'htmlid': '#playerMedium',
		'verticalVolume': true
	},
	'horizontal': {
		'width': 728,
		'height': 90,
		'loginUrl': '/account/login?view=playerhorizontal',
		'htmlid': '#playerBanner',
		'verticalVolume': false
	},
	'mobile': {
		'width': 320,
		'height': 90,
		'loginUrl': '/account/login?view=playermobile',
		'htmlid': '#playerMobile',
		'verticalVolume': false
	}
};

function GetExportablePlayerProperties(playerType) {
	if (!exportablePlayerProperties.hasOwnProperty(playerType)) {
		return exportablePlayerProperties.medium;
	}

	return exportablePlayerProperties[playerType];
}

function InitDetachedPlayerFunc() {
	var ref = window.document.getElementsByClassName('radionomy-player')[0];
	if (!ref) {
		return;
	}

	var rpo = window["RadionomyPlayerObject"];
	if (!rpo) {
		console.log('Error: RadionomyPlayerObject is not defined');
		return;
	}

	var cObjectName = rpo;
	if (typeof rpo === 'object') {
		cObjectName = rpo[0];
		rpo.splice(0, 1);
	}

	var p = window[cObjectName].parameters;
	
	if (!p.version) {
		p.version = '1.0';
	}

	if (!p.url || p.url.length == 0) {
		console.log('Error: parameter \'url\' is not defined');
		return;
	}

	if (!p.src || p.src.length == 0) {
		p.src = 'https://www.radionomy.com';
	}

	if (!p.language || p.language.length == 0) {
		p.language = 'en';
	}

	var urlInfo = window.document.createElement('a');
	urlInfo.setAttribute('href', p.src)
	hostUrl = urlInfo.protocol + '//' + urlInfo.hostname;

	if (hostUrl.indexOf('nobluesub.com', hostUrl.length - 'nobluesub.com'.length) == -1) {
		console.log('Error: ' + hostUrl + ' is not an authorized host');
		return;
	}

	var qs = '';
	for (var k in p) {
		if (p.hasOwnProperty(k) && k != 'src') {
			qs += (k + '=' + encodeURIComponent(p[k]) + '&');
		}
	}
	if (qs.length > 0) qs = qs.slice(0, -1);

	var playerProperties = GetExportablePlayerProperties(p.type);
	var rframe = window.document.createElement('iframe');
	rframe.id = '_radionomy_player_iframe';
	rframe.src = hostUrl + '/' + p.language + '/radio/' + p.url + '/export/?' + qs;
	rframe.scrolling = 'no';
	rframe.width = playerProperties.width + 'px';
	rframe.height = playerProperties.height + 'px';
	rframe.style.border = 0;
	rframe.style.margin = 0;
	rframe.style.padding = 0;

	ref.parentNode.insertBefore(rframe, ref.nextSibling);
	ref.parentNode.removeChild(ref);

	p.width = playerProperties.width;
	p.height = playerProperties.height;

	window.radionomy = window.radionomy || {};
	(window.radionomy.players = window.radionomy.players || []).push({
			properties: p,
			refresh: function () {
				if (false && rframe.contentWindow && typeof rframe.contentWindow.postMessage === 'function') {
					var playerProperties = GetExportablePlayerProperties(p.type);
					rframe.width = playerProperties.width + 'px';
					rframe.height = playerProperties.height + 'px';
					rframe.contentWindow.postMessage(JSON.stringify({
						id: 'refresh player',
						properties: p
					}), '*');
				}
				else {
						
					var rplayer = window.document.createElement('div');
					rplayer.className = 'radionomy-player';

					var rframe = window.document.getElementById('_radionomy_player_iframe');
					rframe.parentNode.insertBefore(rplayer, rframe.nextSibling);
					rframe.parentNode.removeChild(rframe);
						
					window.RadionomyPlayerObject = [cObjectName];
					InitDetachedPlayerFunc();
				}
			}
	});
};

(function _InitDetachedPlayer() {
	if (/interactive|loaded|complete/.test(document.readyState)) {
		InitDetachedPlayerFunc();
	}
	else {
		window.onload = InitDetachedPlayerFunc;
	}
})();