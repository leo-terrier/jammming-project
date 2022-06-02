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
                  playlistName : "Playlist Name",
                  playlistTracks : [],
                  loadedPlaylistId : null,
                  playlistList: [{uri: "null",
                                  name: "null"},
                                ],
                              };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.loadPlaylistTracks = this.loadPlaylistTracks.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
              }
  
  addTrack(track){
    const notPresent = this.state.playlistTracks.every(elt => elt.ID !== track.ID)

    if(notPresent) {
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
    let newNameIndex = this.state.playlistList.findIndex(elt => elt.name==this.state.playlistName)
    console.log(newNameIndex)
    const save = await Spotify.savePlaylist(this.state.playlistName, trackURIs, this.state.loadedPlaylistId, newNameIndex);
    this.setState({playlistName: "New Playlist"});
    this.setState({playlistTracks: []});
  }

  async search(term){
    const tracks = await Spotify.search(term);
    this.setState({searchResults: tracks})
    
} 
  async getPlaylists(){
    const playlistList = await Spotify.getPlaylists()
    this.setState({playlistList: playlistList})
  }

  

  async loadPlaylistTracks(playlistId, playlistName){
    let tracks = await Spotify.getPlaylistTracks(playlistId);
    this.setState({playlistTracks: tracks});
    this.setState({playlistName: playlistName});
    this.setState({loadedPlaylistId: playlistId})
  }

createNewPlaylist(){
    this.setState({playlistTracks : []});
    this.setState({playlistName: "New Playlist"});
    this.setState({loadedPlaylistId: null});
  }
  
  async componentDidUpdate(){
    console.log(this.state.playlistName)
    console.log(this.state.loadedPlaylistId)
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
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove = {this.removeTrack}
          onNameChange = {this.updatePlaylistName}
          onSave = {this.savePlaylist}
          createNewPlaylist={this.createNewPlaylist}
          />

          <PlaylistList
          playlistList={this.state.playlistList}
          getPlaylists = {this.getPlaylists}
          loadPlaylistTracks={this.loadPlaylistTracks}
          />
          
        </div>
      </div>
    </div>
    )
  }
}

export default App;


