import React from 'react'
import './Track.css'

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleAddOrDel = this.handleAddOrDel.bind(this);
  }

  renderAction() {
    return this.props.isRemoval? "-" : "+" 
  }

  addTrack() {
    this.props.onAdd(this.props.track)
  }

  removeTrack(){
    this.props.onRemove(this.props.track)
  }

  handleAddOrDel(){
    if(!this.props.isRemoval){
      this.addTrack()
    }else{
      this.removeTrack()
    }
  }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.Name}</h3>
          <p>{this.props.track.Artiste} | {this.props.track.Album}</p>
        </div>
        <button className="Track-action" onClick={this.handleAddOrDel}>{this.renderAction()}</button>
       </div>
    )
  }
}