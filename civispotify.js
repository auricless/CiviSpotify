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

const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');
const tokenType = urlParams.get('token_type');
const expiresIn = urlParams.get('expires_in');
const accessstate = urlParams.get('state');

console.info(accessToken);
console.info(tokenType);
console.info(expiresIn);
console.info(accessstate);

if(accessToken){
  url = 'https://api.spotify.com/v1/me/player/play';

  var xhttp = new XMLHttpRequest();
  xhttp.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  xhttp.onreadystatechange = e => {
      if (e.readyState == 4 && e.status == 200) {
        console.log(e);
      }
  };
  xhttp.open("GET", url, false);
  xhttp.send();
}