import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import {Spotify} from '../../util/Spotify.js'
import {PlaylistList} from '../PlaylistList/PlaylistList'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults : [],
                  playlistName : "some string",
                  playlistTracks : [],
                  playlistList: [{uri: "null",
                                  name: "null"},
                                ],
                              };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this)
              }
  
  addTrack(track){
    const notPresent = this.state.playlistTracks.every(elt => elt.ID !== track.ID)

    if(notPresent) {
      console.log("track Added")
      const newPlaylistTrack = this.state.playlistTracks
      newPlaylistTrack.push(track)
      //this.setState({playlistTracks : this.state.searchResults.push(track)})
      this.setState({playlistTracks : newPlaylistTrack})

    }
  }

  removeTrack(track){
    const index = this.state.playlistTracks.findIndex(elt => elt.ID === track.ID); 
    const newPlaylistTrack = this.state.playlistTracks
    newPlaylistTrack.splice(index, 1)
    this.setState({playlistTracks : newPlaylistTrack})
  }
    
  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  async savePlaylist(){
     let trackURIs = this.state.playlistTracks.map(elt => elt.URI)
    /// trackURIs = trackURIs.map(elt => elt.URI);
    //console.log(trackURIs)

     const save = await Spotify.savePlaylist(this.state.playlistName, trackURIs);
     console.log(this.state.playlistName)
     console.log(save)
     this.setState({playlistName: "New Playlist"});
     this.setState({playlistTracks: []});
  }

  async search(term){
    const tracks = await Spotify.search(term);
    console.log(tracks)
    this.setState({searchResults: tracks})
    
} 
  async getPlaylists(){
    let playlistList = await Spotify.getPlaylists()
    let newPlaylistList = playlistList.map(elt =>  
      ({name : elt.name,
        uri : elt.uri,
        id : elt.id,
      })
    );
    
    this.setState({playlistList: playlistList})
    
  }

  displayPlaylistTrack(uri){

  }

  render() {

    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar 
        onSearch={this.search}
        />

        <div className="App-playlist">

          <SearchResults 
          searchResults={this.state.searchResults} 
          onAdd = {this.addTrack}
          />

          <Playlist 
          playlistName={this.state.playlistName}////////PB NOT USED...///// 
          playlistTracks={this.state.playlistTracks}
          onRemove = {this.removeTrack}
          onNameChange = {this.updatePlaylistName}
          onSave = {this.savePlaylist}
          />

          <PlaylistList
          playlistList={this.state.playlistList}
          getPlaylists = {this.getPlaylists}
          />
          
        </div>
      </div>
    </div>
    )
  }
}

export default App;


