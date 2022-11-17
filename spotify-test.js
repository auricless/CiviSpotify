window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQAL5sDOI2z4JuGDZpmLU9N3Qf5U2NpIvqu6Z-lm6pJFG3o93qcwgEhUlzxmUMm7T_MUmF_kLFojpVPH16LdSr3gBAL3l2JGvZeWDqnU0uRqFWry0mC51tkMz93Ww75OIQH3pofamIRKmWOZrytbCd67hQgvO00KyY8Wjo7qcG4ru2a5PXE8Kri9btik2EgaYcIRKxmxxQ7F069x7n0FUB0';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.5});
  
  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

   player.addListener('initialization_error', ({ message }) => { 
      console.error(message);
  });

  player.addListener('authentication_error', ({ message }) => {
      console.error(message);
  });

  player.addListener('account_error', ({ message }) => {
      console.error(message);
  });

  player.connect();

  document.getElementById('togglePlay').onclick = function() {
    player.togglePlay();
  };
}