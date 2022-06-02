import React from 'react'
import './Playlist.css'
import {TrackList} from '../TrackList/TrackList'

export class Playlist extends React.Component {
  constructor(props){
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value)
  }

  render() {

////Ajouter this.props.playlistName => not used..../////
    return (
      <div className="Playlist">
      <input value={this.props.playlistName} 
      onChange={this.handleNameChange}/>
      <TrackList 
      tracks={this.props.playlistTracks}
      onRemove = {this.props.onRemove}
      isRemoval = {true}
      />

      <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      <button className="Playlist-save" onClick={this.props.createNewPlaylist}>CREATE NEW PLAYLISTE</button>
      </div>
    )
  }
}