function generateRandomString(length){
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

var client_id = '8018871c46834cdd805dddf3e33c33d7';
var redirect_uri = 'https://auricless.github.io/CiviSpotify/';
var state = generateRandomString(16);

var scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + redirect_uri;
url += '&state=' + encodeURIComponent(state);

console.info(url)

var auth = {};
var urlParamsStr = window.location.href.replace(window.location.origin + "/CiviSpotify/#", "");
urlParamsArr = urlParamsStr.split("&");
for(var i = 0; i < urlParamsArr.length; i++){
  var param = urlParamsArr[i].split("=");
  auth[param[0]] = param[1];
}

const accessToken = auth['access_token'];
const tokenType = auth['token_type'];
const expiresIn = auth['expires_in'];
const accessstate = auth['state'];

console.info(accessToken);
console.info(tokenType);
console.info(expiresIn);
console.info(accessstate);

if(accessToken){
  url = 'https://api.spotify.com/v1/me/player/play';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = e => {
      if (e.readyState == 4 && e.status == 200) {
        console.log(e);
      }
  };
  xhttp.open("GET", url, false);
  xhttp.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  xhttp.send();
}