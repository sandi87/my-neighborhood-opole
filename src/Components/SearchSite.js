import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp';
import "./SearchSite.css"



class SearchSite extends Component {

state = {
    query:'',
    venues: this.props.venues,
    allMarkers: []
  }
  updateQuery = (query) => {

     this.setState({query})

     let allVenues = this.props.venues
     let newLocations

     if(this.state.query && (this.state.query !== '')) {
       const match = new RegExp(escapeRegExp(query), 'i');
       newLocations = allVenues.filter((myMarker) => match.test(myMarker.venue.name))
       this.setState({venues: newLocations})
       this.props.updateVenues(newLocations)
     } else {
       this.setState({venues: allVenues})
     }
 }
handleValueChange = (placeName) => {
  this.props.allMarkers.map((marker) =>{
    if(marker.title === placeName) {
      window.google.maps.event.trigger(marker, 'click');
    }
  })
}


render() {

  return(
  <div>
    <div className="container">
      <div className="search-input">
        <input role="search" type="text"
        placeholder="Search" value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />
      </div>
      <div>
      {this.state.venues.length !== 0 && (
        <ul className="location-list">
        {this.state.venues.map((myMarker, index) =>(
          <li
          key={index}
          tabindex={index}
          className="place"
          onClick={() => this.handleValueChange(myMarker.venue.name)}
          > {myMarker.venue.name}
          </li>
        ))}

        </ul>
         )}
      </div>
    </div>
  </div>
  )
}

}
export default SearchSite
