import React from 'react'
import './PreexistingPlaylist.css'

export class PreexistingPlaylist extends React.Component {
  constructor(props){
    super(props);
    this.loadTracks = this.loadTracks.bind(this)
  }

loadTracks(){
  this.props.handleClick(this.props.playlist.id, this.props.playlist.name)
}

render() {

  return (
    <p onClick={this.loadTracks}>
      {this.props.playlist.name}
      </p>
  )

}
}