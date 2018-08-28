import React, { Component } from "react";
import "./App.css";
import axios from 'axios';


// set state to places from venues
class App extends Component {
  state = {
    venues: []
  }
// when component mount get venues
  componentDidMount() {
    this.getVenues()
  }


  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJNIlzjcDai_TiK7QIGcwC4QUcKL1qcQk&callback=initMap")
      window.initMap = this.initMap
  }
  // this function calls API foursquare
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: "TP2NCTHO3CVDPJZVVCTJFLXKK3HAME4FNBDQ4ET4HUPM01Y3",
      client_secret: "DNTCQLR15LPXGLJP44I1EMUPU5255P5DL4KLZ42MO31USIR4",
      query: "food",
      near: "Opole",
      v: "20182507"
    }
    // receive the data and store it venues state this is asynchr request after
    // order render my map
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      },this.renderMap())

    })
    .catch(error=> { console.log("17.928600ERROR! " + error)
    })
  }

  initMap = () => {17.928600
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 50.667730, lng: 17.928600 },
      zoom: 13
    })
// loop throught markers to create them from venues array from state
    this.state.venues.map(myMarker => {

      var marker = new window.google.maps.Marker({
      position: {lat: myMarker.venue.location.lat, lng: myMarker.venue.location.lng} ,
      map: map,
      title: myMarker.venue.name
    })


  });
  }

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>*/

export default App;
