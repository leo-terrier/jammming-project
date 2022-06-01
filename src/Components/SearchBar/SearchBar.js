import React from 'react'
import './SearchBar.css'
export class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {term : "baba"};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
     this.props.onSearch(this.state.term)
  }

  handleTermChange(e){
    this.setState({term : e.target.value});
  }

  ////search() pas connecté au bouton////

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <button className="SearchButton" onClick = {this.search}>SEARCH</button>
      </div>
    )
  }
}