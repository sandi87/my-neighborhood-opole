import React, { Component } from "react";
import "./App.css";
import axios from 'axios';

class App extends Component {
  state = {
    venues: []
  }

  componentDidMount() {
    this.renderMap()
    this.getVenues()
  }


  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJNIlzjcDai_TiK7QIGcwC4QUcKL1qcQk&callback=initMap")
      window.initMap = this.initMap
  }
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: "TP2NCTHO3CVDPJZVVCTJFLXKK3HAME4FNBDQ4ET4HUPM01Y3",
      client_secret: "DNTCQLR15LPXGLJP44I1EMUPU5255P5DL4KLZ42MO31USIR4",
      query: "food",
      near: "Opole",
      v: "20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      })

    })
    .catch(error=> { console.log("ERROR! " + error)
    })
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 50.667730, lng: 17.928600 },
      zoom: 13
    })
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
