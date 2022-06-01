import React from 'react'
import './PlaylistList.css'

export class PlaylistList extends React.Component {

async componentDidMount(){
  this.props.getPlaylists()
  console.log(this.props.playlistList)
}

/* loadTracks(e){
  e.target.key

} */

render() {

  const listOfPlaylists = this.props.playlistList.map(playlist => (
    <li key={playlist.uri} /* onClick={loadTracks} */>
      <p>{playlist.name}</p>
    </li>
    ))

  return (
  <div className="PlaylistList">
    <h2>Playlists</h2>
  <ul>{listOfPlaylists}</ul>
  </div>)
}

}