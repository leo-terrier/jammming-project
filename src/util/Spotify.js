
//import fetch from 'node-fetch' 
let token ;
const clientID = "85a71ceb802d40578fe87356ce648a8e";
let userId;
///const redirectURI = "http://practiceAPIspot.surge.sh";
const redirectURI = "http://localhost:3000/";

export const Spotify = {
  getAccessToken () {
    if(token){
      return token;
    } else if(window.location.href.match(/access_token=([^&]*)/
    )){
      token = window.location.href.match(/access_token=([^&]*)/
      )[1];
      let expiringTime = window.location.href.match(/expires_in=([^&]*)/
      )[1];
      window.setTimeout(() => token = '', expiringTime * 1000);
      window.history.pushState('/access_token=', null, "/")
      }else {
        window.location.href =`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}
        `
      }
      
     
    },
    async search(term){
      await this.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                        headers: {authorization: `Bearer ${token}`}
                        });
      
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.tracks){
      const tracks = responseJson.tracks.items.map(item=> 
        ({ID: item.id, 
        Name: item.name,
        Artiste: item.artists[0].name,
        Album: item.album.name,
        URI: item.uri,                                       
        })
      )
      return tracks
      }else{
        return []
      }
    },

    async getUserId () {
      if (userId){
        return
      }
      const response = await fetch('https://api.spotify.com/v1/me', 
        {headers: {authorization: `Bearer ${token}` }});
      const responseJson = await response.json();
      userId = responseJson.id

    },

    async savePlaylist(name, arrayOfURI) {
      await this.getAccessToken();
      await this.getUserId()
      if(!name || !arrayOfURI){
        return
      };
      
      const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        body: JSON.stringify({'name' : name}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
            }
      });
      
      const createPlaylistJson = await createPlaylist.json();
      console.log(createPlaylistJson)
      const playlistId =  createPlaylistJson.id;

      const addTracks = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      
      {
        method: 'POST',
        body: JSON.stringify({'uris' : arrayOfURI}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
            }
      })
    },

    async getPlaylists(){
      await this.getAccessToken();
      await this.getUserId();
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      
      {
        method: 'GET',
        headers: {
          ///'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
            }
      })
      const responseJson = await response.json();
      console.log(responseJson)
      return responseJson.items

    },

    async getPlaylistTracks (uri) {
      await this.getAccessToken();
      await this.getUserId();
    }

  }


  
  