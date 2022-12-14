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

var scope = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing';

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
  url = 'https://api.spotify.com/v1/me/player';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = e => {
      if (xhttp.readyState === XMLHttpRequest.DONE) {
        const status = xhttp.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          console.log(xhttp.responseText);
        } else {
          // Oh no! There has been an error with the request!
        }
      }
  };
  xhttp.open("GET", url, false);
  xhttp.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  xhttp.setRequestHeader('Content-Type', `application/json`);
  xhttp.send();
}