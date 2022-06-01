import React from 'react'
import './TrackList.css'
import {Track} from '../Track/Track'

export class TrackList extends React.Component {

  /* constructor(props){
    super(props)
  } useless*/


  render() {
    const listOfTracks = this.props.tracks.map(currentTrack =>
    

      (<li key={currentTrack.ID}>

        <Track 
        track={currentTrack} 
        onAdd={this.props.onAdd}
        onRemove={this.props.onRemove}
        isRemoval ={this.props.isRemoval}
        />
        </li>)) 
  
    return (
      <div className="TrackList">
        <ul>
        {listOfTracks}
        </ul>
      </div>
    )
  }
}