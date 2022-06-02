import React from 'react'
import './PlaylistList.css'
import { PreexistingPlaylist } from '../PreexistingPlaylist/PreexistingPlaylist';

export class PlaylistList extends React.Component {
  constructor(props){
    super(props);
  }

async componentDidMount(){
  this.props.getPlaylists()
}



render() {

  const listOfPlaylists = this.props.playlistList.map(playlist => (
    <li key={playlist.id} >
      <PreexistingPlaylist
      playlist={playlist}
      handleClick={this.props.loadPlaylistTracks}
      />
    </li>
    ))

  return (
  <div className="PlaylistList">
    <h2>Playlists</h2>
  <ul>{listOfPlaylists}</ul>
  </div>)
}

}